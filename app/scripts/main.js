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
});
