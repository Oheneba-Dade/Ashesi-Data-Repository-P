from tracemalloc import Statistic

from rest_framework import serializers
from .models import *
from rest_framework.exceptions import NotFound, ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class DatasetFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetFile
        fields = ['file_name', 'file_url', 'file_type', 'uploaded_at', 'download_count']


class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = ['download_count', 'view_count', 'author_count', 'collection_count']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authors
        fields = '__all__'


class CollectionSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        # fields = '__all__'
        fields = ['id', 'title', 'doi_link', 'keywords', 'abstract', 'instance_representation',
                   'comment','date_of_publication', 'approval_status', 'approved_by' ,'approved_at', 
                   'rejected_by' ,'rejected_at', 'view_count',  'authors']

    def create(self, validated_data):
        # authors_data = validated_data.pop('authors', [])
        uploaded_by = self.context['request'].user  # Get user from context

        collection = Collection.objects.create(uploaded_by=uploaded_by, **validated_data)

        # for author_data in authors_data:
        #     author, _ = Authors.objects.get_or_create(**author_data)
        #     collection.authors.add(author)

        return collection

    @staticmethod
    def flip_http_type(link):
        """Takes a link and converts it between http/https"""

        if not isinstance(link, str):  # Handle None or non-string input
            return None

        if link.startswith("http://"):
            return link.replace("http://", "https://", 1)
        elif link.startswith("https://"):
            return link.replace("https://", "http://", 1)

        return link

    @staticmethod
    def flip_pagination_links(response):
        response.data['next'] = CollectionSerializer.flip_http_type(response.data['next'])
        response.data['previous'] = CollectionSerializer.flip_http_type(response.data['previous'])

        return response

    @staticmethod
    def validate_status(status):
        if status != 'all' and status not in dict(Collection.STATUS_CHOICES):
            raise ValidationError('Status is not valid')
        return status
