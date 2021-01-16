class HealthBar {
	constructor(x, y, w, h, maxHealth, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.maxHealth = maxHealth;
		this.maxWidth = w;
		this.health = maxHealth;
		this.color = color;
    }
    

	show(context) {
		context.lineWidth = 4;
		context.strokeStyle = "#333";
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.w, this.h);
		context.strokeRect(this.x, this.y, this.maxWidth, this.h);

    }
    

	updateHealth(val) {
		if(val>= 0) {
        this.health = val;
		this.w =(this.health / this.maxHealth) * this.maxWidth;
		}
	}

}
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = canvas.width = 420;
const height = canvas.height = 380;


canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

let health = 100;
const healthBarWidth = 200;
const healthBarHeight = 25;
const x = width / 2 - healthBarWidth / 2;
const y = height / 2 - healthBarHeight /2;

const healthBar = new HealthBar (x, y, healthBarWidth, healthBarHeight, health, "green" );

const frame = function() {
	context.clearRect(0, 0, width, height);
	healthBar.show(context);
	requestAnimationFrame(frame);

}
document.addEventListener("click", 
function() {
	health -= 10;
	healthBar.updateHealth(health);
}
)


frame();





