"""
    Projects forms
"""

from django import forms
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User 


class ProjectForm(forms.Form):
    """
        project form
    """
    name = forms.CharField(max_length=100, label=_("Name"))


class ProjectMemberForm(forms.Form):
    """
        project member form
    """
    users = forms.ModelMultipleChoiceField(User.objects.all())
