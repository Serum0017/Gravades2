let canvas = { width: 1280, height: 720 };

class Player {
	constructor(id, client) {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 24.5; // currently not circulated in updatepack or initpack
        this.radiusChanged = true;
        this.xChanged = true;
        this.yChanged = true;
        this.id = id;
        this.client = client;
        this.mousePos = { x: 0, y: 0 };
        this.vel = { x: 0, y: 0 };
        this.dead = false;
        this.deadChanged = true;
        this.speed = 0.3;
        this.inputs = {up: false, down: false, right: false, left: false, shift: false};
        this.inputType = "keyboard";
        this.area = 1;
        this.world = 'hub';
        this.area = 0;
        this.spawn = {x:25,y:25};
        this.worldChanged = true;
        this.areaChanged = true;
        this.god = false;
        this.platformer = false;
        this.jump = true;// can jump; only used in platformer
        //this.grav = -1;
    }

    getUpdatePack() {
        let pack = {};
        pack.x = Math.round(this.x);
        pack.y = Math.round(this.y);
        pack.d = this.dead;
        pack.msp = this.mousePos;
        pack.radius = this.radius;
        pack.id = this.id;
        return pack;
    }

    /*getInitPack() {
        // what we need for clients to render
        let pack = {
            x: Math.round(this.x),
            y: Math.round(this.y),
            id: this.id,
            d: this.dead,
            msp: this.mousePos,
            radius: this.radius,
        };
        return pack;
    }*/

    move(delta) {
        if(!this.dead){
            if(this.platformer == false){
                this.vel.x = 0;
                this.vel.y = 0;
                if(this.inputType == "mouse"){
                    let dx = canvas.width / 2 - this.mousePos.x;
                    let dy = canvas.height / 2 - this.mousePos.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    distance /= 300;
                    let angle = Math.atan2(dy, dx);
                    if (distance > this.speed) {
                        distance = this.speed;
                    }
                    this.vel.x = -Math.cos(angle) * distance;
                    this.vel.y = -Math.sin(angle) * distance;
                    this.xChanged = true;
                    this.yChanged = true;
                } else if(this.inputType == "keyboard"){
                    //Keyboard movement
                    if (this.inputs.right) {
                        this.vel.x = this.speed;
                        this.xChanged = true;
                    } else if (this.inputs.left) {
                        this.vel.x = -this.speed;
                        this.xChanged = true;
                    }
                    if (this.inputs.up) {
                        this.vel.y = -this.speed;
                        this.yChanged = true;
                    } else if (this.inputs.down) {
                        this.vel.y = this.speed;
                        this.yChanged = true;
                    }
                }
            } else {
                if(!this.god){
                    // kb only >:)
                    this.vel.x = 0;
                    if (this.inputs.right) {
                        this.vel.x = this.speed;
                        this.xChanged = true;
                    } else if (this.inputs.left) {
                        this.vel.x = -this.speed;
                        this.xChanged = true;
                    }
                    if (this.inputs.up && this.jump) {
                        this.vel.y = -this.speed*3;
                        this.yChanged = true;
                        this.jump = false;
                    }
                    this.vel.y += this.speed/5;
                } else {
                    this.vel.x = 0;
                    this.vel.y = 0;
                    if (this.inputs.right) {
                        this.vel.x = this.speed;
                        this.xChanged = true;
                    } else if (this.inputs.left) {
                        this.vel.x = -this.speed;
                        this.xChanged = true;
                    }
                    if (this.inputs.up) {
                        this.vel.y = -this.speed;
                        this.yChanged = true;
                    } else if (this.inputs.down) {
                        this.vel.y = this.speed;
                        this.yChanged = true;
                    }
                }
            }
            let shifting = 1;
            if(this.inputs.shift){
                shifting = 0.5;
            }
            this.x += this.vel.x * delta * shifting;
            this.y += this.vel.y * delta * shifting;
            /*if(this.y > 0){
                this.y += this.grav * delta;
            } else {
                this.y = 0;
            }*/
        }
    }
}

module.exports = {
	Player
}