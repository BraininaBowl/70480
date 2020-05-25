var actors = new Array;
var map = new Array;

function actor(name,position) {
  this.name = name;
  this.inventory = new Array;
  this.position = position;
  this.addItem = addItem;
  actors.push(this);
}

function map_location(data){
  for (k of Object.keys(data)){this[k] = data[k]}
  this.name = data.name;
  this.description = data.description;
  this.actions = data.actions;
  this.tempactions = new Array;
  this.inventory = new Array;
  if (data.hint) {
    this.hint = data.hint;
  }
  this.addItem = addItem;
  map[data.id]=this;
}

function addItem(data){
  var itemIndex
  if (this.inventory[data.name]) {
    this.inventory[data.name].amount += data.amount;
  } else {
    this.inventory[data.name] = data;
  }
}

function playerAddItem(data) {
  console.log(player.inventory);
  if (this.inventory[data.name]) {
    this.inventory[data.name].amount = Number(this.inventory[data.name].amount) + Number(data.amount);
    drawInventory(data.name, "pulse");
  } else {
    //is the inventory scrolled all the way down?
    var el = document.getElementById("inv_text");
    var scroll = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    this.inventory[data.name] = data;
    drawInventory(data.name,"fadeup");

        //scrool down if needed
    if (scroll) {
      el.scroll({top: el.scrollHeight,behavior: 'smooth'})
    }
  }
}
