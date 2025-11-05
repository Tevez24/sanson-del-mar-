from django.urls import path
from . import views


urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('inicio/', views.inicio, name='inicio'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('menu/', views.menu, name='menu'),
    path('carrito/', views.carrito, name='carrito'),
    path('reserva/', views.reserva, name='reserva'),
    path('contacto/', views.contacto, name='contacto'),
    path('eventos/', views.eventos, name='eventos')
]
