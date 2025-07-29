from ...models import DatasetFile
import boto3
from django.conf import settings
from ...settings import AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY, AWS_S3_REGION_NAME
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, BotoCoreError,ClientError
from .helper import extract_filename, rename
import logging

logger = logging.getLogger(__name__)

LINK_EXPIRY_TIME = 3600 * 48



# TODO: Add scanning of repository (using s3 security features - guard duty)
# TODO: Use a separate s3 bucket for data waiting approval and data approved
# TODO: Change how each of these functiosn use the buckets

# set up a new bucket


# s3  interactions
def s3_client_connection():
    """
    Establish a connection to the Amazon S3 client using credentials from settings.
    
    Returns:
        botocore.client.S3: An S3 client instance.
    """
    return boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )


def upload_dataset_to_bucket(file_obj, filename, collection_id):
    """
    Uploads a dataset file to an S3 bucket and returns its URL.
    
    Args:
        file_obj (file-like object): The file to be uploaded.
        filename (str): The name of the file.
        collection_id (str): The collection identifier to make the filename unique.
    
    Returns:
        str: The URL of the uploaded file, or None if an error occurs.
    """
    try:
        # rename file
        filename = rename(filename=filename)

        s3_client = s3_client_connection()
        bucket_name = settings.AWS_INITIAL_BUCKET
        key = f'{collection_id}-{filename}'  # Unique key for the file in the bucket
        s3_client.upload_fileobj(file_obj, bucket_name, key)
        return f"https://{bucket_name}.s3.amazonaws.com/{key}"
    
    except FileNotFoundError:
        logger.error(f"File not found: {file_obj}")
    except (NoCredentialsError, PartialCredentialsError):
        logger.error("AWS credentials not found or misconfigured")
    except BotoCoreError as e:
        logger.error(f"An error occurred with Boto3: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    return None





def upload_dataset_to_waiting_bucket(file_obj, filename, collection_id):
    """
    Uploads a dataset file to an S3 bucket for prending approval and returns its URL.
    
    Args:
        file_obj (file-like object): The file to be uploaded.
        filename (str): The name of the file.
        collection_id (str): The collection identifier to make the filename unique.
    
    Returns:
        str: The URL of the uploaded file, or None if an error occurs.
    """
    try:
        # rename file
        filename = rename(filename=filename)

        s3_client = s3_client_connection()
        bucket_name = settings.AWS_INITIAL_BUCKET
        key = f'{collection_id}-{filename}'  # Unique key for the file in the bucket
        s3_client.upload_fileobj(file_obj, bucket_name, key)
        return f"https://{bucket_name}.s3.amazonaws.com/{key}"
    
    except FileNotFoundError:
        logger.error(f"File not found: {file_obj}")
    except (NoCredentialsError, PartialCredentialsError):
        logger.error("AWS credentials not found or misconfigured")
    except BotoCoreError as e:
        logger.error(f"An error occurred with Boto3: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    return None



def scan_file_in_bucket():
    """
        Scans files in buckets and returns the state of the file
    """
    pass




def generate_dataset_url_from_bucket(filename):
    """
    Generate a pre-signed URL for accessing a file in Approved datasets S3 bucket.
    
    Args:
        filename (str): The name of the file stored in the bucket.
    
    Returns:
        str: A pre-signed URL with an expiration time, or None if an error occurs.
    """
    try:
        s3_client = s3_client_connection()
        return s3_client.generate_presigned_url(
            'get_object', 
            Params={'Bucket': settings.AWS_APPROVED_BUCKET, 'Key': filename}, 
            ExpiresIn=LINK_EXPIRY_TIME
        )
    except Exception as e:
        logger.error(f"Unexpected error generating presigned URL: {e}")
    return None


def delete_dataset_from_bucket(filename):
    """
    Delete a dataset file from an S3 bucket.
    
    Args:
        filename (str): The name of the file to be deleted.
    
    Returns:
        dict: The response from the S3 delete operation, or None if an error occurs.
    """
    try:
        s3_client = s3_client_connection()
        return s3_client.delete_object(Bucket=settings.AWS_APPROVED_BUCKET, Key=filename)
    except (NoCredentialsError, PartialCredentialsError):
        logger.error("AWS credentials not found or misconfigured")
    except BotoCoreError as e:
        logger.error(f"An error occurred with Boto3: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    return None


def update_dataset_on_bucket(filename, file_obj):
    """
    Update an existing dataset file in an S3 bucket.
    
    Args:
        filename (str): The name of the file to be updated.
        file_obj (file-like object): The new file content.
    
    Returns:
        dict: The response from the S3 put operation, or None if an error occurs.
    """
    try:
        s3_client = s3_client_connection()
        return s3_client.put_object(
            Bucket=settings.AWS_APPROVED_BUCKET,
            Body=file_obj,
            Key=filename,
        )
    except (NoCredentialsError, PartialCredentialsError):
        logger.error("AWS credentials not found or misconfigured")
    except BotoCoreError as e:
        logger.error(f"An error occurred with Boto3: {e}")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
    return None


# dataset (database) interactions

def get_dataset(collection_id):
    """
    Retrieve dataset files associated with a collection.
    
    Args:
        collection_id (str): The identifier of the collection.
    
    Returns:
        QuerySet: A QuerySet of dataset files belonging to the collection.
    """
    return DatasetFile.objects.filter(collection_id=collection_id).first()


def save_dataset(collection, file_url, file_type):
    """
    Save a dataset file record in a collection.
    
    Args:
        collection (Collection): The collection instance.
        file_url (str): The URL of the file.
        file_type (str): The type of the file.
    
    Returns:
        DatasetFile: The created dataset file instance.
    
    Raises:
        ValueError: If the dataset file could not be saved.
    """
    try:
        return DatasetFile.objects.create(
            collection=collection,
            file_name=extract_filename(file_url),
            file_url=file_url,
            file_type=file_type
        )
    except Exception as e:
        raise ValueError(f"Failed to save dataset file: {str(e)}")


def update_dataset_file(collection, file_url, file_type):
    """
    Update dataset file details in a collection.
    
    Args:
        collection (Collection): The collection instance.
        file_url (str): The updated URL of the file.
        file_type (str): The updated type of the file.
    
    Returns:
        int: The number of updated records.
    """
    return DatasetFile.objects.filter(collection=collection).update(
        file_url=file_url,
        file_type=file_type
    )


def delete_dataset_file(collection, filename):
    """
    Delete a dataset file from a collection.
    
    Args:
        collection (Collection): The collection instance.
        filename (str): The name of the file to be deleted.
    
    Returns:
        int: The number of deleted records.
    """
    return DatasetFile.objects.filter(collection=collection, file_url__endswith=filename).delete()[0]

def move_dataset_file(filename):
    """
        Moves a dataset file from the approvals bucket to the approved bucket.
        
        Args:
            filename (str): The name of the file to be deleted {collection-id}-{filename}.
        
        Returns:
            str: The URL of the uploaded file, or None if an error occurs.
    """

    source_bucket = settings.AWS_INITIAL_BUCKET
    destination_bucket = settings.AWS_APPROVED_BUCKET
    
    s3_client = s3_client_connection()

    copy_source = {
        'Bucket': source_bucket,
        'Key': filename
    }
    try:
        # Copy the file to the destination bucket
        s3_client.copy(CopySource=copy_source, Bucket=destination_bucket, Key=filename)

        # Delete the original file from the source bucket
        s3_client.delete_object(Bucket=source_bucket, Key=filename)
        return f"https://{destination_bucket}.s3.amazonaws.com/{filename}"
    except ClientError as e:
        logging.error(f"Failed to move file '{filename}': {e}")
        return None ###
    


def increment_dataset_download_count(collection_id):
    """
        Increments the download count for a dataset associated with a given collection ID.

        Args:
            collection_id (int): The ID of the collection whose dataset download count should be incremented.

        Return:
            nothing

    """
    dataset = DatasetFile.objects.filter(collection_id= collection_id).first()
    if not dataset:
        return {"error": "Dataset not found.", "status": 404}
    
    try:
        dataset.download_count += 1
        dataset.save()

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}", "status": 500}