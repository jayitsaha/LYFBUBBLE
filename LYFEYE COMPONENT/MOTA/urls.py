"""MOTA URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path,include
from MOTA import views
from django.urls import re_path as url

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    # path('',views.initial),
    path('surveillance',views.video_grid),
    path('surveillance/z1',views.video_grid_zone1),
    path('surveillance/z2',views.video_grid_zone2),
    path('surveillance/z3',views.video_grid_zone3),
    path('surveillance/map_view',views.map_view_tracking),    
    path('', views.mota),
    path('ad_map_view_w_mota/', views.ad_map_view_w_mota),
    path('insights/', views.insights)



]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

