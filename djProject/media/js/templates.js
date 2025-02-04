// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

if (typeof djProject == 'undefined') { var djProject = {}; }
if (typeof djProject.templates == 'undefined') { djProject.templates = {}; }


djProject.templates.tasksTableHeader = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>Tasks</h2><span>', (opt_data.project) ? 'Project: ' + soy.$$escapeHtml(opt_data.project.attributes.name) : '', ' ', (opt_data.sprint) ? 'Sprint: ' + soy.$$escapeHtml(opt_data.sprint.attributes.name) : '', '</span><div id="projects-tasks-container" class="table"><div class="thg"><div style="" class="tc">id</div><div style="width: 40%" class="tc">description</div><div style="" class="tc">owner</div><div style="" class="tc">status</div><div style="" class="tc">est.</div><div style="" class="tc">rem.</div><div style="" class="tc">pr.</div></div></div>', (opt_data.project) ? '<div id="create-task"><input id="new-task" placeholder="What needs to be done?" type="text"></div>' : '');
  if (!opt_sb) return output.toString();
};


djProject.templates.taskTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="tc id task-details"><a href="#">', soy.$$escapeHtml(opt_data.task.id), '</a></div><div class="tc description"><div class="content">', soy.$$escapeHtml(opt_data.task.description), '</div><div class="edit"><textarea class="description-input" type="text" value=""></textarea></div></div><div class="tc owner"><div class="content">', soy.$$escapeHtml(opt_data.task.owner ? opt_data.task.owner.username : '--'), '</div><div class="edit"><select class="owner-input"><option value="">Select</option>');
  var mList25 = opt_data.members;
  var mListLen25 = mList25.length;
  for (var mIndex25 = 0; mIndex25 < mListLen25; mIndex25++) {
    var mData25 = mList25[mIndex25];
    output.append('<option value="', soy.$$escapeHtml(mData25.user.resource_uri), '">', soy.$$escapeHtml(mData25.user.username), '</option>');
  }
  output.append('</select></div></div><div class="tc status"><div class="content">', soy.$$escapeHtml(opt_data.task.status), '</div><div class="edit"><select class="status-input"><option value="N">Not Started</option><option value="C">Completed</option><option value="P">In Progress</option><option value="B">Blocked</option></select></div></div><div class="tc estimated"><div class="content">', soy.$$escapeHtml(opt_data.task.estimated ? opt_data.task.estimated : '--'), '</div><div class="edit"><input class="estimated-input" type="text" value=""></div></div><div class="tc remaining"><div class="content">', soy.$$escapeHtml(opt_data.task.remaining != null ? opt_data.task.remaining : '--'), '</div><div class="edit"><input class="remaining-input" type="text" value=""></div></div><div class="tc priority"><div class="content">', soy.$$escapeHtml(opt_data.task.priority ? opt_data.task.priority : '--'), '</div><div class="edit"><select class="priority-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div></div>');
  if (!opt_sb) return output.toString();
};


djProject.templates.sprintTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="sprint" data-sprint="', soy.$$escapeHtml(opt_data.sprint.id), '" data-project="', soy.$$escapeHtml(opt_data.sprint.project), '"><a href="#">-- ', soy.$$escapeHtml(opt_data.sprint.name), '</a></div>');
  if (!opt_sb) return output.toString();
};


djProject.templates.projectTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="project-', soy.$$escapeHtml(opt_data.project.id), '" class="project"><a href="#">', soy.$$escapeHtml(opt_data.project.name), '</a></div><ul class="project-sprints" data-uri="', soy.$$escapeHtml(opt_data.project.resource_uri), '"><div class="backlog"><a href="#">backlog</a></ul><a class="cboxElement add-member" href="/projects/member_add/', soy.$$escapeHtml(opt_data.project.id), '/">add member</a><a class="sprint-create" class="cboxElement" href="/sprints/new/', soy.$$escapeHtml(opt_data.project.id), '/" title="">Create Sprint</a>');
  if (!opt_sb) return output.toString();
};


djProject.templates.taskDetailsTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>Task Details</h2><h2>Description</h2><p class="description">', soy.$$escapeHtml(opt_data.task.description), '</p><h2>Comments</h2><ul id="comments-list">no comments</ul><div id="create-comment"><input id="new-comment" placeholder="Something to say?" type="text"></div><ul id="log-list">no comments</ul><h2>History</h2>');
  if (!opt_sb) return output.toString();
};


djProject.templates.commentTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<p class="comment">', soy.$$escapeHtml(opt_data.comment.comment), '<span class="username">. by ', soy.$$escapeHtml(opt_data.comment.user.username), '</span></p>');
  if (!opt_sb) return output.toString();
};


djProject.templates.sprintDetailTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>Sprint Details</h2><p>Name: ', soy.$$escapeHtml(opt_data.sprint.name), '</p><p>Start: ', soy.$$escapeHtml(opt_data.sprint.start_date), '</p><p>End: ', soy.$$escapeHtml(opt_data.sprint.end_date), '</p><p>Tasks: ', soy.$$escapeHtml(opt_data.sprint.tasks.length), '</p>');
  if (!opt_sb) return output.toString();
};


djProject.templates.myTasksTableHeader = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<h2>My Tasks</h2><div id="my-tasks-container"></div>');
  if (!opt_sb) return output.toString();
};


djProject.templates.myTaskTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<p class="my-task-row"><a href="#" class="task_id ', soy.$$escapeHtml(opt_data.task.status), '"></a><span class="task_description">', soy.$$escapeHtml(opt_data.task.description), '</span><span class="task_priority">', soy.$$escapeHtml(opt_data.task.priority), '</span>', (opt_data.task.estimated != null) ? '<span class="task_estimated">' + soy.$$escapeHtml(opt_data.task.estimated) + '</span>' : '', (opt_data.task.remaining != null) ? '<span class="task_remaining">' + soy.$$escapeHtml(opt_data.task.remaining) + '</span>' : '', (opt_data.task.comments.length) ? '<span class="task_comments" title="' + soy.$$escapeHtml(opt_data.task.comments.length) + '"></span>' : '', '</p>');
  if (!opt_sb) return output.toString();
};
