from tastypie import fields

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authorization import DjangoAuthorization

from tastypie.constants import ALL, ALL_WITH_RELATIONS

from django.contrib.auth.models import User
from projects.models import Project, Member
from tasks.models import Task, Comment
from sprints.models import Sprint
import logging
from django.http import Http404, HttpResponseBadRequest


class ProjectAuthorization(Authorization):
    
    def is_authorized(self, request, object=None):
        return request.user.is_authenticated()

    # Optional but useful for advanced limiting, such as per user.
    def apply_limits(self, request, object_list):        
        if request and hasattr(request, 'user'):            
            return object_list.filter(member__user=request.user)
        return object_list
        #return object_list.none()
    
    
class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        authorization = DjangoAuthorization()
        excludes = ['email', 'password', 'is_staff', 'is_superuser', 'date_joined', 'last_login']


class ProjectResource(ModelResource):
    
    members = fields.ToManyField("api.resources.MemberResource", 'member_set', related_name='project', full=True)

    class Meta:
        queryset = Project.objects.all()
        resource_name = 'project'
        authorization = ProjectAuthorization()
         
#    def get_object_list(self, request):
#        
#        projects = super(ProjectResource, self).get_object_list(request)
#        
#        if request:
#            return projects.filter(member__user=request.user)
#        else:
#            #internal query
#            return projects


class SprintResource(ModelResource):
    project_uri = fields.ToOneField(ProjectResource, 'project')
    tasks = fields.ToManyField("api.resources.TaskResource", 'task_set', related_name='sprint')
        
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


class TaskUserResource(ModelResource):

    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        authorization = DjangoAuthorization()
        fields = ['username', 'id']

    
class TaskResource(ModelResource):
    
    project = fields.ToOneField(ProjectResource, 'project', full=True)
    sprint = fields.ToOneField(SprintResource, 'sprint', null=True, full=True)
    owner = fields.ToOneField(TaskUserResource, 'owner', null=True, full=True)

    class Meta:
        queryset = Task.objects.all()
        resource_name = 'task'
        authorization = Authorization()
        
        filtering = {
            'project': ALL_WITH_RELATIONS,
            'sprint': ALL_WITH_RELATIONS,
            'description': ALL,
            'owner': ALL_WITH_RELATIONS,
        }                
        
#    def get_object_list(self, request):        
#        tasks = super(TaskResource, self).get_object_list(request)        
#        if request:        
#            return tasks.filter(project__member__user=request.user)
#        else:
#            #internal query
#            return tasks

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


class CommentResource(ModelResource):
    task = fields.ForeignKey(TaskResource, 'task')
    user = fields.ForeignKey(UserResource, 'user', full=True)

    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comment'
        authorization = Authorization()
        filtering = {
            'task': ALL_WITH_RELATIONS,
            'user': ALL_WITH_RELATIONS,
        }

    def get_object_list(self, request):
        
        comments = super(CommentResource, self).get_object_list(request)
        if request:
            return comments.filter(task__project__member__user=request.user)
        else:
            #internal query
            return comments


class MemberResource(ModelResource):
    
    project = fields.ToOneField(ProjectResource, 'project')
    user = fields.ToOneField(UserResource, 'user', full=True)

    class Meta:
        queryset = Member.objects.all()
        resource_name = 'member'
        authorization = Authorization()        
        filtering = {
            'project': ALL_WITH_RELATIONS,
            'user': ALL_WITH_RELATIONS,
        }
        excluded = ['user__resource_uri']

#    def get_object_list(self, request):
#        
#        members = super(MemberResource, self).get_object_list(request)
#        if request:
#            return members.filter(project__member__user=request.user)
#        else:
#            #internal query
#            return member
