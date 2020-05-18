var actors = new Array;
var map = new Array;

function actor(name,position) {
  this.name = name;
  this.inventory = new Array;
  this.position = position;
  this.addItem = addItem;
  actors.push(this);
}

function map_location(id,name,description,actions){
  this.name = name;
  this.description = description;
  this.actions = actions;
  map[id]=this;
}

function addItem(name,description,amount){
  var itemIndex
  if (this.inventory.some(function(item,i){
    if (item.name == name){
      itemIndex = i;
      return true;
    }
  })) {
    this.inventory[itemIndex].amount += amount;
  } else {
    this.inventory.push({
      name: name,
      description: description,
      amount: amount
    });
  }

}
