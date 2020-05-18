window.onload = function () {
  addLog("loaded!")

  player = new actor("player","home")
  player.addItem("Voorwerp","Dit is het!",1)
  console.log(player.inventory);
  player.addItem("Voorwerp","Dit is het!",1)
  console.log(player.inventory);
  
}


















// helpers

function addLog(text) {
  document.getElementById('log_text').innerHTML += "<div class='log'>" + text + "</div>";
}
