from django.conf.urls.defaults import patterns, include, url


urlpatterns = patterns('',
    url(r'^$', 'projects.views.main', name='projects_main'),
)


