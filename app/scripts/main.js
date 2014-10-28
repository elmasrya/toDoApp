var toDo = function(options){
  var options=options || {};
  this.name=options.name;
  this.status=options.status || 'incomplete';
}

var item = new toDo({
  name: "item1", 
});
