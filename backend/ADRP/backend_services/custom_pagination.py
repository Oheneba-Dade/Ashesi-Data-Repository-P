from rest_framework.pagination import PageNumberPagination


class BasicPagination(PageNumberPagination):
    """Pagination for regular users, returns 10 pages at a time"""
    page_size = 10
    page_query_param = 'page'
    last_page_strings = ('last' , 'final')



class AdminPagination(PageNumberPagination):
    """Pagination for admin users, returns 15 pages at a time"""
    page_size = 15
    page_query_param = 'page'
    last_page_strings = ('last' , 'final')




class CollectionPagination(PageNumberPagination):
    """Pagination for collection, returns 10 pages at a time"""
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

