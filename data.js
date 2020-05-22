var actors = new Array;
var map = new Array;

function actor(name,position) {
  this.name = name;
  this.inventory = new Array;
  this.position = position;
  this.addItem = addItem;
  actors.push(this);
}

function map_location(id,name,description,actions,hint){
  this.name = name;
  this.description = description;
  this.actions = actions;
  this.tempactions = new Array;
  this.inventory = new Array;
  if (hint) {
    this.hint = hint;
  }
  this.addItem = addItem;
  map[id]=this;
}

function addItem(data){
  var itemIndex
  if (this.inventory.some(function(item,i){
    if (item.name == data.name){
      itemIndex = i;
      return true;
    }
  })) {
    this.inventory[itemIndex].amount += data.amount;
  } else {
    this.inventory.push(data);
  }
}

function playerAddItem(data) {
  var itemIndex
  if (this.inventory.some(function(item,i){
    if (item.name == data.name){
      itemIndex = i;
      return true;
    }
  })) {
    this.inventory[itemIndex].amount += data.amount;
    drawInventory();
  } else {
    drawInventory();
    this.inventory.push(data);
    //is the inventory scrolled all the way down?
    var el = document.getElementById("inv_text");
    var scroll = el.scrollHeight - el.scrollTop - el.clientHeight < 1;

    //write to inventory
    document.getElementById('inv_text').innerHTML += "<div class='list inv fadeup sentence'><span>" + data.name + "</span><span class='amount'>" + data.amount + "</span></div>";

    //scrool down if needed
    if (scroll) {
      el.scroll({top: el.scrollHeight,behavior: 'smooth'})
    }
  }
}
