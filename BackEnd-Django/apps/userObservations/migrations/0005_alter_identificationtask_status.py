# Generated by Django 5.1.5 on 2025-02-10 09:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userObservations', '0004_alter_userobservation_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='identificationtask',
            name='status',
            field=models.CharField(choices=[('0', 'pending'), ('1', 'in-progress'), ('2', 'completed')], default='0', max_length=1),
        ),
    ]
