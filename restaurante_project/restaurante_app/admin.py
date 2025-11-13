
from django.contrib import admin
from .models import Reservation, Categoria, Plato, Pedido, DetallePedido

class DetallePedidoInline(admin.TabularInline):
    model = DetallePedido
    extra = 1 # Numero de lineas de detalle extra para anadir
    readonly_fields = ('precio_unitario',)

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'fecha', 'total', 'estado')
    list_filter = ('estado', 'fecha')
    search_fields = ('cliente__username', 'id')
    inlines = [DetallePedidoInline]

    def save_model(self, request, obj, form, change):
        # Recalculate total when saving from admin
        super().save_model(request, obj, form, change)
        total = sum(detalle.cantidad * detalle.plato.precio for detalle in obj.detalles.all())
        obj.total = total
        obj.save()

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre',)

@admin.register(Plato)
class PlatoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio')
    list_filter = ('categoria',)
    search_fields = ('nombre',)

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'time', 'guests', 'status')
    list_filter = ('status', 'date')
    search_fields = ('name', 'email')

# El modelo DetallePedido se gestiona a traves de PedidoAdmin, por lo que no es necesario registrarlo por separado.
