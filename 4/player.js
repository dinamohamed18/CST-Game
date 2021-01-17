class bullet {
    constructor(x, y, angl, spd, id) {
        this.ang = angl

        this.ang_degree = this.ang*180/Math.PI;
        if (this.ang_degree <= 90 && this.ang_degree >= 0) {
            this.xpos = x + 45;
            this.ypos = y + angle_deg / 2;

        }
        else if (this.ang_degree > 90 && this.ang_degree <= 180) {
            this.xpos = x+45-((angle_deg - 90)/2);
            this.ypos = y+45;
        }
        else if (this.ang_degree <0 && this.ang_degree >= -90){
            this.xpos = x + 45 + (angle_deg / 2);
            this.ypos = y ;
        }
        else {
            this.xpos = x;
            this.ypos = y - ((angle_deg + 90)/2);
        }
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
                        var u = 1
                        var int_id =setInterval(function (){takes(u%2); u++;  },700)
                        setTimeout(function () { createwave(nfwave); takes(1) ; clearInterval(int_id) }, 6000)

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