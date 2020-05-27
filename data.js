var actors = new Array;
var map = new Array;

function actor(name,position) {
  this.name = name;
  this.inventory = new Array;
  this.position = position;
  this.addItem = addItem;
  this.removeItem = removeItem;
  actors.push(this);
}

function map_location(data){
  this.name = data.name;
  for (k of Object.keys(data)){this[k] = data[k]}
  this.tempactions = new Array;
  this.inventory = new Array;
  this.addItem = addItem;
  this.removeItem = removeItem;
  map[data.id]=this;
}

function removeItem(id,amount) {
  if (!amount) {
    amount = "all"
  }
  if (amount != "all") {
    this.inventory[id].amount -= amount;
  }
  if (amount == "all" || this.inventory[id].amount <= 0) {
    delete this.inventory[id];
  }
}

function addItem(data){
  var itemIndex
  if (this.inventory[data.id]) {
    this.inventory[data.id].amount += data.amount;
  } else {
    this.inventory[data.id] = data;
  }
  if (data.inventory) {
    this.inventory[data.id].addItem = addItem;
    this.inventory[data.id].removeItem = removeItem;
  }
}

function playerAddItem(data) {
  if (this.inventory[data.id]) {
    this.inventory[data.id].amount = Number(this.inventory[data.id].amount) + Number(data.amount);
    drawInventory(data.id, "pulse");
  } else {
    //is the inventory scrolled all the way down?
    var el = document.getElementById("inv_text");
    var scroll = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    this.inventory[data.id] = data;
    drawInventory(data.id,"fadeup");

        //scrool down if needed
    if (scroll) {
      el.scroll({top: el.scrollHeight,behavior: 'smooth'})
    }
  }
}
