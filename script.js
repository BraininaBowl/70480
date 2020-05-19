window.onload = function () {
  addLog("Loaded!");
  home = new map_location("home","your house","This is your house",[{label:"Go outside", move: "garden"}],"You can move by clicking the navigation buttons.");
  garden = new map_location("garden","your garden","Just outside your house",[{label:"Go inside", move: "home"},{label:"Open fence", move: "garden"}]);
  console.log(map);
  player = new actor("player","home");
  player.addItem("Voorwerp","Dit is het!",1);


  drawLocation()
}


function drawLocation() {
  document.getElementById('cont_head').innerHTML = map[player.position].name;
  document.getElementById('cont_text').innerHTML = map[player.position].description;
  document.getElementById('cont_nav').innerHTML = "";
  map[player.position].actions.forEach((item, i) => {
    document.getElementById('cont_nav').innerHTML += "<div class='button' onclick=goTo('" + item.move + "')>" + item.label + "</div>"
  });
  if (map[player.position].hint) {
    document.getElementById('cont_hint').innerHTML = map[player.position].hint;
  } else {
    document.getElementById('cont_hint').innerHTML = "";
  }
}

function goTo(map_location) {
  player.position = map_location;
  addLog("Entered " + map[player.position].name);
  drawLocation();
}









// helpers



function addLog(text) {
  //is the log scrolled all the way down?
  var el = document.getElementById("log_text");
  var scroll = el.scrollHeight - el.scrollTop - el.clientHeight < 1

  //remove past animations
  var animatedlogs = document.getElementsByClassName('log fadeup');
  while(animatedlogs.length > 0){
      animatedlogs[0].classList.remove('fadeup');
  }

  // get Date
  var date = new Date();
  var fomatteddate = date.toLocaleString('en-uk',{month: 'long'}) + " " + suffix(date.getDate()) + " " + date.getFullYear() + " - " + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes();
  //var formatteddate = date.toLocaleString('en-uk');
  //write to log
  document.getElementById('log_text').innerHTML += "<div class='log fadeup'><span class='date'>" + fomatteddate + "</span>: " + text + "</div>";

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
