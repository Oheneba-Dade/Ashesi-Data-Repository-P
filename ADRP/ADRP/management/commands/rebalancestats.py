from django.core.management.base import BaseCommand
from ...backend_services.statistics_service.statistics_service_repository import re_balance_stats

class Command(BaseCommand):
    help = 'Recompute and store platform statistics.'

    def handle(self, *args, **options):
        re_balance_stats()
        self.stdout.write(self.style.SUCCESS('Successfully rebalanced stats.'))