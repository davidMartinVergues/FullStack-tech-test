
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from django.shortcuts import get_object_or_404
from apps.api.serializers import BasicAPITaskResponse, BasicAPIObsResponse,LocationSerializer,UserObservationSerializer,IdentificationTaskSerializer
from apps.userObservations.models import IdentificationTask,Location,UserObservation
from django.http import FileResponse, Http404
from django.db.models import Q
# Create your views here.


@api_view(['POST'])
def create_user_observation(request):
    try:

        with transaction.atomic():
            mosquito_img = request.FILES['mosquito_img']
            latitude = request.POST['latitude']
            longitude = request.POST['longitude']

            gps, _ = Location.objects.get_or_create(latitude=latitude, longitude=longitude)

            observation = UserObservation.objects.create(gps_location=gps,mosquito_img=mosquito_img)


            return Response(BasicAPIObsResponse({"ok":True,"msg": "UserObservation created successfully!", "observation_id": observation.id}).data)

        
    except Exception as e:
        return Response(BasicAPIObsResponse({"ok":False,"msg": "Error creating UserObservation!"}).data)


@api_view(['POST'])
def create_identification_task(request):
    
    try:

          
          obs = request.POST['observation']

          o = UserObservation.objects.get(pk=obs)

          IdentificationTask.objects.create(user_observation=o)


          return Response(BasicAPITaskResponse({"ok":True,"msg": "Identification Task created successfully"}).data)

        
    except Exception as e:
        return Response(BasicAPITaskResponse({"ok":False,"msg": "Error creating Identification Task!"}).data)
    

@api_view(['GET'])
def list_identification_tasks(request):
    try:
        identifications = IdentificationTask.objects.all()
        return Response(BasicAPITaskResponse({"ok":True,"msg": "getting observations successfully!", "data":identifications}).data)
    except Exception as e:
        return Response(BasicAPITaskResponse({"ok":False,"msg": "Error getting observations successfully!", "data":[]}).data)



@api_view(['GET'])
def list_user_observations(request):
    try:
        # observations = UserObservation.objects.all()
        observations = UserObservation.objects.filter(Q(identificationtask__isnull=True))
        return Response(BasicAPIObsResponse({"ok":True,"msg": "getting observations successfully!", "data":observations}).data)
    except Exception as e:
        return Response(BasicAPIObsResponse({"ok":False,"msg": "Error getting observations successfully!", "data":[]}).data)



@api_view(['GET'])
def get_identification_tasks_by_status(request,status):
    try:
        identifications = IdentificationTask.objects.filter(status=status)
        return Response(BasicAPITaskResponse({"ok":True,"msg": "getting observations successfully!", "data":identifications}).data)
    except Exception as e:
        return Response(BasicAPITaskResponse({"ok":False,"msg": "Error getting observations successfully!", "data":[]}).data)



@api_view(['GET'])
def update_status_identification_to_complete(request,id):
    try:
        
        identification = IdentificationTask.objects.get(pk=id)

        identification.status = '0' if  identification.status=='2' else '2'

        identification.save()

        return Response(BasicAPITaskResponse({"ok":True,"msg": "Change status tu complete successfully!"}).data)
    except Exception as e:
        return Response(BasicAPITaskResponse({"ok":False,"msg": "Error changing status!", "data":[]}).data)
    
@api_view(['DELETE'])
def delete_identification_task(request,id):
    try:
        
        identification = IdentificationTask.objects.get(pk=id)
        identification.delete()

        return Response(BasicAPITaskResponse({"ok":True,"msg": "deleted successfully!"}).data)
    except Exception as e:
        return Response(BasicAPITaskResponse({"ok":False,"msg": "Error deleting!", "data":[]}).data)
    

@api_view(['GET'])
def get_mosquito_image(request, identification_id):

    identification = get_object_or_404(IdentificationTask, id=identification_id)

    if not identification.user_observation.mosquito_img:
        raise Http404("No image found")

    image_path = identification.user_observation.mosquito_img.path
    return FileResponse(open(image_path, 'rb'), content_type='image/jpeg')