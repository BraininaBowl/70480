window.onload = function () {
  addLog("loaded!");

  player = new actor("player","home");
  player.addItem("Voorwerp","Dit is het!",1);
  console.log(player.inventory);
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

  //write to log
  document.getElementById('log_text').innerHTML += "<div class='log fadeup'>" + text + "</div>";

  //scrool down if needed
  if (scroll) {
    el.scroll({top: el.scrollHeight,behavior: 'smooth'})
  }
}
