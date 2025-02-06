from django.db import models
from .choices import STATUS_CHOICES

# Create your models here.


class Location(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['latitude', 'longitude'], name='unique_location')
        ]

    def __str__(self):
        return f'{self.latitude} - {self.longitude}'

class UserObservation(models.Model):
    gps_location = models.ForeignKey(Location,on_delete=models.CASCADE,related_name='observations')
    mosquito_img = models.ImageField(upload_to='user_mosquito_images')
    date = models.DateTimeField(auto_now_add=True )

    def delete(self, *args, **kwargs):

        location = self.gps_location
        super().delete(*args, **kwargs) 

        if not location.observations.exists():
            location.delete()


    def __str__(self):
        return f' Observation on {self.gps_location} at {self.date}'

class IdentificationTask(models.Model):
    user_observation = models.ForeignKey(UserObservation, on_delete=models.CASCADE)
    status = models.CharField(max_length=1,choices=STATUS_CHOICES, default='0')

    def __str__(self):
        return f'{self.user_observation} - {self.status}'