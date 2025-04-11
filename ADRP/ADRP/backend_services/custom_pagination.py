from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class BasePagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'current_page': self.page.number,
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })


class BasicPagination(BasePagination):
    """Pagination for regular users, returns 10 pages at a time"""
    page_size = 10
    page_query_param = 'page'
    last_page_strings = ('last', 'final')


class AdminPagination(BasePagination):
    """Pagination for admin users, returns 15 pages at a time"""
    page_size = 15
    page_query_param = 'page'
    last_page_strings = ('last', 'final')


class CollectionPagination(PageNumberPagination):
    """Pagination for collection, returns 10 pages at a time"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
