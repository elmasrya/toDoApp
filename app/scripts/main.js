var toDo = function(options){
  var options=options || {};
  this.name=options.name;
  this.status=options.status || 'incomplete';
}

var item = new toDo({
  name: "item1",
});

var contWidth = ($('.container').width());
var contHeight = ($('.container').height()) - $('.controls').height();
var item = $('.list li');
var columns = 7;
var rows = 2;
var itemWidth;
var itemHeight;

// Set Interval to adjust item size based on Container size
setInterval(function(){
  contWidth = ($('.container').width());
  contHeight = ($('.container').height()) - $('.controls').height();
  itemWidth = contWidth / columns;
  itemHeight = contHeight / rows;
  $(item).css({'height' : itemHeight, 'width': itemHeight});
  console.log()
}, 100)