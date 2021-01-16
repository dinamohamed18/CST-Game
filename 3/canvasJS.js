var intervalidforzombies
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
var bulletang
var zombieList = [];
var zombieId = 1;
var nfwave = 5
var i = 0
var iofzombies = 0
var img_arr = ["1.png", "1.png", "12.png", "12.png"];
var keysPressed = {};
/////////////////////////////////////////////////////////
function sound(src) {
    var sou
    this.sou = document.createElement("audio");
    this.sou.src = src;
    this.sou.setAttribute("preload", "auto");
    this.sou.setAttribute("controls", "none");
    this.sou.style.display = "none";
    document.body.appendChild(this.sou);
    this.sou.play();

}
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

        var zmbs = document.getElementsByClassName("zombie")
        for (let index = 0; index < zmbs.length; index++) {

            if (zmbs[index].offsetLeft <= this.xpos && zmbs[index].offsetLeft + 59 >= this.xpos) {
                if (zmbs[index].offsetTop <= this.ypos && zmbs[index].offsetTop + 79 >= this.ypos) {


                    for (let i = 0; i < zombieList.length; i++) {
                        if (zombieList[i].id + "Z" == zmbs[index].id) {
                            zombieList.splice(i, 1)
                        }

                    }
                    if (zombieList.length == 0) {
                        // show new wave screen
                        nfwave += 5
                        setTimeout(function () { createwave(nfwave); }, 5000)

                    }
                    zmbs[index].remove();
                    sound("dead.mp3");
                    hitt = true
                }

            }

        }
        if (this.xpos > 2100 || this.ypos > 1180 || this.xpos < 200 || this.ypos < 150 || hitt) {
            clearInterval(this.intervalid)
            var ele = document.getElementById(this.id + "div")
            ele.remove()
        }
        else {
            this.xpos += this.speed * Math.sin(this.ang);
            this.ypos -= this.speed * Math.cos(this.ang);
            var ele = document.getElementById(this.id + "div")

            ele.style.left = '' + this.xpos + 'px';
            ele.style.top = '' + this.ypos + 'px';
            ele.style.display = 'inline';

        }
    }

}
class Player {
    constructor(name, level, type, xi, yi, h) {

        this.name = name
        this.level = level
        this.type = type
        this.x = xi
        this.y = yi
        this.health = h
    }

    draw() {



    }
    takedamage() {

        this.health=this.health-0.5
        if(this.health<=0){
            this.die()
            
        }
        else{ 
             img_arr = ["21.png", "21.png", "22.png", "22.png"];
             img.src="21.png"
             setTimeout(() => {
                img_arr = ["1.png", "1.png", "12.png", "12.png"];
                img.src="1.png"
             }, 500);

        }
    }
    die() { 

        clearInterval(intervalidforzombies)

        document.removeEventListener("keydown")

        // remove eventlistner of click and keydown 


    }
    hit() {
        var bu = new bullet(this.x + 200, this.y + 150, angle_rad, 15, bulletid)
        bu.createbullet()
        bulletList.push(bu)
        bulletid += 1
        sound("hit.mp3");

    }
    move() {

        document.getElementById("playerdiv").style.display = 'inline';
        document.getElementById("playerdiv").style.boxSizing = 'border-box';
        document.getElementById("playerdiv").style.left = this.x + "px";
        document.getElementById("playerdiv").style.top = this.y + "px";
    }
}
class Zombie {
    constructor(x_Z, y_Z, id) {
        this.xZombie = x_Z;
        this.yZombie = y_Z;
        this.id = id;
        this.angle_deg_zombie = 0;
    }

    createZombie() {
        var imgZombie = document.createElement("img");
        imgZombie.src = "74.png";
        imgZombie.style.position = 'absolute';
        imgZombie.style.display = 'none';
        imgZombie.id = this.id + "Z";
        imgZombie.style.left = this.xZombie;
        imgZombie.style.top = this.yZombie;
        imgZombie.style.display = 'inline';
        imgZombie.style.width = img.width + 50;
        imgZombie.style.height = img.height + 50;
        imgZombie.className = "zombie"
        document.getElementById("bod").appendChild(imgZombie);
    }
    moveZombie() {
        imgX = document.getElementById("player").parentElement.offsetLeft + document.getElementById("player").width / 2;
        imgY = document.getElementById("player").parentElement.offsetTop + document.getElementById("player").height / 2;
        var imgZombieX = document.getElementById(this.id + "Z").offsetLeft + document.getElementById(this.id + "Z").width / 2;
        var imgZombieY = document.getElementById(this.id + "Z").offsetTop + document.getElementById(this.id + "Z").height / 2
        var xdiffZombie = imgZombieX - imgX;
        var ydiffZombie = imgZombieY - imgY;
        var angle_rad_zombie = Math.atan2(ydiffZombie, xdiffZombie) - Math.PI / 2;
        this.angle_deg_zombie = angle_rad_zombie * 180 / Math.PI;

        if ((xdiffZombie > 50 || xdiffZombie < -50) || (ydiffZombie > 50 || ydiffZombie < -50)) {
            this.xZombie += Math.sin(angle_rad_zombie);
            this.yZombie -= Math.cos(angle_rad_zombie);
            document.getElementById(this.id + "Z").style.left = '' + this.xZombie + 'px';
            document.getElementById(this.id + "Z").style.top = '' + this.yZombie + 'px';
            var img_arrofzombies = ["44.png", "44.png","44.png", "74.png", "74.png", "74.png"];


            document.getElementById(this.id + "Z").src = img_arrofzombies[iofzombies];
            iofzombies++
            if (iofzombies == 6) {
                iofzombies = 0
            }



        }
        else {
             
            p1.takedamage()
            
        }
        this.rotateZombie();
    }
    rotateZombie() {
        document.getElementById(this.id + "Z").style.transform = 'rotate(' + this.angle_deg_zombie + 'deg)'
    }
}

function createwave(n) {
    for (let index = 0; index < n; index++) {
        var xrnd = Math.random() * 1920
        var yrnd = Math.random() * 1080
        var z1 = new Zombie(xrnd, yrnd, zombieId)
        z1.createZombie();
        zombieList.push(z1);
        zombieId++
    }

}



function animate() {
   
    zombieList.forEach(zombie => {
        zombie.moveZombie();
    })
}

document.addEventListener('click', (event) => {
    p1.hit()
})
document.addEventListener('mousemove', (event) => {
    var div = document.getElementById("playerdiv")
    imgX = div.offsetLeft + img.width / 2
    imgY = div.offsetTop + img.height / 2
    mouseX = event.clientX;
    mouseY = event.clientY;
    diffX = mouseX - imgX;
    diffY = mouseY - imgY;
    angle_rad = Math.atan2(diffX, -diffY);
    angle_deg = angle_rad * 180 / Math.PI;

    document.getElementById("player").style.transform = 'rotate(' + angle_deg + 'deg)'

})




document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});
document.addEventListener('keydown', function (event) {
    keysPressed[event.key] = true;

    if (((event.keyCode == 87 && keysPressed["d"] == true) || (event.keyCode == 68 && keysPressed["w"] == true)) && (p1.y >= 10 && p1.x <= 1800)) {
        p1.x += 10;
        p1.y -= 10;

    }
    // down right
    else if (((event.keyCode == 83 && keysPressed["d"] == true) || (event.keyCode == 68 && keysPressed["s"] == true)) && (p1.y <= 950 && p1.x <= 1800)) {
        p1.x += 10;
        p1.y += 10;

    }
    // up left
    else if (((event.keyCode == 87 && keysPressed["a"] == true) || (event.keyCode == 65 && keysPressed["w"] == true)) && (p1.y >= 10 && p1.x >= 10)) {
        p1.x -= 10;
        p1.y -= 10;

    }
    //down left
    else if (((event.keyCode == 83 && keysPressed["a"] == true) || (event.keyCode == 65 && keysPressed["s"] == true)) && (p1.y <= 950 && p1.x >= 10)) {
        p1.x -= 10;
        p1.y += 10;

    }

    //left
    else if (event.keyCode == 65 && p1.x >= 10) {
        p1.x -= 10;
    }
    //top
    else if (event.keyCode == 87 && p1.y >= 10) {
        p1.y -= 10;

    }
    //right
    else if (event.keyCode == 68 && p1.x <= 1800) {
        p1.x += 10;
    }
    //bottom
    else if (event.keyCode == 83 && p1.y <= 950) {
        p1.y += 10;

    }

    img.src = img_arr[i];
    i++

    if (i == 4) {
        i = 0
    }


    event.preventDefault();
});

////////////////////////////////////////////////////////////////////
createwave(nfwave)

intervalidforzombies=setInterval(animate,25)

var p1 = new Player("islam", 1, 2, 0, 0, 100);

setInterval(function () { p1.move(); }, 30);



// function coundown 

