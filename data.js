var actors = new Array;
var map = new Array;

function actor(name,position) {
  this.name = name;
  this.inventory = new Array;
  this.position = position;
  this.addItem = addItem;
  actors.push(this);
}

function map_location(name,description,actions){
  this.name = name;
  this.description = description;
  this.actions = actions;
} 

function addItem(name,description,amount){
  if (name in this.inventory ) {
    this.inventory.amount += amount;
  } else {
    this.inventory.push({
      name: name,
      description: description,
      amount: amount
    });
  }
}
