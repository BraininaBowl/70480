window.onload = function () {
  addLog("Loaded!");
  home = new map_location("home","your house","this is your house.",[{label:"Go outside", move: 'goTo("garden")'}],"You can move by clicking the navigation buttons.");
  home.addItem({name:"table",description:"you know, it's a table.",amount:1,position:"in the center of the room",container:"on top off", inventory:[], addItem : addItem});
  home.inventory.table.addItem({name:"seed",description:"grows into a tree.",amount:31,position:"in a jar on the table",grabable:true});
  garden = new map_location("garden","your garden","just outside your house.",[{label:"Go inside", move: 'goTo("home")'},{label:"Open fence", move: 'goTo("garden")'}]);
  console.log(map);
  player = new actor("player","home");
  player.addItem = playerAddItem;
  player.addItem({name:"item",description:"this is an item!",amount:1});


  drawLocation()

}


function drawLocation() {
  document.getElementById('cont_head').innerHTML = "<span>" + map[player.position].name + "</span>";
  document.getElementById('cont_text').innerHTML = "<span>" + map[player.position].description + "</span> ";
  // clear tempactions
  if (map[player.position].tempactions.length > 0) {
    map[player.position].tempactions.splice(0, map[player.position].tempactions.length);
  }

  //map[player.position].inventory.map(drawItem(currentValue));
  map[player.position].inventory.every(drawItem);


  document.getElementById('cont_nav').innerHTML = "";
  map[player.position].actions.forEach((item, i) => {
    document.getElementById('cont_nav').innerHTML += "<div class='button' onclick='" + item.move + "'>" + item.label + "</div>"
  });
  map[player.position].tempactions.forEach((item, i) => {
    document.getElementById('cont_nav').innerHTML += "<div class='button' onclick='" + item.move + "'>" + item.label + "</div>"
  });
  if (map[player.position].hint) {
    document.getElementById('cont_hint').innerHTML = map[player.position].hint;
  } else {
    document.getElementById('cont_hint').innerHTML = "";
  }
}

function drawItem(element){
  console.log("value ", element);
  if (item.amount > 0 ) {
    var sentence = "<span>";
    if (item.position) {
      sentence += item.position;
    } else {
      sentence += "there";
    }
    if (item.amount > 30) {
      sentence += " are a lot of ";
    } else if (item.amount > 20) {
      sentence += " are some ";
    } else if (item.amount > 1) {
      sentence += " are " + numtotext(item.amount) + " "
    } else {
      sentence += " is a "
    }
    sentence += item.name
    if (item.amount > 1) {
      sentence += "s."
    } else {
      sentence += "."
    }
    sentence += "</span> "
    document.getElementById('cont_text').innerHTML += sentence;

    if (item.grabable) {
      map[player.position].tempactions.push({
        label:"Take a " + item.name,
        move: 'map.' + player.position + '.inventory[' + i + '].amount -= 1; player.addItem({name:"' + item.name + '", description:"' + item.description + '",amount: 1}); drawLocation();'
      });
    }
  }
}









// helpers
function drawInventory(){
  document.getElementById('inv_text').innerHTML = ""
  player.inventory.forEach((item, i) => {
    document.getElementById('inv_text').innerHTML += "<div class='list inv sentence'><span>" + item.name + "</span><span class='amount'>" + item.amount + "</span></div>";
  });
}

function numtotext(num){
  var numbers = ["zero","one","two","three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"]
  if (num <= 20) {
    return numbers[num];
  } else {
    return num;
  }
}

function goTo(map_location) {
  player.position = map_location;
  addLog("entered " + map[player.position].name);
  drawLocation();
}

function addLog(text) {
  //remove past animations
  var animatedlogs = document.getElementsByClassName('log fadeup');
  while(animatedlogs.length > 0){
      animatedlogs[0].classList.remove('fadeup');
  }

  //is the log scrolled all the way down?
  var el = document.getElementById("log_text");
  var scroll = el.scrollHeight - el.scrollTop - el.clientHeight < 1

  // get Date
  var date = new Date();
  var fomatteddate = date.toLocaleString('en-uk',{month: 'long'}) + " " + suffix(date.getDate()) + " " + date.getFullYear() + " - " + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes();
  //var formatteddate = date.toLocaleString('en-uk');
  //write to log
  document.getElementById('log_text').innerHTML += "<div class='list log fadeup sentence'><date class='sub'>" + fomatteddate + "</date>: <br><span>" + text + "</span></div>";

  //scrool down if needed
  if (scroll) {
    el.scroll({top: el.scrollHeight,behavior: 'smooth'})
  }
}



function suffix(number) {
    var tenths = number % 10,
        hundreds = number % 100;
    if (tenths == 1 && hundreds != 11) {
        return number + "st";
    }
    if (tenths == 2 && hundreds != 12) {
        return number + "nd";
    }
    if (tenths == 3 && hundreds != 13) {
        return number + "rd";
    }
    return number + "th";
}
