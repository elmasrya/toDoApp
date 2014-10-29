var toDo = function(options){
  var options = options || {};
  this.task = options.task || '';
  this.elem = options.elem || {};
  this.done = false;
};

// Collection of todo'
var todoList = [];

var task, contents;
var task_template = $('#task_items').html();
var rendered = _.template(task_template);

$('#sendMessage').on('submit', function(event){

  event.preventDefault();

  // Grab the task value
  contents = $('#text').val();

  // Create to-do instance
  task = new toDo({
    task: contents,
    elem: $(rendered({ task: contents }))[0]
  });

  // Add to my todo list
  todoList.push(task);

  // Show our task on the page
  $('#todoList').append(task.elem);

  // Reset my form
  $(this)[0].reset();

});

var todo_modifier;

// Manage ToDo items
$('#todoList').on('click', 'li', function(event){

  event.preventDefault();

  todo_modifier = _.findWhere(todoList, { elem: $(this)[0] });

  if (todo_modifier.done){
    todo_modifier.done = false;
    $(this).removeClass('done');
  }
  else {
    todo_modifier.done = true;
    $(this).addClass('done');
  }


  console.log(todo_modifier);

});
