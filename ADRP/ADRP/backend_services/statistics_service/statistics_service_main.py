from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from ...settings import REFRESH_DELTA
from .statistics_service_repository import *
from ...serializers import StatisticsSerializer

class StatisticsService():

    @staticmethod
    def get_statistics() -> Response:
        """
        Fetches usage statistics for the platform including:
        num downloads, num views, num contributors, num collections.
        If statistics are older than the specified delta, refresh them.
        """
        stats = get_all_stats()
        now = timezone.now()
        delta = now - timedelta(hours=REFRESH_DELTA)

        if not stats.last_updated or stats.last_updated < delta:
            re_balance_stats()
            stats = get_all_stats()  # Refresh after updating

        serialized_data = StatisticsSerializer(instance=stats)
        return serialized_data.data