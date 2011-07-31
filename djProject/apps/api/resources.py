from tastypie import fields

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

from projects.models import Project
from tasks.models import Task
from sprints.models import Sprint
import logging
from django.http import Http404, HttpResponseBadRequest


class ProjectResource(ModelResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = Authorization()

    def get_object_list(self, request):
        
        projects = super(ProjectResource, self).get_object_list(request)
        if request:
            return projects.filter(member__user=request.user)
        else:
            #internal query
            return projects
            

class SprintResource(ModelResource):
    project_uri = fields.ToOneField(ProjectResource, 'project')
    class Meta:
        queryset = Sprint.objects.all()
        resource_name = 'sprint'
        authorization = Authorization()
        fields = ['id', 'project__id', 'name', 'start_date', 'end_date']

    def get_object_list(self, request):
        sprints = super(SprintResource, self).get_object_list(request)        
        if request:
            return sprints.filter(project__member__user=request.user)
        else:
            #internal query
            return sprints

    def build_filters(self, filters=None):
        if filters is None:
            filters = {}

        orm_filters = super(SprintResource, self).build_filters(filters)

        if "project" in filters:
            orm_filters["project__id"] = filters['project']
        
        return orm_filters


class TaskResource(ModelResource):
    project = fields.ForeignKey(ProjectResource, 'project')
    sprint = fields.ForeignKey(SprintResource, 'sprint', null=True)

    class Meta:
        queryset = Task.objects.all()
        resource_name = 'task'
        authorization = Authorization()
        filtering = {
            'project': ALL_WITH_RELATIONS,
            'sprint': ALL_WITH_RELATIONS,
            'description': ALL,
        }

    def get_object_list(self, request):        
        tasks = super(TaskResource, self).get_object_list(request)        
        return tasks.filter(project__member__user=request.user)

    def build_filters(self, filters=None):
        if filters is None:
            filters = {}

        if "sprint" in filters:
            sprint = filters["sprint"]
            del filters["sprint"]
        else:
            sprint = None    

        orm_filters = super(TaskResource, self).build_filters(filters)
        

        if "project" in filters:
            orm_filters["project__id"] = filters['project']
        
        if sprint:
            if sprint == 'backlog':
                orm_filters["sprint__isnull"] = True
            else:
                orm_filters["sprint__id"] = sprint
        
        
        return orm_filters
