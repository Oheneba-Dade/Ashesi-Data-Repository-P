import json

from django.core.exceptions import ObjectDoesNotExist

from ..custom_pagination import BasicPagination, AdminPagination
from ...models import Collection, Authors, Statistics
from ...serializers import CollectionSerializer


# TODO Consider modifying to accept only text based parameters and not request objects

def get_collection_by_id(collection_id):
    """Gets a collection by its ID."""

    try:
        return Collection.objects.get(id=collection_id)
    except Collection.DoesNotExist:
        raise ObjectDoesNotExist("Collection not found.")


def create_collection(user, collection):
    """Creates a new collection."""

    new_collection = Collection(uploaded_by=user, **collection)
    new_collection.save()


    return new_collection


def delete_collection(request):
    """ Query to delete a collection
    :param collection_id: The ID of the collection to delete
    :return: Returns the deleted collection"""

    collection = get_collection_by_id(request.query_params.get('collection_id'))
    collection.delete()
    return collection


def get_all_collections(request, status, admin=False):
    """Returns a paginated list of all collections
    :param request: The request object
    :param status: The status of the collections (approved, rejected or pending)
    :param admin: Defaults to false which returns 10 items per page. If True, returns 15 items per page."""

    paginator = AdminPagination() if admin else BasicPagination()
    lazy_query = Collection.objects.all() if status == "all" else Collection.objects.filter(approval_status=status)
    results = paginator.paginate_queryset(lazy_query, request)
    serializer = CollectionSerializer(results, many=True)

    return paginator.get_paginated_response(serializer.data)


def change_collection_status(collection_id, status):
    """ Changes the status of a collection between (pending, approved and rejected)"""

    collection = get_collection_by_id(collection_id)
    collection.status = status
    collection.save()


def increment_collection_views(collection: Collection):
    """ Increment the number of views of a collection by 1"""

    collection.view_count += 1
    collection.save()
    increment_global_view_count()

    return collection


def increment_global_view_count():
    """Increments the global view counter for the app """

    stats = Statistics.objects.filter(id=1).first()
    stats.view_count += 1
    stats.save()

    return stats


def incremenet_global_download_count():
    """Increments the global download counter for the app"""

    stats = Statistics.objects.filter(id=1).first()
    stats.download_count += 1
    stats.save()

    return stats


def increment_global_user_count():
    """Increments the global user counter for the app"""

    stats = Statistics.objects.filter(id=1).first()
    stats.user_count += 1
    stats.save()

    return stats


def increment_global_author_count():
    """Increments the global author counter for the app"""

    stats = Statistics.objects.filter(id=1).first()
    stats.author_count += 1
    stats.save()


def increment_global_collection_count():
    """Increments the global collection counter for the app"""

    stats = Statistics.objects.filter(id=1).first()
    stats.collection_count += 1

    stats.save()

    return stats


def save_authors(request_obj, collection: Collection):
    """Associates authors with a collection"""

    authors = json.loads(request_obj.data.get('authors'))
    print(type(request_obj.data.get('authors')))
    for author in authors:
        obj, created = Authors.objects.get_or_create(email=author['email'], name=author['name'])
        collection.authors.add(obj)
        if created:
            increment_global_author_count()


