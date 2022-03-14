const { Enemy } = require("../enemy.js");
const { Obstacle } = require("../obstacles.js");

let map = {
    players: [],
    default: {
        enemies: [],
        obstacles: [],
        bgColor: '#1f2229',
        tileColor: '#323645',
        width: 1000,
        height: 1000,
        spawn: {x: 500, y: 500},
    },
    areas: [
        {
            enemies: [],
            obstacles: [
                /*new Obstacle({x:250,y:100,w:75,h:50,rotateSpeed:0.05,startAngle:0,type:'rotate'}),
                new Obstacle({x:50,y:100,w:100,h:50,type:'safe'}),
                new Obstacle({x:50,y:150,w:350,h:50,type:'normal'}),
                new Obstacle({x:300,y:0,w:50,h:50,effect:10,type:'normal'}),
                new Obstacle({w:50,h:50,startPoint:0,points:[[0,0],[300,0],[300,150]],speed:0.1,type:'move'}),*/
                new Obstacle({x:250-25,y:0,w:50,h:500,rotateSpeed:0,startAngle:135,type:['rotate']}),
                new Obstacle({x:750-25,y:0,w:50,h:500,rotateSpeed:0,startAngle:45,type:['rotate']}),
                new Obstacle({x:250-25,y:500,w:50,h:500,rotateSpeed:0,startAngle:45,type:['rotate']}),
                new Obstacle({x:750-25,y:500,w:50,h:500,rotateSpeed:0,startAngle:135,type:['rotate']}),
                new Obstacle({x:0,y:0,w:50,h:50,world:'pot',type:'world',strokeColor:'green'}),
                //new Obstacle({x:500,y:300,w:50,h:50,radius:50,type:'circle'}),
                new Obstacle({x:950,y:0,w:50,h:50,world:'pol',type:'world',strokeColor:'red'}),
                new Obstacle({x:0,y:950,w:50,h:50,world:'poe',type:'world',strokeColor:'#995900'}),
                new Obstacle({x:950,y:950,w:50,h:50,world:'pow',type:'world',strokeColor:'blue'}),
                //new Obstacle({x:500,y:300,w:50,h:50,shootAngles:[0],projectileSpeed:0.005,projectileRadius:10,lifespan:3000,shootTimer:0.3,startIndex:0,type:'turret'}),
            ],
            bgColor: '#1f2229',
            tileColor: '#323645',
        },
    ]
}
/*for(let i in areas){
    
}*/
module.exports = map;