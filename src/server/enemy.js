/*class Spawner {
    constructor(options){
        for(let i in options.amount){
            new Enemy(options.params);
        }
    }
}*/

class Enemy {
	constructor(options) {
		Object.assign(this, options);
        this.x = options.arena.x+options.arena.width*Math.random();
        this.y = options.arena.y+options.arena.height*Math.random();
        this.vx = 0;
        this.vy = 0;
        if(this.type == 'rain'){
            this.angle = Math.random() ? Math.PI/2: Math.PI*3/2;
        } else {
            this.angle = Math.random()*Math.PI*2;
        }
        if(this.baseRadius){
            this.radius = this.baseRadius;
        }
    }

    getUpdatePack() {
		/*let pack = { id: this.id };
        pack.x = Math.round(this.x);
        pack.y = Math.round(this.y);*/
		return this;
	}
	/*getInitPack() {
		let pack = {
            id: this.id,
            radius: this.radius,
			x: Math.round(this.x),
			y: Math.round(this.y),
		};
		this.toInit = false;
		return pack;
	}*/
	move(delta, players, enemies) {
        if (this.type == "home" || this.type == "superhome") {
            let min = 200000;
            let index;
            for (var i in players) {
                if (players[i].area == this.area /*&& players[i].world == this.world*/ && players[i].dead == false) {
                    if (distance(this.x, this.y, players[i].x, players[i].y) < min) {
                        if (players[i].x + 24.5 > this.arena.x && players[i].x - 24.5 < this.arena.x + this.arena.width && players[i].y + 24.5 > this.arena.y && players[i].y - 24.5 < this.arena.y + this.arena.height) {
                            min = distance(this.x, this.y, players[i].x, players[i].y);
                            index = i;
                        }
                    }
                }
            }
            this.angle = Math.atan2(this.vy, this.vx);
            if (index != undefined) {
                var dX = (players[index].x) - this.x;
                var dY = (players[index].y) - this.y;
                this.targetAngle = Math.atan2(dY, dX);

                if(this.type == "home"){
                    var dif = this.targetAngle - this.angle;
                    var angleDif = Math.atan2(Math.sin(dif), Math.cos(dif));
                    var angleIncrement = 0.04;
                    if (Math.abs(angleDif) >= angleIncrement) {
                        if (angleDif < 0) {
                            this.angle -= angleIncrement;
                        } else {
                            this.angle += angleIncrement;
                        }
                    }
                } else {
                    this.angle = this.targetAngle;
                }
            }
            this.vx = Math.cos(this.angle);
            this.vy = Math.sin(this.angle);
        } else {
            this.vx = Math.cos(this.angle);
            this.vy = Math.sin(this.angle);
        }

        if(this.type == 'growaura'){
            this.radius = this.baseRadius;
            for (var i in players) {
                if (players[i].area == this.area /*&& players[i].world == this.world*/ && players[i].dead == false) {
                    if (distance(this.x, this.y, players[i].x, players[i].y) < this.aura+24.5) {
                        this.radius = this.growRadius;
                    }
                }
            }
        }

        // Wall Bouncing
        if (this.x - this.radius < this.arena.x) {
            this.vx = Math.abs(this.vx);
            this.x = this.radius+this.arena.x;
        } else if (this.x + this.radius > this.arena.width+this.arena.x) {
            this.vx = -Math.abs(this.vx);
            this.x = this.arena.width+this.arena.x - this.radius;
        }
        if (this.y - this.radius < this.arena.y) {
            this.vy = Math.abs(this.vy);
            this.y = this.radius+this.arena.y;
        } else if (this.y + this.radius > this.arena.height+this.arena.y) {
            this.vy = -Math.abs(this.vy);
            this.y = this.arena.y+this.arena.height - this.radius;
        }

        // Movement
        this.angle = Math.atan2(this.vy, this.vx);
        this.x += this.vx * this.speed * delta/50;
        this.y += this.vy * this.speed * delta/50;
    }
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

module.exports = {
    Enemy,
    //Spawner
}