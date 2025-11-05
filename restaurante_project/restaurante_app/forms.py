from django import forms
from .models import Reservation

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['date', 'time', 'guests', 'name', 'email', 'phone', 'notes']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'input'}),
            'time': forms.TimeInput(attrs={'type': 'time', 'class': 'input'}),
            'guests': forms.Select(attrs={'class': 'input'}),
            'name': forms.TextInput(attrs={'class': 'input'}),
            'email': forms.EmailInput(attrs={'class': 'input'}),
            'phone': forms.TextInput(attrs={'class': 'input'}),
            'notes': forms.Textarea(attrs={'class': 'textarea', 'rows': 3}),
        }