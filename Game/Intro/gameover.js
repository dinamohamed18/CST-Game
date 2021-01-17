function gameover() {
  this.draw = function(){
    ctx.font = "60px Arial"
    ctx.fillStyle = "Black"
   ctx.fillText("GAMEOVER!!! Press Enter to retry!",20,100)
      clearInterval(animateInterval);
  }

   isGameOver = true;

}

 ctx.canvas.addEventListener('mousemove', function(event){

  if(isGameOver !== true) {

  auto.x = event.clientX-(auto.w*0.5)
      auto.y = event.clientY-(auto.h*0.5)
    Menu.stattX = event.clientX
     Menu.stattY = event.clientY
  }
 });
