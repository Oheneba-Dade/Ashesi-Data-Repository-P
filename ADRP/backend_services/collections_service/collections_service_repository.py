from ...models import Collection
from django.core.exceptions import ObjectDoesNotExist


def get_collection_by_id(collection_id):
    try:
        return Collection.objects.get(id=collection_id) 
    except Collection.DoesNotExist: 
          raise ObjectDoesNotExist("Collection not found.")


def create_collection(user, collection):
    new_collection = Collection(uploaded_by=user,**collection)
    new_collection.save()

    return new_collection

