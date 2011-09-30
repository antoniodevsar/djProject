$(function(){

	window.MyTaskView = Backbone.View.extend({
	  tagName: 'div',
      className: 'task',
      
        events: {	    
	     "click p":"showDetails",
	  },
      
      
      render: function(){      	
      	$(this.el).html(djProject.templates.myTaskTemplate({task: this.model.toJSON() }));                            	
         return this;      	
      },
      
      showDetails: function(e){ 
      	$('.my-task-row').removeClass('active_row');
      	$('.my-task-row',$(this.el)).addClass('active_row');     	      	
      	var view = new TaskDetailsView({model: this.model});      	      	      	
        $("#projects-side").html(view.render(this.model).el);      	
      },
      
	}),
	
    window.TaskView = Backbone.View.extend({
      tagName: 'div',
      className: 'task',

      initialize: function() {
	      this.model.bind('change', this.render);
	      this.model.view = this;
	  },

      events: {      	 
	     "click div.task-details"   : "showDetails",
	     "click div.description .content" : "editDescription",
	     "keypress .description-input" : "updateDescription",
	     "click div.estimated .content" : "editEstimated",
	     "keypress .estimated-input" : "updateEstimated",
	     "click div.remaining .content" : "editRemaining",
	     "keypress .remaining-input" : "updateRemaining",
	     "click div.status .content" : "editStatus",
	     "change div.status .status-input" : "updateStatus",
	     "click div.owner .content" : "editOwner",
	     "change div.owner .owner-input" : "updateOwner",
	     "click div.priority .content" : "editPriority",
	     "change div.priority .priority-input" : "updatePriority",	     
	  },
	  
	  showDetails: function(e) {
	  	  this.highlight();	  	  
          var view = new TaskDetailsView({model: this.model});
          $("#projects-side").html(view.render(this.model).el);
	  },
	  
	  highlight: function(e){
	  	$('div[classname="task"]').removeClass('active_row');
	  	$(this.el).addClass('active_row');
	  },
	  
	  editDescription: function(e) {
	  	  this.showDetails();
	  	  $(".tc").removeClass("editing");
	  	  	  	  
		  $("div.description", this.el).addClass("editing");
		  input = $(".description textarea", $(this.el));
		  input.val(this.model.get('description'));
		  input.focus();

	  },
	  
	  updateDescription: function(e) {
		  if (e.keyCode != 13) return;
		  $(".description", this.el).removeClass("editing");
		  value = $(".description textarea", $(this.el)).val();		  
		  this.model.save({"description": value,
		  					'owner':this.model.get('owner')?this.model.get('owner').resource_uri:null,
		  					'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
		  					'project':this.model.get('project')?this.model.get('project').resource_uri:null,
		  				});		  
	  },
	  
	  editEstimated: function(e) {
	  	  this.showDetails();
	  	  $(".tc").removeClass("editing");
		  $("div.estimated", this.el).addClass("editing");
		  input = $(".estimated input", $(this.el));
		  input.val(this.model.get('estimated'));
		  input.focus();

	  },
	  
	  updateEstimated: function(e) {
		  if (e.keyCode != 13) return;
		  $(".estimated", this.el).removeClass("editing");
		  value = $(".estimated input", $(this.el)).val();
		  this.model.save({"estimated": value,'owner':this.model.get('owner')?this.model.get('owner').resource_uri:null,
		  'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
		  'project':this.model.get('project')?this.model.get('project').resource_uri:null,});	  
		  		  
	  },
	  
	  
	  editStatus: function(e) {	  	  
	      this.showDetails();
	      $(".tc").removeClass("editing");
		  $("div.status", this.el).addClass("editing");
		  input = $(".status select", $(this.el));		  
		  input.val(this.model.get('status')).attr('selected',true);		  		  
		  input.focus();

	  },

	  updateStatus: function(e){
	  	  $(".status", this.el).removeClass("editing");
		  value = $(".status select", $(this.el)).val();		   
		  this.model.save({"status": value,'owner':this.model.get('owner')?this.model.get('owner').resource_uri:null,
		  				'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
		  				'project':this.model.get('project')?this.model.get('project').resource_uri:null,});
		  //this.model.save({"status": value});
	  },
	  
	  editPriority: function(e) {  	  	  	
	      this.showDetails();
	      $(".tc").removeClass("editing");
		  $("div.priority", this.el).addClass("editing");
		  input = $(".priority select", $(this.el));		  		  
		  input.val(this.model.get('priority')).attr('selected',true);		  		  
		  input.focus();
	  },
	  
	  updatePriority: function(e){
	  	  $(".priority", this.el).removeClass("editing");
		  value = $(".priority select", $(this.el)).val();		   
		  this.model.save({"priority": value,'owner':this.model.get('owner')?this.model.get('owner').resource_uri:null,
		  				'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
		  				'project':this.model.get('project')?this.model.get('project').resource_uri:null,});
		  //this.model.save({"status": value});
	  },
	  
	  editOwner: function(e) {
	      this.showDetails();	  	  
	      $(".tc").removeClass("editing");
		  $("div.owner", this.el).addClass("editing");
		  input = $(".owner select", $(this.el));
		  if (this.model.get('owner')){
		  	$('option[value="'+this.model.get('owner').resource_uri+'"]',$(input)).attr('selected', 'selected');
		  }		  		  		  
		  input.focus();		  
	  },

	  updateOwner: function(e){
	  	  $(".owner", this.el).removeClass("editing");
		  value = $(".owner select", $(this.el)).val();		  		  		  
		  this.model.save({"owner": value,
		  					'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
		  					'project':this.model.get('project')?this.model.get('project').resource_uri:null,});		  
	  },
	  
	  editRemaining: function(e) { 
	      this.showDetails();
	      $(".tc").removeClass("editing");
		  $("div.remaining", this.el).addClass("editing");
		  input = $(".remaining input", $(this.el));
		  input.val(this.model.get('remaining'));
		  input.focus();

	  },
	  
	  updateRemaining: function(e) {
		  if (e.keyCode != 13) return;
		  $(".remaining", this.el).removeClass("editing");
		  value = $(".remaining input", $(this.el)).val();		  
		  this.model.save({"remaining": value,'owner':this.model.get('owner')?this.model.get('owner').resource_uri:null,
					  'sprint':this.model.get('sprint')?this.model.get('sprint').resource_uri:null,
					  'project':this.model.get('project')?this.model.get('project').resource_uri:null,});
	  },
	  
      render: function(){
      	  
    	  if (!this.model) return;
    	  var task = this.model.toJSON();
    	  $(this.el).addClass('tr');
    	  $(this.el).addClass('task_row');
    	  $(this.el).attr("id", "task-" + task.id);    	  
    	  members = Array();
    	  
    	  if (window.current_project){
    	  	members = window.current_project.toJSON().members 
    	  
          $(this.el).html(djProject.templates.taskTemplate({task: task, members: members }));
          }                              	
          return this;
          
      }
    });

    window.CommentView = Backbone.View.extend({
        tagName: 'li',
        className: 'comment',

        initialize: function() {
  	      this.model.bind('change', this.render, this);
  	      this.model.view = this;
  	    },

        render: function(){
      	  var comment = this.model.toJSON();
          $(this.el).html(djProject.templates.commentTemplate({comment: comment}));
          return this;
        }
    });

	window.SprintDetailsView =  Backbone.View.extend({
		tagName: 'div',        
		initialize: function() {
  	      this.model.bind('change', this.render, this);
  	     },
  	     render: function(){  	     	  	     	
  	     	$(this.el).html(djProject.templates.sprintDetailTemplate({sprint: this.model.toJSON()}));  	     	
      	    return this;
      	  }
  	 });

    window.TaskDetailsView = Backbone.View.extend({
        tagName: 'div',
        className: 'task',

        initialize: function() {        
  	      this.model.bind('change', this.render, this);
  	      this.model.view = this;  	      
    	  this.comments = new window.Comments({task: this.model});
    	  this.comments.bind('refresh', this.addComments);
    	  this.comments.view = this;
    	  window.comments = this.comments;
    	  
  	  	},
  	  	
  	  	events: {
          //"keypress #new-todo":  "createOnEnter",
          //"keyup #new-todo":     "showTooltip",
          "keypress #new-comment":  "createOnEnter"
  	  	},

	  	addComments: function(){
	  		  $('#comments-list').html('');
	    	  this.each(this.view.addComment);
	    },
	
	    addComment: function(comment){      	
	          var view = new CommentView({model: comment});
	          $('#comments-list').append(view.render().el);
	    },
  	  	
        render: function(task){        	
      	    $(this.el).addClass('tr');      	    
      	    $(this.el).addClass('task');
      	    $(this.el).attr("id", "task-" + task.get('id') );      	    
            $(this.el).html(djProject.templates.taskDetailsTemplate({task: task.toJSON()}));
            //get comments 
            task.view.comments.filtered(task);
            return task.view;
        },      
        
        createOnEnter: function(e){
      	    if (e.keyCode != 13) return;
      	    comment =  {}
          
      	    comment['task'] = this.model.get('resource_uri'); 
      	    comment['comment'] = $("#new-comment").val();
      	    comment['user'] = USER_URI;
      	    
      	    this.comments.create(comment);
      	    $("#new-comment").val('');
        }
    });

    window.SprintView = Backbone.View.extend({
        tagName: 'li',
        className: 'sprint',

	    initialize: function(options) {
	        this.model.bind('change', this.render, this);
	        this.model.view = this;
	    },
	    
	    events: {
	        "click div.sprint"   : "showSprint",
	    },
	    
	    showSprint: function() {
	    	this.model.fetch()	    	
	    	window.current_project = new window.Project({'resource_uri':this.model.get('project_uri')}).fetch()	    		    		    	
	    	window.tasks.filtered(null, this.model);
	    	
	    	this.showDetails();
	    	
	    	window.my_tasks.my_tasks(current_user, null, this.model.get("id"))
	    },
	    
	    showDetails: function(){
	    	v = new window.SprintDetailsView({model: this.model});
	    	$("#projects-side").html(v.render().el);	    	
	    },
	    
        render: function() {
            $(this.el).html(djProject.templates.sprintTemplate({sprint: this.model.toJSON()}));
            return this;
        }
      });
    
    
    window.ProjectView = Backbone.View.extend({
      tagName: 'li',
      classname: 'project',

      initialize: function() {
    	  this.model.bind('change', this.render, this);
    	  this.model.view = this;
    	  this.sprints = new window.Sprints({project: this.model});
    	  this.sprints.bind('refresh', this.addSprints);
    	  this.sprints.view = this;
    	  this.model.sprints = this.sprints;
    	  
    	  
    	  //this.model.sprint.bind('all', this.render, this);    	      
    	  
    	  
      },
      
      events: {
    	  "click div.project"   : "showProject",
          "click div.backlog"   : "showBacklog"
	  },
	  
      addSprints: function(){
    	  $(this.view.el).filter('.project-sprints').html('');
    	  this.each(this.view.addSprint);
      },

      addSprint: function(sprint){      	
          var view = new SprintView({model: sprint});
          $('ul[data-uri="'+sprint.get('project_uri')+'"]').prepend(view.render().el);
      },
      
      showProject: function() {      		      		
	    	window.tasks.filtered(this.model.get("id"));
	    	window.my_tasks.my_tasks(current_user, this.model.get("id"))
	    	//this.model.members.fetch()	 
	    	   		    		    		    	
	  },
	  
	  showBacklog: function() {
	    	window.tasks.filtered(this.model.get("id"), 'backlog');
	  },
      
      render: function() {     	        	  
          $(this.el).html(djProject.templates.projectTemplate({project: this.model.toJSON()}));
          $(".sprint-create", this.el).colorbox({width:"400px", height:"300px", iframe:true});
          $(".add-member", this.el).colorbox({width:"300px", height:"240px", iframe:true});
          this.sprints.fetch();          
          return this;
      }
    });

    window.App = Backbone.View.extend({
      el: $('#main'),

      initialize: function() {
          _.bindAll(this, 'render');
          window.tasks = new window.Tasks();
          window.tasks.bind('refresh', this.addTasks, this);          
          window.tasks.bind('all', this.render, this);          
          window.tasks.fetch();

          window.projects = new window.Projects();
          window.projects.bind('refresh', this.addProjects, this);          
          window.projects.bind('all', this.render, this);
          window.projects.fetch();
          window.current_project = null;
          window.current_sprint = null;
          
          $("#project-create").colorbox({width:"300px", height:"200px", iframe:true});          
          
          
          window.my_tasks = new window.Tasks();
          window.my_tasks.bind('refresh', this.addMyTasks, this);          
          window.my_tasks.bind('all', this.render, this);                              
          window.my_tasks.my_tasks(current_user);
          
          
          //window.my_tasks = window.tasks.my_tasks(current_user);
          //window.my_tasks.bind('refresh', this.addMyTasks, this);
          //window.my_tasks.bind('all', this.render, this);
          //console.log(window.my_tasks)
          
          this.resize_panels();
          
          //TODO: event;                    
          $("#top_buttons > a").click(function(event){          	
          	id = $(event.target).attr('id')          	
          	$('#'+id+'-column').toggle();
          	$(event.target).toggleClass('green')
          	window.app.resize_panels();
          	
          })
      },
      
      
      events: {
          //"keypress #new-todo":  "createOnEnter",
          //"keyup #new-todo":     "showTooltip",                   
          "click .project-link a": "projectTasks",
          "keypress #new-task":  "createOnEnter",
          
          
       },
      
      addTasks: function(){
      	  
    	  $('#projects-tasks').html(djProject.templates.tasksTableHeader({
    		  project: window.current_project,
    		  sprint: window.current_sprint,    		      		    		      		  
    	  }));    	  
          window.tasks.each(window.app.addTask);
          window.app.input = $("#new-task");
      },
	
      addTask: function(task){      	  
          var view = new TaskView({model: task});
          this.$('#projects-tasks-container').append(view.render().el);
      },
      
      addMyTasks: function(){      	  
    	  $('#my-tasks').html(djProject.templates.myTasksTableHeader({}));		    	  
          window.my_tasks.each(window.app.addMyTask);          
      },
      
      addMyTask: function(my_task){      	
      	var view = new MyTaskView({model: my_task});      	
      	this.$('#my-tasks-container').append(view.render().el);
      },
      
      addProjects: function(){
      	  $('#projects-container').html("");
          window.projects.each(window.app.addProject);
      },

      addProject: function(project){      	
          var view = new ProjectView({model: project});
          $('#projects-container').prepend(view.render().el);
      },
      newAttributes: function() {
    	  
          data =  {}
          if (window.current_project) {
        	  data['project'] = window.current_project.get('resource_uri');
          }
          
          if (window.current_sprint) { 
        	  data['sprint'] = window.current_sprint.get('resource_uri');
          }
          data['description'] = window.app.input.val();
          return data;
      },
      createOnEnter: function(e){
    	  if (e.keyCode != 13) return;
          window.tasks.create(this.newAttributes());
          this.input.val('');
      },

	  resize_panels : function(e){	  	
	  	c = 0;	  	
	   	$('.panel').each(function(e,x){   		
	   		if ($(x).is(':visible')){
	   			c+=1
	   		}
	   	})	   	
	    w = 100/c;
	   	$('.panel').css('width',w+'%');	   	
	   	h = parseInt($(document).height()) - 80;
	   	$('.column').css('height',h+'px');	   	
	   }
    });
      
    window.app = new App();
});