from django.db import models

class Reservation(models.Model):
    date = models.DateField()
    time = models.TimeField()
    guests = models.PositiveIntegerField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmada')
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def _str_(self):
        return f"{self.name} - {self.date} {self.time}"