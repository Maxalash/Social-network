# Generated by Django 4.0.3 on 2022-04-05 05:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_remove_messageimage_message_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commentlike',
            old_name='posts',
            new_name='comment',
        ),
    ]