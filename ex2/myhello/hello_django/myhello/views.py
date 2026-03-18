from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from .models import Post

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title','')
    content = request.GET.get('content','')
    location = request.GET.get('location','')
    photo = request.GET.get('photo','')
    
    new_post = Post(title=title, content=content, location=location, photo=photo)
    new_post.save()
    if title:
        return Response({'data': title+ " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({'res','parmeter: name is None'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts),safe=False, status=status.HTTP_200_OK)