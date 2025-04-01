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
# from .filters import CollectionFilter
from ...backend_services.accounts_service.custom_permissions import *
from ...backend_services.collections_service.collections_service_main import CollectionsService
from ...backend_services.statistics_service.statistics_service_main import StatisticsService



@api_view(['GET'])
@permission_classes([AllowAny])
def get_statistics(request: Request) -> Response:

    statistics = StatisticsService.get_statistics()
    print(statistics)
    return Response(data=statistics, status=status.HTTP_200_OK)
