from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.core.paginator import Paginator
from django.contrib import messages
from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt

def initial(request):
    
    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/index_tobe.html',context)

def mota(request):

    context = {
		# 'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/mota.html',context)

def ad_map_view_w_mota(request):

    context = {
		# 'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/ad_map_view_w_mota.html',context)




def video_grid(request):

    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/surveillance.html',context)

def video_grid_zone1(request):

    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/surveillance_z1.html',context)

def video_grid_zone2(request):

    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/surveillance_z2.html',context)


def video_grid_zone3(request):

    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/surveillance_z3.html',context)

def map_view_tracking(request):

    context = {
		'title': 'About',
		# 'click':run(),
	}
    return render(request,'ecom/map_view_tracking.html',context)

def insights(request):
    
	context = {
		'title': 'About',
		# 'click':run(),
	}
    
	return render(request,'ecom/insights.html',context)



