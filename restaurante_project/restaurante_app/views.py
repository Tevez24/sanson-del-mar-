from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from .forms import ReservationForm as Reserva


# Create your views here.
def contacto(request):
    return render(request, 'restaurante_app/contacto.html')


def nosotros(request):
    return render(request, 'restaurante_app/nosotros.html')


def menu(request):
    return render(request, 'restaurante_app/menu.html')


def reserva(request):
    if request.method == 'POST':
        form = Reserva (request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Tu reserva ha sido realizada con éxito!')
            return redirect('reserva')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = Reserva()    
    return render(request, 'restaurante_app/reserva.html', {'form': form})



def inicio(request):
    return render(request, 'restaurante_app/inicio.html')


def eventos(request):
    return render(request, 'restaurante_app/eventos.html')

def carrito(request):
    return render (request, 'restaurante_app/carrito.html')