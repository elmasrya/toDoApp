// Styling new list items
var contWidth = ($('.container').width());
var contHeight = ($('.container').height()) - $('.controls').height();
var newItem = $('.list li');
var columns = 7;
var rows = 2;
var itemWidth;
var itemHeight;

var toDo = function(options){
  var options=options || {};
  this.listItem= options.listItem;
  this.name=options.name;
  this.status=options.status || 'incomplete';
}


var item;
var itemArray=[];


var itemTemplate=$('#template').html();
var render = _.template(itemTemplate);

$('#add').on('submit', function(event){
   event.preventDefault();

   var inputVal=$('#text').val();

  item = new toDo({
     name: inputVal,
     listItem: $(render({name: inputVal}))[0]

   });

  itemArray.push(item);

  $('.list').append(item.listItem);

  // Reset my form
  $(this)[0].reset();

  // Set Interval to adjust item size based on Container size
  setInterval(function(){
    contWidth = ($('.container').width());
    contHeight = ($('.container').height()) - $('.controls').height();
    itemWidth = contWidth / columns;
    itemHeight = contHeight / rows;
    $(newItem).css({'height' : itemHeight + 'px', 'width': itemHeight + 'px'});
  }, 100);

  // Mark as completed
  $('.list').on('click', 'li', function(){

    markedItem = _.findWhere(itemArray, { listItem: $(this)[0] });

    if(markedItem.status === 'incomplete'){
      $(this).css('background-color', 'red');
      markedItem.status = 'complete';
    }
    else {
      $(this).css('background-color', 'green');
      markedItem.status = 'incomplete';
    };
  });
});
