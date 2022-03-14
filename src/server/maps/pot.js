const { Obstacle } = require("../obstacles.js");
const { Enemy } = require("../enemy.js");

let map = {
    players: [],
    default: {
        enemies: [],
        obstacles: [],
        bgColor: '#216323',
        tileColor: '#5cb84b',
        width: 2000,
        height: 300,
        spawn: {x: 25, y: 150},
        name: 'Planet of Tutorials',
    },
    areas: [
        {
            enemies: [],
            obstacles: [
                //new Obstacle({x:250,y:100,w:75,h:50,rotateSpeed:0.05,startAngle:0,type:'rotate'}),
                //new Obstacle({x:50,y:100,w:100,h:50,type:'safe'}),
                new Obstacle({x:100,y:50,w:50,h:250,type:'normal'}),
                new Obstacle({x:250,y:0,w:50,h:250,type:'normal'}),
                new Obstacle({x:400,y:50,w:50,h:250,type:'normal'}),
                new Obstacle({x:600,y:0,w:50,h:100,type:'normal'}),
                new Obstacle({x:600,y:200,w:50,h:100,type:'normal'}),
                new Obstacle({x:875,y:-50,w:50,h:400,rotateSpeed:0.05,startAngle:90,type:'rotate'}),
                new Obstacle({x:1250,y:100,w:50,h:100,effect:23,type:['bounce','normal']}),
                new Obstacle({x:1250,y:275,w:50,h:25,effect:23,type:['bounce','normal']}),
                new Obstacle({x:1250,y:0,w:50,h:25,effect:23,type:['bounce','normal']}),
                new Obstacle({w:50,h:100,startPoint:0,points:[[1450,0],[1600,0]],speed:0.1,type:'move'}),
                new Obstacle({w:50,h:100,startPoint:1,points:[[1450,100],[1600,100]],speed:0.1,type:'move'}),
                new Obstacle({w:50,h:100,startPoint:0,points:[[1450,200],[1600,200]],speed:0.1,type:'move'}),
                new Obstacle({x:1800,y:0,w:1000,h:300,area:1,type:'area'}),
                //new Obstacle({x:300,y:0,w:50,h:50,effect:10,type:'normal'}),
                //new Obstacle({w:50,h:50,startPoint:0,points:[[0,0],[300,0],[300,150]],speed:0.1,type:'move'}),
            ],
        },
        {
            enemies: [],
            obstacles: [
                new Obstacle({x:-50,y:125,w:400,h:50,rotateSpeed:0.08,startAngle:0,type:'rotate'}),
                new Obstacle({x:250,y:250,w:50,h:50,area:2,type:'area'}),
            ],
            width: 300,
            height: 300,
            spawn: {x: 25, y: 25},
        },
        {
            enemies: [],
            obstacles: [
                new Obstacle({x:200,y:150,radius:50,type:'circle'}),
                new Obstacle({x:325,y:50,radius:50,type:'circle'}),
                new Obstacle({x:325,y:250,radius:50,type:'circle'}),
                new Obstacle({x:450,y:150,radius:50,type:'circle'}),
                new Obstacle({x:800,y:150,radius:100,type:'circle'}),
                new Obstacle({x:800-400/2,y:150-35/2,w:400,h:35,rotateSpeed:0.04,startAngle:0,type:'rotate'}),
                new Obstacle({x:800-400/2,y:150-35/2,w:400,h:35,rotateSpeed:-0.04,startAngle:0,type:'rotate'}),
                new Obstacle({w:50,h:50,radius:50,startPoint:0,points:[[1200,50],[1400,50],[1400,250],[1200,250]],speed:0.2,type:['circle','move']}),
                new Obstacle({w:50,h:50,radius:50,startPoint:1,points:[[1200,50],[1400,50],[1400,250],[1200,250]],speed:0.2,type:['circle','move']}),
                new Obstacle({w:50,h:50,radius:50,startPoint:2,points:[[1200,50],[1400,50],[1400,250],[1200,250]],speed:0.2,type:['circle','move']}),
                new Obstacle({w:50,h:50,radius:50,startPoint:3,points:[[1200,50],[1400,50],[1400,250],[1200,250]],speed:0.2,type:['circle','move']}),
                new Obstacle({x:1300,y:150,radius:50,type:'circle'}),
                new Obstacle({x:1700,y:150,effect:40,radius:80,type:['circle','bounce']}),
                new Obstacle({x:1950,y:0,w:1000,h:300,area:3,type:'area'}),
            ],
            spawn: {x: 25, y: 150},
        },
        {
            enemies: [],
            obstacles: [
                new Obstacle({x:50,y:0,w:50,h:50,type:'normal'}),
                new Obstacle({x:0,y:150,w:50,h:50,type:'normal'}),
                new Obstacle({x:50,y:300,w:50,h:50,type:'normal'}),
                new Obstacle({x:100,y:0,w:50,h:350,type:'lava'}),
                new Obstacle({x:150,y:300,w:200,h:50,type:'lava'}),
                new Obstacle({x:350,y:0,w:50,h:200,type:'lava'}),
                new Obstacle({w:100,h:50,startPoint:0,points:[[250,50],[250,250]],speed:0.1,type:['lava','move']}),
                new Obstacle({w:100,h:50,startPoint:1,points:[[150,50],[150,250]],speed:0.1,type:['lava','move']}),
                new Obstacle({x:150,y:0,w:200,h:50,world:'hub',type:'world'}),
            ],
            width: 400,
            height: 400,
            spawn: {x: 25, y: 25},
        },
    ]
}
module.exports = map;