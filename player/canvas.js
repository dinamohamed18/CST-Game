var thecanvas = document.getElementById("ourcanvas"),
theContext = thecanvas.getContext('2d')
var img = new Image();
img.src="1.png";
var keysPressed ={};
var x = 410 ;
var y = 220 ;

var soundtrig = true ;
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    
      this.sound.play();

  }
  
class Player {
    constructor(name ,level ,type ) {

        this.name = name
        this.level = level
        this.type = type

      }

    draw () 
    {
        theContext.drawImage(img,x,y); 
    }
    hit()
    {

    }
    move() 
    { 
    theContext.clearRect(0, 0, thecanvas.width, thecanvas.height);
     theContext.drawImage(img,x,y); 
        
    }

}

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});
document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    if(soundtrig)
    {
        soundtrig=false;
        sound("mymp3.mp3")
    }
    
    if (((event.keyCode == 87 && keysPressed["d"] == true) ||(event.keyCode == 68 && keysPressed["w"] == true) )&&    ( y >=10 && x <= 870))
    {
        x += 10;
        y -= 10;
        img.src = "2.png"; 
        
    }
    // down right
    else if (((event.keyCode == 83 && keysPressed["d"] == true)||(event.keyCode == 68 && keysPressed["s"] == true)) && (y <= 460 && x <= 870))
    {
        x += 10;
        y += 10;
        img.src = "4.png"; 
        
    }
    // up left
    else if (((event.keyCode == 87 && keysPressed["a"] == true) ||(event.keyCode == 65 && keysPressed["w"] == true) )&&    ( y >=10 && x >= 10))
    {
        x -= 10;
        y -= 10;
        img.src = "8.png"; 
        
    }
    //down left
    else if (((event.keyCode == 83 && keysPressed["a"] == true) ||(event.keyCode == 65 && keysPressed["s"] == true) )&&    ( y <=460 && x >= 10))
    {
        x -= 10;
        y += 10;
        img.src = "6.png"; 
        
    }
    
    //left
    else if(event.keyCode == 65 && x >= 10 ) 
    {
        x -= 10;
        img.src = "7.png"; 
    }
    //top
    else if(event.keyCode == 87 && y >=10)
    {
        y -= 10;
        img.src = "1.png"; 
        
    }
    //right
    else if(event.keyCode == 68 && x <= 870) 
    {
        x += 10;
        img.src = "3.png"; 
    }
    //bottom
    else if(event.keyCode == 83 && y <= 460)
    {
        y += 10;
        img.src = "5.png"; 
        
    }
    

    // event.preventDefault();
});



var p1 = new Player ("islam",1,2);
setInterval(p1.move, 1);