window.onload = function () {
  addLog("Loaded!");
  home = new map_location({id:"home",name:"your house",description:"this is your house",actions:[{label:"Go outside", move: 'goTo("garden")'}],hint:"Try clicking those buttons.", container: "in here", needverb: true});
  home.addItem({id: "table", name:"table", description:"you know, it's a table.", amount:1, container:"<split />on top of the table", needverb: true, inventory:{}});
//  home.addItem({id: "chair", name:"chair", description:"you know, it's a chair.", amount:2, container:"<split />on top of the table", needverb: true, inventory:{}});
  home.inventory.table.addItem({id: "jar", name:"glass jar", description:"can contain things.", amount:1, grabable:true, container:" containing", inventory:{}});
  home.inventory.table.addItem({id: "pen", name:"pen", description:"useful when writing.", amount:1, grabable:true});
  home.inventory.table.addItem({id: "apparatus", name:"apparatus", description:"Errr.", amount:1, grabable:true});
  home.inventory.table.inventory.jar.addItem({id: "seed", name:"seed", description:"grows into a tree.", amount:31, position:"", grabable:true});
  garden = new map_location({id:"garden", name:"your garden",description:"just outside your house.",actions:[{label:"Go inside", move: 'goTo("home")'}]});
  //console.log(map);
  player = new actor("player","home");
  player.addItem = playerAddItem;
  player.addItem({name:"item",description:"this is an item!",amount:1});


  drawLocation()

}


function drawLocation() {
  // clear tempactions
  if (map[player.position].tempactions.length > 0) {
    map[player.position].tempactions.splice(0, map[player.position].tempactions.length);
  }

  let rawParagraph = map[player.position].description + "<split />";
  let printParagraph = "";
  // add a sentence for each root object and its contents
  for (k of Object.keys(map[player.position].inventory)){
    rawParagraph += drawRootItem(map[player.position].inventory[k]);
  }

  rawParagraph.split("<split />").forEach(function e(value, index, array) {
    if (index < array.length-1) {
      printParagraph += capitalize(value) + ". ";
    }
  });

  document.getElementById('cont_head').innerHTML = map[player.position].name;
  document.getElementById('cont_text').innerHTML = printParagraph ;
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
    var sentence = map[player.position].container
    var path = 'map.' + player.position
    sentence += drawItemEnvironment(item,path)
    sentence += "<split />"
    return sentence;
  }
}

function drawItemEnvironment(item,path) {
  if (item.amount > 0 ) {
    //Make grabable
    if (item.grabable) {
      var label
      if (item.amount > 1)  {
        label = "Take a " + item.name
      } else {
        label = "Take the " + item.name
      }
      var grabitem = JSON.stringify(item)
      grabitem = JSON.parse(grabitem)
      grabitem.amount = 1
      map[player.position].tempactions.push({
        label: label,
        move: path + '.removeItem("' + item.id + '",1); player.addItem(' + JSON.stringify(grabitem) + '); drawLocation();'
      });
    }

    var sentence = ""
    if (Object.keys(eval(path + ".inventory"))[0] == item.id) {
      if (item.position) {
          sentence += item.position;
        ;}
      if (eval(path + ".needverb")) {
        if (item.amount > 1 || Object.keys(eval(path + ".inventory")).length > 1) {
          sentence += " are"
        } else {
          sentence += " is"
        }
      }
    } else if (Object.keys(eval(path + ".inventory"))[Object.keys(eval(path + ".inventory")).length - 1] == item.id) {
      // last item in this inventory
      sentence += ", and";
    } else {
      sentence += ",";
    }

    sentence += drawItem(item,path)
    return sentence
  }
}

function drawItem(item,path){
    var sentence = ""
    // first item in this inventory?

    if (item.amount > 30) {
      sentence += " a lot of";
    } else if (item.amount > 20) {
      sentence += " some";
    } else if (item.amount > 1) {
      sentence += " " + numtotext(item.amount)
    } else {
      sentence += " a"
      vowel = /^[euioa]/;
      if (vowel.test(item.name.charAt(0)) || (item.amount == 1 && item.inventory && Object.keys(item.inventory).length == 0)) {
        sentence += "n"
      }
    }
    if (item.inventory && Object.keys(item.inventory).length == 0) {
      sentence += " empty "
    } else {
      sentence += " "
    }
    sentence += item.name
    if (item.amount > 1) {
      sentence += "s"
    } else {
      sentence += ""
    }
    if (item.inventory && Object.keys(item.inventory).length > 0) {
      sentence += item.container;
      path += '.inventory.' + item.id
      for (k of Object.keys(item.inventory)){sentence += drawItemEnvironment(item.inventory[k],path)}
    }
    return sentence
}









// helpers

function capitalize(sentence){
    return(sentence.substring(0,1).toUpperCase() + sentence.substring(1))
}

function drawInventory(newItem,anim){
  document.getElementById('inv_text').innerHTML = ""
  for (k of Object.keys(player.inventory)){
    var newClass = "";
    if (player.inventory[k].id == newItem) {
      newClass = anim
    }
    var desc = drawItem(player.inventory[k],"player");
    document.getElementById('inv_text').innerHTML += "<div class='list inv " + newClass + "'>" + capitalize(desc.trim()) + "</div>"
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
  document.getElementById('log_text').innerHTML += "<div class='list log fadeup sentence'><date class='sub'>" + fomatteddate + "</date><br><span>" + text + "</span></div>";

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
