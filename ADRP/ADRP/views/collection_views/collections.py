from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework import status
# from ...backend_services.orders_service.order_service_main import OrderService
# from ...models import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from ...models import Collection
from ...serializers import CollectionSerializer
from .filters import CollectionFilter
from ...backend_services.accounts_service.custom_permissions import *
from ...backend_services.collections_service.collections_service_main import CollectionsService
from ...backend_services.custom_pagination import CollectionPagination

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_collections(request: Request) -> HttpResponse:
    """ Get all collections in a paginated format. Defaults to 10 items
    per page for regular users, 15 per page for admin users"""

    collections = CollectionsService.get_all_collections(request)
    return collections


@api_view(['GET'])
@permission_classes([AllowAny])
def get_collection(request: Request) -> Response:
    """Get a single collection based on the ID provided."""

    # try:
    collections = CollectionsService.get_collection(request)
    return Response(data=collections, status=status.HTTP_200_OK)
    # except Exception as e:
    #     return Response({"message": "collection not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsInternalUser])
def create_collection(request: Request) -> Response:
    """Create a single collection."""

    new_collection = CollectionsService.create_collection(request)
    return Response(data=new_collection, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsInternalAdmin])
def delete_collection(request: Request) -> Response:
    """ Delete a single collection"""

    CollectionsService.delete_collection(request)
    return Response(data={}, status=status.HTTP_204_NO_CONTENT)





@api_view(['PATCH'])
@permission_classes([IsInternalAdmin])
def change_collection_status(request: Request) -> Response:
    """Change the status of a collection"""

    result = CollectionsService.change_collection_status(request)

    return Response(result, status=result.get("status", status.HTTP_200_OK))


@api_view(['POST'])
@permission_classes([AllowAny]) # change to internal
def upload_collection(request):
    """ create a collection and uploads its dataset file"""
    result = CollectionsService.upload_collection(request)
    return Response(result, status=result.get("status", status.HTTP_200_OK))


## Filter
@permission_classes([AllowAny])
class CollectionListView(generics.ListAPIView):
    """
        API view for listing approved collections with that have been searched, ordering, and pagination.
    """
    queryset = Collection.objects.all().filter(approval_status="approved")
    serializer_class = CollectionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CollectionFilter
    ordering_fields = ['date_of_publication', 'title']
    ordering = ['-date_of_publication'] # descing order of pub date
    pagination_class = CollectionPagination



    def list(self, request, *args, **kwargs):
        """
            Overrides defualt list method with customized response to include the number of records (eg 1-9 of 9).
        """
        response = super().list(request, *args, **kwargs)
        
        # Get paginator and page info
        paginator = self.paginator
        if paginator is not None:
            total_count = paginator.page.paginator.count  
            current_page = paginator.page.number 
            per_page = paginator.page.paginator.per_page  

            # Calculate start and end item indexes
            start_item = (current_page - 1) * per_page + 1
            end_item = min(start_item + per_page - 1, total_count)

            response.data['pagination_info'] = {
                "total_records": total_count,
                "range_displayed": f"{start_item}-{end_item} of {total_count}"
            }
        
        return response
