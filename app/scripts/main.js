var toDoServer = 'http://tiy-atl-fe-server.herokuapp.com/collections/ARtoDoApp';

var toDo = function(options){
  var options=options || {};
  this.name=options.name;
  this.status=options.status || 'incomplete';
};

var item;
var itemArray;
var compCount=0;


var itemTemplate=$('#template1').html();
var render = _.template(itemTemplate);

// var countTemplate=$('#template2').html();
// var renderCount = _.template(countTemplate);

// Put all exisiting toDo items on page
$.getJSON(toDoServer).done( function(data){
  itemArray = data;
  _.each(itemArray, function(item){
    if (item.status==='complete') {
      compCount++;
    };
    $('.list').append(render(item));
  });
  $('.compCount').html(compCount);
  $('.totalCount').html(itemArray.length);
  console.log("compCount: "+ compCount);
  console.log("itemArray: " + itemArray.length);
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
    $('.totalCount').html(itemArray.length);

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
  var itemClicked = this;

  // Find the object in the itemArray array that has matching values to the one clicked on.
  markedItem = _.findWhere(itemArray, { _id: itemID });

  // if incomplete, mark as complete. Otherwise, mark as incomplete.
  if(markedItem.status === 'incomplete'){
    markedItem.status = 'complete';
    compCount++;
    $('.compCount').html(compCount);
    $('.totalCount').html(itemArray.length);
    $(itemClicked).addClass('complete').removeClass('incomplete');
  }
  else {
    markedItem.status = 'incomplete';
    compCount--;
    $('.compCount').html(compCount);
    $('.totalCount').html(itemArray.length);
    $(itemClicked).addClass('incomplete').removeClass('complete');
  }

  $.ajax({
    type: 'PUT',
    url: toDoServer + '/' + markedItem._id,
    data: markedItem
  });

});

$('#removeComp').on('click', function() {

  _.each(itemArray, function(item){

    var compId = item._id;

    if (item.status==='complete'){

      // Delete from server
      $.ajax({
        type: 'DELETE',
        url: toDoServer + '/' + compId,
        data: item
      });

      // Delete from itemArray
      var index = itemArray.indexOf(item);
      itemArray.splice(index, 1);
      compCount--;

    };

  });

  $('.compCount').html(compCount);
  $('.totalCount').html(itemArray.length);

  $('.complete').remove();/*This will remove all the list items with the class of complete*/

});

// Filtering
$('#completeF').on('click', function(){
  $('.incomplete').css('display', 'none');
  $('.complete').css('display', 'inline-block');
});
$('#activeF').on('click', function(){
  $('.complete').css('display', 'none');
  $('.incomplete').css('display', 'inline-block');
});
$('#allF').on('click', function(){
  $('.incomplete').css('display', 'inline-block');
  $('.complete').css('display', 'inline-block');
});
