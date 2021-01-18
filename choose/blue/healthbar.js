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
        this.txt = 'Wave Number  :  1' ;
        this.kills = 0 ;
        this.remainig=5
    }

    show(context) {

        context.lineWidth = 4;
        context.strokeStyle = "#333";
        context.fillRect(this.x, this.y, this.w, this.h);
        context.font = " 150px impact";
        context.fillText(this.txt, 5, 300,100);
        context.font = " 150px impact";
        context.fillText('Kills  :  '+this.kills, 150, 300,60);
        context.font = " 150px impact";
        context.fillText('Remainig Zombies  :  '+ (this.remainig) , 250, 300,150);
        context.fillStyle = this.color;
        
        context.strokeRect(this.x, this.y, this.maxWidth, this.h);
        

    }

    

    updateHealth(val) {
        if(val>= 0) {
        this.health = val;
        this.w =(this.health / this.maxHealth) * this.maxWidth;
        }
    }
    updatetxt(wn)
    {   
            this.remainig =((wn%7)+1) * 5 ;
            this.txt = 'Wave Number :   '+(wn+1) ;
            
    }
    updatekills()
    {
        this.kills+=1
        this.remainig-=1;
    }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
 const width = canvas.width = 420;
 const height = canvas.height = 380;

let health = 100;
const healthBarWidth = 150;
const healthBarHeight = 75;
const healthBar = new HealthBar (1, 30, healthBarWidth, healthBarHeight, health, "darkblue" );

const frame = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    healthBar.show(context);
    requestAnimationFrame(frame);

}

 frame();