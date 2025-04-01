from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ...backend_services.dataset_service.dataset_service_main import DatasetService
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

@api_view(["GET"])
@permission_classes([AllowAny])
def get_dataset(request):
    """
    Retrieves dataset files for a given collection.

    Args:
        request (Request): The request object containing query parameters.

    Returns:
        Response: Serialized dataset files with HTTP 200 status.
    """
    result = DatasetService.get_dataset(request_obj=request)
    return Response(result, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def upload_dataset(request):
    """
    Handles dataset file upload.

    Args:
        request (Request): The request object containing the collection ID and file.

    Returns:
        Response: Success message and status code, or an error message.
    """
    collection_id = request.data.get("collection_id")
    file_obj = request.FILES.get("file")

    if not file_obj:
        return Response({"error": "No file uploaded."}, status=400)

    result = DatasetService.handle_dataset_upload(collection_id, file_obj)
    return Response(result, status=result.get("status", status.HTTP_200_OK))


@api_view(["POST"])
@permission_classes([AllowAny])
def download_dataset(request):
    """
    Generates a pre-signed URL for downloading a dataset file.

    Args:
        request (Request): The request object containing collection ID and filename.

    Returns:
        Response: Download URL and status code, or an error message.
    """
    collection_id = request.data.get("collection_id")
    filename = request.data.get("filename")

    result = DatasetService.handle_dataset_download(collection_id, filename)
    return Response(result, status=result.get("status", status.HTTP_200_OK))


@api_view(["POST"])
@permission_classes([AllowAny])
def delete_dataset(request):
    """
    Deletes a dataset file from the S3 bucket and database.

    Args:
        request (Request): The request object containing collection ID and filename.

    Returns:
        Response: Success message and status code, or an error message.
    """
    filename = request.data.get("filename")
    collection_id = request.data.get("collection_id")

    result = DatasetService.handle_dataset_delete(collection_id, filename)
    return Response(result, status=result.get("status", status.HTTP_200_OK))


@api_view(["POST"])
@permission_classes([AllowAny])
def update_dataset(request):
    """
    Updates an existing dataset file.

    Args:
        request (Request): The request object containing collection ID and file.

    Returns:
        Response: Success message, file URL, and status code, or an error message.
    """
    collection_id = request.data.get("collection_id")
    file_obj = request.FILES.get("file")

    result = DatasetService.handle_dataset_update(collection_id, file_obj)
    return Response(result, status=result.get("status", status.HTTP_200_OK))
