from django.conf.urls.defaults import patterns, include, url

from api.resources import ProjectResource, TaskResource, SprintResource,\
    CommentResource, UserResource, MemberResource

comment_resource = CommentResource()
project_resource = ProjectResource()
sprint_resource = SprintResource()
task_resource = TaskResource()
user_resource = UserResource()
member_resource = MemberResource()

urlpatterns = patterns('',
     (r'^v1/', include(comment_resource.urls)),
     (r'^v1/', include(project_resource.urls)),
     (r'^v1/', include(sprint_resource.urls)),
     (r'^v1/', include(task_resource.urls)),
     (r'^v1/', include(user_resource.urls)),
     (r'^v1/', include(member_resource.urls)),
)



