"""
URL configuration for ADRP project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views.collection_views.collections import *
from .views.statistics_views.statistics import *
from .views.account_views.accounts import *
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from .views.dataset_views.dataset_file import * 

urlpatterns = [
    path("admin/", admin.site.urls),

    # Collection views
    path("adrp/get_all_collections/", get_all_collections),
    path("adrp/get_collection/", get_collection),
    path("adrp/create_collection", create_collection),
    path("adrp/collections", CollectionListView.as_view(), name="collection-list"),
    path("adrp/collection_status", change_collection_status),
    path("adrp/upload_collection", upload_collection, name='upload_collection'),

    # Account views
    path("adrp/get_otp",get_OTP),
    path("adrp/login",login),
    path("adrp/token/refresh", TokenRefreshView.as_view()),
    path("adrp/whoami",whoami),

    # Docs
    path('adrp/api_schema/', SpectacularAPIView.as_view(), name='schema'),
    path('adrp/api_docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Dataset
    path("adrp/dataset_upload/", upload_dataset, name="upload_dataset"),
    path("adrp/dataset_download/", download_dataset, name="download_dataset"),
    path("adrp/dataset_delete/", delete_dataset, name="delete_dataset"),
    path("adrp/dataset_update/", update_dataset, name="update_dataset"),
     path("adrp/get_dataset/", get_dataset, name="get_dataset"),

    # Site Stats
    path("adrp/get_stats/", get_statistics)

]
