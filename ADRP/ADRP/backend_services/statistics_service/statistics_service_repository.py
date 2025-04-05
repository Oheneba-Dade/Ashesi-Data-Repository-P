from django.views.generic import View

from ...models import Collection, Authors, DatasetFile
from ...models import Statistics
from django.db.models import Sum

# def get_view_count():
#
#     return
#
#
# def get_download_count():
#     return
#
#
# def get_collection_count():
#     return
#
#
# def get_contributor_count():
#     return

def get_all_stats():
    """Returns the first row of the collections table which SHOULD contain
    the auto updated stats for the website"""
    return Statistics.objects.filter(id=1).first()


def reset_all_stats():
    """Resets the Statistics table to its initial state (0 for each counter)"""

    Statistics.objects.all().delete()
    stats = Statistics.objects.create(id=1)
    stats.save()


def re_balance_stats():
    """Performs count operations on all relevant DB tables and stores them in the
    statistics table"""

    stats = Statistics.objects.filter(id=1).first()

    stats.download_count = DatasetFile.objects.aggregate(total=Sum('download_count'))['total'] or 0
    stats.collection_count = Collection.objects.count()
    stats.view_count = Collection.objects.aggregate(v_count=Sum('view_count')).get('v_count')
    stats.author_count = Authors.objects.count()

    stats.save()

    return stats