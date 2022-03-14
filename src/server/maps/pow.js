const { Obstacle } = require("../obstacles.js");
const { Enemy } = require("../enemy.js");

let map = {
    players: [],
    default: {
        enemies: [],
        obstacles: [],
        bgColor: '#0077A7',
        tileColor: '#0F99BB',
        width: 1500,
        height: 750,
        spawn: {x: 25, y: 25},
        name: 'Planet of Water',
        platformer: true,
    },
    areas: [
        // ideas: z1 is water intro, z2 is ice intro and water expolration, z3 is bouncies, water, and ice
        {
            enemies: [],
            obstacles: [
                new Obstacle({x:50,y:700,w:300,h:50,type:'normal'}),
                new Obstacle({x:100,y:650,w:200,h:50,type:'normal'}),
                new Obstacle({x:400,y:600,w:250,h:50,type:'normal'}),
                new Obstacle({x:850,y:350,w:50,h:200,type:'normal'}),
                new Obstacle({x:1050,y:200,w:100,h:50,type:'normal'}),
                new Obstacle({x:1400,y:150,w:100,h:50,type:'normal'}),
                new Obstacle({x:1450,y:100,w:50,h:50,area:1,type:'area'}),
            ],
        },
        {
            enemies: [],
            spawn:{x:0,y:650},
            obstacles: [
                new Obstacle({x:0,y:650,w:50,h:50,type:'normal'}),
                new Obstacle({x:200,y:600,w:50,h:50,type:'normal'}),
                new Obstacle({x:250,y:450,w:50,h:50,type:'normal'}),
                new Obstacle({x:600,y:500,w:50,h:50,type:'normal'}),
                new Obstacle({x:1350,y:650,w:150,h:50,type:'normal'}),
                new Obstacle({x:1400,y:600,w:50,h:50,area:2,type:'area'}),
                new Obstacle({x:0,y:700,w:1500,h:50,type:'lava'}),
                new Obstacle({x:900,y:650,w:200,h:50,type:'safe'}),
            ],
        },
        {
            width: 500,
            height: 750,
            enemies: [],
            obstacles: [
                new Obstacle({x:225,y:0,w:50,h:700,type:'normal'}),
                new Obstacle({x:275,y:0,w:50,h:50,area:3,type:'area'}),
            ],
        },
        {
            enemies: [],
            width: 1100,
            obstacles: [
                new Obstacle({x:0,y:550,w:50,h:50,type:'normal'}),
                new Obstacle({x:200,y:500,w:50,h:50,rotateSpeed:-0.02,startAngle:135,type:['rotate']}),
                new Obstacle({x:500,y:400,w:150,h:50,rotateSpeed:0.02,startAngle:135,type:['rotate']}),
                new Obstacle({x:650,y:50,w:50,h:150,type:'normal'}),
                new Obstacle({x:1050,y:400,w:50,h:50,area:4,type:'area'}),
            ],
        },
        {
            width: 1050,
            height: 600,
            spawn: {x: 25, y: 25},
            enemies: [
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:300,height:600},speed:7,radius:18,type:'normal'}),
                
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),
                new Enemy({arena: {x:400,y:0,width:300,height:600},speed:12,radius:10,type:'rain'}),

                new Enemy({arena: {x:750,y:100,width:250,height:250},speed:0,radius:124,type:'normal'}),
                new Enemy({arena: {x:750,y:300-25/2,width:250,height:250},speed:0,radius:124,type:'normal'}),
                new Enemy({arena: {x:750,y:475,width:250,height:250},speed:0,radius:124,type:'normal'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:50,w:50,h:550,type:'normal'}),
                new Obstacle({x:0,y:0,w:50,h:50,type:'safe'}),
                new Obstacle({x:350,y:50,w:50,h:550,type:'normal'}),
                new Obstacle({x:350,y:0,w:50,h:50,type:'safe'}),
                new Obstacle({x:700,y:50,w:50,h:550,type:'normal'}),
                new Obstacle({x:700,y:0,w:50,h:50,type:'safe'}),
                new Obstacle({x:1000,y:0,w:50,h:600,area:5,type:'area'}),
            ],
        },
        {
            width: 500,
            height: 3000,
            spawn: {x: 250, y: 2975},
            enemies: [],
            obstacles: [
                new Obstacle({x:0,y:2500,w:150,h:500,type:'lava'}),
                new Obstacle({x:150,y:2500,w:25,h:150,type:'safe'}),
                new Obstacle({x:350,y:2500,w:150,h:500,type:'lava'}),
                new Obstacle({x:450,y:2450,w:50,h:50,effect:50,type:['bounce','normal']}),
                new Obstacle({x:400,y:2375,w:50,h:125,type:'lava'}),
                new Obstacle({x:350,y:2000,w:100,h:50,type:'normal'}),
                new Obstacle({x:325,y:2700,w:25,h:150,type:'safe'}),
                new Obstacle({x:350,y:2475,w:50,h:25,type:'safe'}),

                new Obstacle({x:0,y:1000,w:25,h:1500,type:'lava'}),
                new Obstacle({x:25,y:1950,w:25,h:225,type:'safe'}),
                new Obstacle({x:25,y:1650,w:25,h:225,type:'safe'}),
                new Obstacle({x:25,y:1350,w:25,h:225,type:'safe'}),
                new Obstacle({x:25,y:1050,w:25,h:225,type:'safe'}),
                new Obstacle({x:0,y:975,w:25,h:25,type:'safe'}),

                new Obstacle({x:100,y:800,w:400,h:50,type:'lava'}),
                new Obstacle({x:50,y:800,w:50,h:50,type:'safe'}),
                new Obstacle({w:50,h:25,startPoint:0,points:[[100,775],[400,775]],speed:0.25,type:'move'}),
                new Obstacle({w:50,h:25,startPoint:1,points:[[100,775],[400,775]],speed:0.25,type:'move'}),
                new Obstacle({x:450,y:750,w:50,h:50,type:'normal'}),
                new Obstacle({x:400,y:600,w:50,h:50,rotateSpeed:-0.1,startAngle:90,type:['rotate']}),
                new Obstacle({x:400,y:550,w:50,h:50,rotateSpeed:-0.1,startAngle:90,type:['rotate']}),
                new Obstacle({x:400,y:500,w:50,h:50,rotateSpeed:-0.1,startAngle:90,type:['rotate']}),

                new Obstacle({x:0,y:450,w:300,h:50,type:'lava'}),
                new Obstacle({x:0,y:400,w:300,h:50,type:'safe'}),

                new Obstacle({x:350,y:0,w:50,h:250,type:'lava'}),
                new Obstacle({x:400,y:0,w:100,h:250,type:'world',world:'hub'}),

                new Obstacle({x:150,y:200,w:50,h:50,type:'normal'}),
            ],
        },
    ]
}
module.exports = map;