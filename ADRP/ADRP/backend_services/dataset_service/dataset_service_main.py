
from django.core.exceptions import ObjectDoesNotExist
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, BotoCoreError
from .dataset_service_repository import *
from ..collections_service.collections_service_repository import get_collection_by_id
from ...models import DatasetFile
from ...serializers import DatasetFileSerializer
import boto3
import logging

from django.core.exceptions import ObjectDoesNotExist

from .dataset_service_repository import *
from ..collections_service.collections_service_repository import get_collection_by_id

logger = logging.getLogger(__name__)

MAX_FILE_SIZE_MB = 500 # cant upload fles over 500 mb can be changed later
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024


class DatasetService:

    @staticmethod
    def get_dataset(request_obj):
        """
        Retrieves dataset files for a given collection.

        Args:
            request_obj (Request): The request object containing query parameters.

        Returns:
            list: Serialized dataset files.
        """
        collection_id = request_obj.query_params.get('collection_id')
        dataset_data = get_dataset(collection_id)
        serialized_data = DatasetFileSerializer(instance=dataset_data, many=True)
        return serialized_data.data

        
    @staticmethod
    def handle_dataset_upload(collection_id, file_obj):
        """
        Uploads a dataset file to an S3 bucket and saves its record in the database.

        Args:
            collection_id (str): The collection identifier.
            file_obj (file-like object): The file to be uploaded.

        Returns:
            dict: Response message and status code.
        """
        if not collection_id or not file_obj:
            return {"error": "Collection ID and file are required.", "status": 400}

        try:
            collection = get_collection_by_id(collection_id)
        except ObjectDoesNotExist:
            return {"error": "Collection not found.", "status": 404}

        if file_obj.size > MAX_FILE_SIZE_BYTES:
            return {"error": f"File size exceeds {MAX_FILE_SIZE_MB}MB limit.", "status": 400}

        # add a check for zip files
        try:
            file_url = upload_dataset_to_bucket(file_obj, file_obj.name, collection_id)
        except:
            return {"message": "File upload failed", "status": 400}

        try:
            save_dataset(collection, file_url, file_obj.content_type)
            return {"message": "File uploaded successfully", "status": 201}
        except ValueError as ve:
            return {"message": str(ve), "status": 400}
        except Exception as e:
            return {"message": "An unexpected error occurred", "details": str(e), "status": 500}
        


    @staticmethod
    def handle_dataset_download(collection_id, filename):
        """
        Generates a pre-signed URL for downloading a dataset file.

        Args:
            collection_id (str): The collection identifier.
            filename (str): The name of the file.

        Returns:
            dict: Response message, file URL, and status code.
        """
        if not collection_id or not filename:
            return {"error": "Collection ID and filename are required.", "status": 400}

        try:
            dataset_filename = f'{collection_id}-{filename}'
            file_url = generate_dataset_url_from_bucket(dataset_filename)

            ## increment dataset count
            increment_dataset_download_count(collection_id=collection_id)


            return {"message": "URL generated successfully", "file_url": file_url, "status": 200}
        except:
            return {"error": "An error occurred while generating download URL.", "status": 400}

    @staticmethod
    def handle_dataset_delete(collection_id, filename):
        """
        Deletes a dataset file from the S3 bucket and database.

        Args:
            collection_id (str): The collection identifier.
            filename (str): The name of the file.

        Returns:
            dict: Response message and status code.
        """
        if not collection_id or not filename:
            return {"error": "Collection ID and filename are required.", "status": 400}

        try:
            collection = get_collection_by_id(collection_id)
        except ObjectDoesNotExist:
            return {"error": "Collection not found.", "status": 404}

        try:
            dataset_filename = f'{collection_id}-{filename}'
            delete_dataset_from_bucket(dataset_filename)
            deleted_count = delete_dataset_file(collection, filename)

            if deleted_count == 0:
                return {"error": "File not found in database.", "status": 404}

            return {"message": "File deleted successfully.", "status": 200}
        except Exception as e:
            logger.error(f"Error deleting file {filename}: {str(e)}")
            return {"error": "An error occurred while deleting the file.", "status": 500}

    @staticmethod
    def handle_dataset_update(collection_id, file_obj):
        """
        Updates a dataset file in the S3 bucket and database.

        Args:
            collection_id (str): The collection identifier.
            file_obj (file-like object): The file to be updated.

        Returns:
            dict: Response message, file URL, and status code.
        """
        if not collection_id or not file_obj:
            return {"error": "Collection ID and file are required.", "status": 400}

        try:
            collection = get_collection_by_id(collection_id)
        except ObjectDoesNotExist:
            return {"error": "Collection not found.", "status": 404}

        if file_obj.size > MAX_FILE_SIZE_BYTES:
            return {"error": f"File size exceeds {MAX_FILE_SIZE_MB}MB limit.", "status": 400}

        try:
            file_url = update_dataset_on_bucket(file_obj.name, file_obj)
            update_dataset_file(collection, file_url, file_obj.content_type)
            return {"message": "File uploaded successfully", "file_url": file_url, "status": 201}
        except Exception as e:
            logger.error(f"Error updating file {file_obj.name}: {str(e)}")
            return {"error": "An error occurred while updating the file.", "status": 500}
