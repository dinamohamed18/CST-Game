var x=0;
var y=0;
var mouseX;
var mouseY;
var imgX;
var imgY;
var diffX;
var diffY;
var angle_rad;
var angle_deg;
var img=document.getElementsByTagName("img")[0]
var bulletList = [];
var bulletid=1
var xpos 
var ypos
var bulletang





var keysPressed ={};
class bullet {
    constructor(x,y,angl,spd,id)
    {
        this.xpos=x+45
        this.ypos=y+45
        this.ang=angl
        this.speed=spd
        this.id=id
        this.intervalid=0
    }
    createbullet ()
    {
        var mydiv = document.createElement("div");
        mydiv.style.position='relative';
        mydiv.style.backgroundColor='transparent';
        mydiv.style.width='30px';
        mydiv.style.height='30px';
        mydiv.style.position='absolute'
        mydiv.style.display='none';
        mydiv.style.boxSizing='border-box';
        mydiv.id=this.id+"div"
        var bulle = document.createElement("img");
        bulle.id=this.id+"img"
        bulle.src = "bul.png";
        bulle.style.transform='rotate('+this.ang*180/Math.PI+'deg)'
        mydiv.appendChild(bulle);
        mydiv.style.left=this.xpos
        mydiv.style.top=this.ypos
        document.getElementById("bod").appendChild(mydiv);
        var t = this;
        this.intervalid=setInterval(function(){t.move();}, 30);

        

    }  
    move()
    {
        if(this.xpos>1920 || this.ypos>1080 || this.xpos<0 || this.ypos<0)
        {
            clearInterval(this.intervalid)
            var ele= document.getElementById(this.id+"div")
            ele.remove()
             // bulletList.pop() remove by this id
       
        }
        else
        {
        this.xpos += this.speed * Math.sin(this.ang);
        this.ypos -= this.speed * Math.cos(this.ang);
        var ele= document.getElementById(this.id+"div")
        
        ele.style.left=''+ this.xpos +'px';
        ele.style.top=''+ this.ypos +'px'; 
        ele.style.display='inline';
               
    }
}
    
}
class Player {
    constructor(name ,level ,type ) {

        this.name = name
        this.level = level
        this.type = type
        
    }
    
    draw () 
    {
        
        
        
    }
    hit()
    {
        
    }
    move() 
    { 
        
        document.getElementsByTagName("div")[0].style.display='inline';
        document.getElementsByTagName("div")[0].style.boxSizing='border-box';
        document.getElementsByTagName("div")[0].style.left=''+ x +'px';
        document.getElementsByTagName("div")[0].style.top=''+ y +'px';             
    }
}
var p1 = new Player ("islam",1,2);
document.addEventListener('click',(event) =>{   
    

    var bu = new bullet (x,y,angle_rad,15,bulletid)
    bu.createbullet()
    bulletList.push(bu)
    bulletid +=1
 

})
    document.addEventListener('mousemove',(event) =>{
        var div=document.getElementsByTagName("div")[0]
        imgX=div.offsetLeft+img.width/2
        imgY=div.offsetTop+img.height/2
        mouseX=event.clientX;
        mouseY=event.clientY;
        diffX=mouseX-imgX;
        diffY=mouseY-imgY;
        angle_rad=Math.atan2(diffX,-diffY);
        angle_deg=angle_rad*180/Math.PI;
        update();
        })
    function  update(){
    document.getElementsByTagName("img")[0].style.transform='rotate('+angle_deg+'deg)'
            
    }
    



    document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
     });
    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
 
        if (((event.keyCode == 87 && keysPressed["d"] == true) ||(event.keyCode == 68 && keysPressed["w"] == true) )&&    ( y >=10 && x <= 1800))
        {
            x += 10;
            y -= 10;
            
        }
        // down right
        else if (((event.keyCode == 83 && keysPressed["d"] == true)||(event.keyCode == 68 && keysPressed["s"] == true)) && (y <= 950 && x <= 1800))
        {
            x += 10;
            y += 10;
            
        }
        // up left
        else if (((event.keyCode == 87 && keysPressed["a"] == true) ||(event.keyCode == 65 && keysPressed["w"] == true) )&&    ( y >=10 && x >= 10))
        {
            x -= 10;
            y -= 10;
            
        }
        //down left
        else if (((event.keyCode == 83 && keysPressed["a"] == true) ||(event.keyCode == 65 && keysPressed["s"] == true) )&&    ( y <=950 && x >= 10))
        {
            x -= 10;
            y += 10;
            
        }
        
        //left
        else if(event.keyCode == 65 && x >= 10 ) 
        {
            x -= 10;
        }
        //top
        else if(event.keyCode == 87 && y >=10)
        {
            y -= 10;
            
        }
        //right
        else if(event.keyCode == 68 && x <= 1800) 
        {
            x += 10;
        }
        //bottom
        else if(event.keyCode == 83 && y <= 950)
        {
            y += 10;
            
        }
    });



    setInterval(p1.move,1)