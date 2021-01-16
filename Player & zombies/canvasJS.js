var x = 0;
var y = 0;
var mouseX;
var mouseY;
var imgX;
var imgY;
var diffX;
var diffY;
var angle_rad;
var angle_deg;
var img = document.getElementById("player")
var bulletList = [];
var bulletid = 1
var xpos
var ypos
var bulletang
var zombieList = [];
var zombieId = 1;




var keysPressed = {};
class bullet {
    constructor(x, y, angl, spd, id) {
        this.xpos = x + 45
        this.ypos = y + 45
        this.ang = angl
        this.speed = spd
        this.id = id
        this.intervalid = 0
    }
    createbullet() {
        var mydiv = document.createElement("div")
        mydiv.style.backgroundColor = 'transparent';

        mydiv.style.position = 'absolute'
        mydiv.style.display = 'none';
        mydiv.style.boxSizing = 'border-box';
        mydiv.id = this.id + "div"
        var bulle = document.createElement("img");
        bulle.id = this.id + "img"
        bulle.src = "bul.png";
        bulle.style.transform = 'rotate(' + this.ang * 180 / Math.PI + 'deg)'
        mydiv.appendChild(bulle);
        mydiv.style.left = this.xpos
        mydiv.style.top = this.ypos
        document.getElementById("bod").appendChild(mydiv);
        var t = this;
        this.intervalid = setInterval(function () { t.move(); }, 30);



    }
    move() {
        var hitt = false

        var zmbs = document.getElementsByClassName("test")
        for (let index = 0; index < zmbs.length; index++) {

            if (zmbs[index].offsetLeft <= this.xpos && zmbs[index].offsetLeft + 59 >= this.xpos) {
                console.log("xxxxxxxxxxxxxx");
                if (zmbs[index].offsetTop <= this.ypos && zmbs[index].offsetTop + 79 >= this.ypos) {
                    console.log("yyyyyyyyyyyyyyy");

                    zmbs[index].remove();
                    hitt = true
                }

            }

        }
        if (this.xpos > 2100 || this.ypos > 1180 || this.xpos < 200 || this.ypos < 150 || hitt) {
            clearInterval(this.intervalid)
            var ele = document.getElementById(this.id + "div")
            ele.remove()
            // bulletList.pop() remove by this id
        }
        else {
            this.xpos += this.speed * Math.sin(this.ang);
            console.log(Math.sin(angle_rad));
            this.ypos -= this.speed * Math.cos(this.ang);
            var ele = document.getElementById(this.id + "div")

            ele.style.left = '' + this.xpos + 'px';
            ele.style.top = '' + this.ypos + 'px';
            ele.style.display = 'inline';

        }
    }

}
class Player {
    constructor(name, level, type) {

        this.name = name
        this.level = level
        this.type = type

    }

    draw() {



    }
    hit() {

    }
    move() {

        document.getElementById("playerdiv").style.display = 'inline';
        document.getElementById("playerdiv").style.boxSizing = 'border-box';
        document.getElementById("playerdiv").style.left = '' + x + 'px';
        document.getElementById("playerdiv").style.top = '' + y + 'px';
    }
}
var p1 = new Player("islam", 1, 2);
document.addEventListener('click', (event) => {


    var bu = new bullet(x + 200, y + 150, angle_rad, 15, bulletid)
    bu.createbullet()
    bulletList.push(bu)
    bulletid += 1


})
document.addEventListener('mousemove', (event) => {
    var div = document.getElementById("playerdiv")
    imgX = div.offsetLeft + img.width / 2
    imgY = div.offsetTop + img.height / 2
    mouseX = event.clientX;
    mouseY = event.clientY;
    diffX = mouseX - imgX;
    diffY = mouseY - imgY;
    angle_rad = Math.atan2(diffY, diffX) + 90 * Math.PI / 180;
    angle_deg = angle_rad * 180 / Math.PI;
    update();
})
function update() {
    document.getElementById("player").style.transform = 'rotate(' + angle_deg + 'deg)'

}

class Zombie {
    constructor(x_Z, y_Z, id) {
        this.xZombie = x_Z;
        this.yZombie = y_Z;
        this.id = id;
        this.angle_deg_zombie=0;
    }

    createZombie() {
        var imgZombie = document.createElement("img");
        imgZombie.src = "zombie.png";
        imgZombie.style.position = 'absolute';
        imgZombie.style.display = 'none';
        imgZombie.id = this.id + "Z";
        imgZombie.style.left = this.xZombie;
        imgZombie.style.top = this.yZombie;
        document.getElementById("bod").appendChild(imgZombie);
        imgZombie.style.display = 'inline';
        imgZombie.style.width=img.width+50;
        imgZombie.style.height=img.height+50;
    }
    moveZombie(){
imgX = document.getElementById("player").parentElement.offsetLeft + document.getElementById("player").width/2;
imgY = document.getElementById("player").parentElement.offsetTop + document.getElementById("player").height/2;
var imgZombieX = document.getElementById(this.id+"Z").offsetLeft + document.getElementById(this.id+"Z").width/2;
var imgZombieY = document.getElementById(this.id+"Z").offsetTop + document.getElementById(this.id+"Z").height/2
var xdiffZombie = imgZombieX - imgX;
var ydiffZombie = imgZombieY - imgY;
var angle_rad_zombie = Math.atan2(ydiffZombie,xdiffZombie)-Math.PI/2;
this.angle_deg_zombie = angle_rad_zombie * 180/Math.PI;

if ((xdiffZombie > 50 || xdiffZombie < -50 ) || (ydiffZombie > 50 || ydiffZombie < -50 )){
this.xZombie += Math.sin(angle_rad_zombie);
this.yZombie -= Math.cos(angle_rad_zombie);
document.getElementById(this.id+"Z").style.left=''+this.xZombie+'px';
document.getElementById(this.id+"Z").style.top=''+this.yZombie+'px';
}
this.rotateZombie();
    }
    rotateZombie(){
        document.getElementById(this.id+"Z").style.transform='rotate(' + this.angle_deg_zombie + 'deg)'
    }
}

///zombie creation here
    var z1 = new Zombie(1000, -300, zombieId)
    z1.createZombie();
    zombieList.push(z1);
    
    var z2 = new Zombie(-500,-300,zombieId+1)
    z2.createZombie();
    zombieList.push(z2);
    console.log(zombieList);
 
    function animate(){
        requestAnimationFrame(animate);
        zombieList.forEach(zombie =>{
            zombie.moveZombie();
        })
    }
animate();
// zombie creation end

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});
document.addEventListener('keydown', function (event) {
    keysPressed[event.key] = true;

    if (((event.keyCode == 87 && keysPressed["d"] == true) || (event.keyCode == 68 && keysPressed["w"] == true)) && (y >= 10 && x <= 1800)) {
        x += 10;
        y -= 10;

    }
    // down right
    else if (((event.keyCode == 83 && keysPressed["d"] == true) || (event.keyCode == 68 && keysPressed["s"] == true)) && (y <= 950 && x <= 1800)) {
        x += 10;
        y += 10;

    }
    // up left
    else if (((event.keyCode == 87 && keysPressed["a"] == true) || (event.keyCode == 65 && keysPressed["w"] == true)) && (y >= 10 && x >= 10)) {
        x -= 10;
        y -= 10;

    }
    //down left
    else if (((event.keyCode == 83 && keysPressed["a"] == true) || (event.keyCode == 65 && keysPressed["s"] == true)) && (y <= 950 && x >= 10)) {
        x -= 10;
        y += 10;

    }

    //left
    else if (event.keyCode == 65 && x >= 10) {
        x -= 10;
    }
    //top
    else if (event.keyCode == 87 && y >= 10) {
        y -= 10;

    }
    //right
    else if (event.keyCode == 68 && x <= 1800) {
        x += 10;
    }
    //bottom
    else if (event.keyCode == 83 && y <= 950) {
        y += 10;

    }
});



setInterval(p1.move, 1)
var mydiv = document.createElement("div");
mydiv.style.position = 'absolute'
mydiv.style.boxSizing = 'border-box';
mydiv.style.left = '500px'
mydiv.style.top = '500px'
mydiv.className = "test"
var bulle = document.createElement("img");
bulle.src = "1.png";
mydiv.appendChild(bulle);
document.getElementById("bod").appendChild(mydiv);