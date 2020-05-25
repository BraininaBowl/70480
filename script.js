window.onload = function () {
  addLog("Loaded!");
  home = new map_location({id:"home",name:"your house",description:"this is your house.",actions:[{label:"Go outside", move: 'goTo("garden")'}],hint:"You can move by clicking the navigation buttons.", container: "in here"});
  home.addItem({name:"table", description:"you know, it's a table.", amount:1, needverb: true, container:".</span> <span>on top of the table", inventory:{}, addItem : addItem});
  home.inventory.table.addItem({name:"jar", description:"can contain things.", amount:1, needverb: true, grabable:true, container:" containing", inventory:{}, addItem : addItem});
  home.inventory.table.inventory.jar.addItem({name:"seed", description:"grows into a tree.", amount:31, position:"", grabable:true});
  garden = new map_location({id:"garden", name:"your garden",description:"just outside your house.",actions:[{label:"Go inside", move: 'goTo("home")'},{label:"Open fence", move: 'goTo("garden")'}]});
  //console.log(map);
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

  for (k of Object.keys(map[player.position].inventory)){drawRootItem(map[player.position].inventory[k])}

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

function drawRootItem(item){
  if (item.amount > 0 ) {
    var sentence = "<span>" + map[player.position].container
    sentence += drawItem(item)
    sentence += "</span> "
    document.getElementById('cont_text').innerHTML += sentence;
  }
}

function drawItem(item){
  if (item.grabable) {
    var label = "Take the " + item.name
    if (item.amount > 1)  {
      label += "s"
    }
    var data = "{"
    for (k of Object.keys(item)){data += k + ': "' + item[k] + '",';}
    data += "}"

    map[player.position].tempactions.push({
      label: label,
      move: 'player.addItem(' + data + '); drawLocation();'
    });
  }

  sentence = ""
  if (item.position) {
    sentence += item.position;
  }
  if (item.needverb) {
    if (item.amount > 1) {
      sentence += " are"
    } else {
      sentence += " is"
    }
  }
  if (item.amount > 30) {
    sentence += " a lot of";
  } else if (item.amount > 20) {
    sentence += " some";
  } else if (item.amount > 1) {
    sentence += " " + numtotext(item.amount)
  } else {
    sentence += " a"
  }
  if (item.inventory && Object.keys(item.inventory).length == 0) {
    if (item.amount == 1) {
      sentence += "n"
    }
    sentence += " empty "
  } else {
    sentence += " "
  }
  sentence += item.name
  if (item.amount > 1) {
    sentence += "s "
  } else {
    sentence += ""
  }
  if (item.inventory && Object.keys(item.inventory).length > 0) {
    sentence += item.container;
    for (k of Object.keys(item.inventory)){sentence += drawItem(item.inventory[k])}
  }
  return sentence

}









// helpers
function drawInventory(newItem,anim){
  document.getElementById('inv_text').innerHTML = ""
  for (k of Object.keys(player.inventory)){
    var newClass
    if (player.inventory[k].name == newItem) {
      newClass = anim
    }
    document.getElementById('inv_text').innerHTML += "<div class='list inv sentence " + newClass + "'><span>" + player.inventory[k].name + "</span><span class='amount'>" + player.inventory[k].amount + "</span></div>"
  }
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
