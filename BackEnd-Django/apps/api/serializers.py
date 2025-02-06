
from rest_framework import serializers
from apps.userObservations.models import Location, UserObservation, IdentificationTask


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class UserObservationSerializer(serializers.ModelSerializer):

    gps_location = LocationSerializer() 
    mosquito_img = serializers.SerializerMethodField()

    class Meta:
        model = UserObservation
        fields = '__all__'

    def get_mosquito_img(self, obj):
        if obj.mosquito_img:
            return f'http://localhost:8000/{obj.mosquito_img.url}'
        return None

    def create(self, validated_data):
        gps_data = self.initial_data.get('gps_location')

        if isinstance(gps_data, str):  
            import json
            gps_data = json.loads(gps_data)

        location, created = Location.objects.get_or_create(**gps_data)
        validated_data['gps_location'] = location

        return UserObservation.objects.create(**validated_data)


class IdentificationTaskSerializer(serializers.ModelSerializer):
    user_observation = UserObservationSerializer()

    class Meta:
        model = IdentificationTask
        fields = '__all__'

class BasicAPITaskResponse(serializers.Serializer):
    ok = serializers.BooleanField()
    msg = serializers.CharField()
    data = serializers.ListField(
        child=IdentificationTaskSerializer(),
        allow_empty=True,
        required=False

    )

class BasicAPIObsResponse(serializers.Serializer):
    ok = serializers.BooleanField()
    msg = serializers.CharField()
    data = serializers.ListField(
        child=UserObservationSerializer(),
        allow_empty=True,
        required=False

    )

