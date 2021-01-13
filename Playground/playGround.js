var x = 0;
var y = 0;
var x_Z = 0;
var y_Z = 0;
var i=0;
img_arr=["1.png","1_alt-1.png"];
var zombieImgX = 0;
var zombieImgY = 0;
var xdiffZombie = 0;
var ydiffZombie = 0;
var angle_rad_zombie = 0;
var angle_deg_zombie = 0;
var mouseX;
var mouseY;
var imgX;
var imgY;
var diffX;
var diffY;
var angle_rad;
var angle_deg;
var img = document.getElementsByTagName("img")[0]
var keysPressed = {};
img.style.position = "relative";
img.style.boxSizing="border-box"
var zombieImg = document.getElementsByTagName("img")[1];
zombieImg.style.position = "relative";
zombieImg.style.boxSizing="border-box"
zombieImg.height = img.height;
zombieImg.width = img.width;
console.log(zombieImg);
class Player {
    constructor(name, level, type) {

        this.name = name
        this.level = level
        this.type = type

    }


    hit() {

    }
    move() {
        document.getElementsByTagName("img")[0].style.left = '' + x + 'px';
        document.getElementsByTagName("img")[0].style.top = '' + y + 'px';

    }
}
var p1 = new Player("islam", 1, 2);

class Zombie {
    constructor(name, level, type) {

        this.name = name
        this.level = level
        this.type = type

    }


    hit() {

    }
    move() {
        document.getElementsByTagName("img")[1].style.left = '' + x_Z + 'px';
        document.getElementsByTagName("img")[1].style.top = '' + y_Z + 'px';
    }
}

var z1 = new Zombie("No Brain", 1, 2);

document.addEventListener('mousemove', (event) => {
    
    imgX = img.offsetLeft + img.width / 2
    imgY = img.offsetTop + img.height / 2
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    diffX = mouseX - imgX;
    diffY = mouseY - imgY;
    angle_rad = Math.atan2(diffY, diffX);
    angle_deg = angle_rad * 180 / Math.PI +90;
    rotatePlayer();
})



function rotatePlayer() {
    document.getElementsByTagName("img")[0].style.transform = 'rotate(' + angle_deg + 'deg)'

}

function zombieRotate() {
    document.getElementsByTagName("img")[1].style.transform = 'rotate(' + angle_deg_zombie + 'deg)'
}

function updateZombie(){
 if (zombieImgX > imgX && zombieImgY > imgY){
     x_Z-=2;
     y_Z-=2;
 }
 else if (zombieImgX < imgX && zombieImgY < imgY){
     x_Z+=2;
     y_Z+=2;
 }
 else if (zombieImgX > imgX && zombieImgY < imgY){
    x_Z-=2;
    y_Z+=2;
 }
 else if (zombieImgX < imgX && zombieImgY > imgY){
     x_Z+=2;
     y_Z-=2;
 }
 else if (zombieImgX < imgX){
x_Z +=2;
 }
 else if (zombieImgX > imgX){
     x_Z -=2;
 }
 else if (zombieImgY > imgY){
     y_Z -=2;
 }
 else if (zombieImgY < imgY){
    y_Z+=2;
 }
}

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
});
document.addEventListener('keydown', function (event) {
    keysPressed[event.key] = true;
    console.log(keysPressed[event.key]);
    // up right 
    if (((event.keyCode == 38 && keysPressed["ArrowRight"] == true) || (event.keyCode == 39 && keysPressed["ArrowUp"] == true)) && (y >= 10 && x <= 1800)) {
        x += 10;
        y -= 10;
    }
    // down right
    else if (((event.keyCode == 40 && keysPressed["ArrowRight"] == true) || (event.keyCode == 39 && keysPressed["ArrowDown"] == true)) && (y <= 950 && x <= 1800)) {
        x += 10;
        y += 10;


    }
    // up left
    else if (((event.keyCode == 38 && keysPressed["ArrowLeft"] == true) || (event.keyCode == 37 && keysPressed["ArrowUp"] == true)) && (y >= 10 && x >= 10)) {
        x -= 10;
        y -= 10;

    }
    //down left
    else if (((event.keyCode == 40 && keysPressed["ArrowLeft"] == true) || (event.keyCode == 37 && keysPressed["ArrowDown"] == true)) && (y <= 950 && x >= 10)) {
        x -= 10;
        y += 10;

    }
    //left
    else if (event.keyCode == 37 && x >= 10) {
        x -= 10;
    }
    //top
    else if (event.keyCode == 38 && y >= 10) {
        y -= 10;
    }
    //right
    else if (event.keyCode == 39 && x <= 1920) {
        x += 10;

    }
    //bottom
    else if (event.keyCode == 40 && y <= 1080) {
        y += 10;
    }
    
    imgX = img.offsetLeft + img.width / 2
    imgY = img.offsetTop + img.height / 2
    zombieImgX = zombieImg.offsetLeft + zombieImg.width / 2;
    zombieImgY = zombieImg.offsetTop + zombieImg.height / 2;
    xdiffZombie = zombieImgX -imgX ;
    ydiffZombie = zombieImgY-imgY;
    angle_rad_zombie = Math.atan2(ydiffZombie, xdiffZombie);
    angle_deg_zombie = angle_rad_zombie * 180 / Math.PI - 90;
    zombieRotate();
    p1.move();
    if (i < 2){
        img.src=img_arr[i];
        i++
    }
    else { i=0;}
    event.preventDefault();

});

setInterval(zombieFollow,20)
function zombieFollow (){
    updateZombie()
z1.move();
imgX = img.offsetLeft + img.width / 2
imgY = img.offsetTop + img.height / 2
zombieImgX = zombieImg.offsetLeft + zombieImg.width / 2;
zombieImgY = zombieImg.offsetTop + zombieImg.height / 2;

}
  
   

