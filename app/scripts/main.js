var toDoServer = 'http://tiy-atl-fe-server.herokuapp.com/collections/ARtoDoApp';

var toDo = function(options){
  var options=options || {};
  this.name=options.name;
  this.status=options.status || 'incomplete';
};

var item;
var itemArray;


var itemTemplate=$('#template').html();
var render = _.template(itemTemplate);

// Put all exisiting toDo items on page
$.getJSON(toDoServer).done( function(data){
  itemArray = data;
  _.each(itemArray, function(item){
    $('.list').append(render(item));
  });
});

$('#add').on('submit', function(event){
   event.preventDefault();

   var inputField = this;

   var inputVal=$('#text').val();

   // Create a new instance
   item = new toDo({
     name: inputVal
   });

   // Send item to server
   $.ajax({
     type: 'POST',
     url: toDoServer,
     data: item
   }).done( function(data){

     // Store newly created item instance in an array, 'itemArray'
    itemArray.push(data);

    $('.list').append(render(data));

    // Reset my form
    $(inputField)[0].reset();

   });

});

var markedItem;

// Mark as completed
$('.list').on('click', 'li', function(event){

  event.preventDefault();

  var itemID = $(this).attr('id');

  $(this).toggleClass('complete');

  // Find the object in the itemArray array that has matching values to the one clicked on.
  markedItem = _.findWhere(itemArray, { _id: itemID });

  // if incomplete, mark as complete. Otherwise, mark as incomplete.
  if(markedItem.status === 'incomplete'){
    markedItem.status = 'complete';
    console.log(markedItem);
  }
  else {
    markedItem.status = 'incomplete';
    console.log(markedItem);
  }

  $.ajax({
    type: 'PUT',
    url: toDoServer + '/' + markedItem._id,
    data: markedItem
  });

});

$('#removeComp').on('click', function() {

  // completedItems = _.findWhere(itemArray, { status:'complete' });


  // console.log(completedItems);

  _.each(itemArray, function(item){

  var compId = item._id;

  if (item.status==='complete'){
  $.ajax({
    type: 'DELETE',
    url: toDoServer + '/' + compId,
    data: item
  });
};
  console.log(item);

});

  $('.complete').remove();/*This will remove all the list items with the class of complete*/

});
