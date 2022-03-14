const { Obstacle } = require("../obstacles.js");
const { Enemy } = require("../enemy.js");

let map = {
    players: [],
    default: {
        enemies: [],
        obstacles: [],
        bgColor: '#837259',
        tileColor: '#A7896B',
        width: 400,
        height: 1000,
        spawn: {x: 200, y: 25},
        name: 'Planet of Earth',
    },
    areas: [
        {
            enemies: [
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),
                new Enemy({arena: {x:0,y:50,width:400,height:250},speed:3,radius:12,type:'nokill'}),

                new Enemy({arena: {x:0,y:350,width:400,height:250},speed:4,radius:48,type:'nokill'}),
                new Enemy({arena: {x:0,y:350,width:400,height:250},speed:4,radius:48,type:'nokill'}),
                new Enemy({arena: {x:0,y:350,width:400,height:250},speed:4,radius:48,type:'nokill'}),
                new Enemy({arena: {x:0,y:350,width:400,height:250},speed:4,radius:48,type:'nokill'}),
                new Enemy({arena: {x:0,y:350,width:400,height:250},speed:4,radius:48,type:'nokill'}),

                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:10,radius:8,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
                new Enemy({arena: {x:0,y:650,width:400,height:300},speed:8,radius:22,type:'nokill'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:0,w:400,h:50,type:'safe'}),
                new Obstacle({x:0,y:300,w:150,h:50,type:'normal'}),
                new Obstacle({x:250,y:300,w:150,h:50,type:'normal'}),
                new Obstacle({x:50,y:600,w:300,h:50,type:'normal'}),
                new Obstacle({x:0,y:950,w:400,h:50,area:1,type:'area'}),
            ],
        },
        {
            spawn: {x:25,y:125},
            enemies: [
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),
                new Enemy({arena: {x:50,y:0,width:350,height:250},speed:6,radius:14,type:'normal'}),

                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),
                new Enemy({arena: {x:0,y:400,width:400,height:300},speed:9,radius:8,type:'normal'}),

                new Enemy({arena: {x:0,y:750,width:170,height:170},speed:0,radius:170/2-1,type:'normal'}),
                new Enemy({arena: {x:230,y:750,width:170,height:170},speed:0,radius:170/2-1,type:'normal'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:0,w:50,h:250,type:'safe'}),
                new Obstacle({x:0,y:250,w:350,h:50,type:'normal'}),
                new Obstacle({x:50,y:350,w:350,h:50,type:'normal'}),
                new Obstacle({x:0,y:700,w:400,h:50,type:'safe'}),
                new Obstacle({x:0,y:950,w:400,h:50,area:2,type:'area'}),
            ],
        },
        {// homings
            spawn: {x:25,y:25},
            width: 1000,
            height: 1000,
            enemies: [
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:1000,height:1000},speed:10,radius:18,type:'home'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:0,w:50,h:50,type:'safe'}),
                new Obstacle({x:950,y:950,w:50,h:50,area:3,type:'area'}),
            ],
        },
        {
            width: 2000,
            height: 300,
            spawn: {x: 25, y: 150},
            enemies: [
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
                new Enemy({arena: {x:50,y:0,width:1850,height:300},speed:6,radius:22,type:'superhome'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:0,w:50,h:300,type:'safe'}),
                new Obstacle({x:1900,y:0,w:100,h:300,area:4,type:'area'}),
            ],
        },
        {
            width: 500,
            height: 1000,
            spawn: {x: 25, y: 25},
            enemies: [
                new Enemy({arena: {x:0,y:50,width:225,height:600},speed:6,baseRadius:3,aura:100,growRadius:12,type:'growaura'}),
                new Enemy({arena: {x:0,y:50,width:225,height:600},speed:6,baseRadius:3,aura:100,growRadius:12,type:'growaura'}),
                new Enemy({arena: {x:0,y:50,width:225,height:600},speed:6,baseRadius:3,aura:100,growRadius:12,type:'growaura'}),

                new Enemy({arena: {x:0,y:700,width:225,height:200},speed:8,baseRadius:5,aura:30,growRadius:10,type:'growaura'}),
                new Enemy({arena: {x:0,y:700,width:225,height:200},speed:8,baseRadius:5,aura:30,growRadius:10,type:'growaura'}),
                new Enemy({arena: {x:0,y:700,width:225,height:200},speed:8,baseRadius:5,aura:30,growRadius:10,type:'growaura'}),
                new Enemy({arena: {x:0,y:700,width:225,height:200},speed:8,baseRadius:5,aura:30,growRadius:10,type:'growaura'}),
                new Enemy({arena: {x:0,y:700,width:225,height:200},speed:8,baseRadius:5,aura:30,growRadius:10,type:'growaura'}),

                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:10,baseRadius:3,aura:60,growRadius:15,type:'growaura'}),
                /*new Enemy({arena: {x:300,y:50,width:175,height:950},speed:3,radius:38,type:'superhome'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:3,radius:38,type:'superhome'}),
                new Enemy({arena: {x:300,y:50,width:175,height:950},speed:3,radius:38,type:'superhome'}),*/
            ],
            obstacles: [
                new Obstacle({x:275,y:50,w:25,h:900,type:'lava'}),
                new Obstacle({x:475,y:50,w:25,h:950,type:'lava'}),
                new Obstacle({x:225,y:0,w:50,h:950,type:'normal'}),
                new Obstacle({x:0,y:650,w:175,h:50,type:'normal'}),
                new Obstacle({x:50,y:900,w:175,h:50,type:'normal'}),
                new Obstacle({x:0,y:0,w:225,h:50,type:'safe'}),
                new Obstacle({x:0,y:950,w:500,h:50,type:'safe'}),
                new Obstacle({x:275,y:0,w:225,h:50,area:5,type:'area'}),
            ],
        },
        {
            spawn: {x:25,y:25},
            width: 4000,
            height: 2000,
            enemies: [
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:30,baseRadius:10,aura:160,growRadius:50,type:'growaura'}),

                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:15,radius:38,type:'home'}),

                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:8,radius:68,type:'superhome'}),

                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
                new Enemy({arena: {x:0,y:0,width:4000,height:2000},speed:25,radius:18,type:'normal'}),
            ],
            obstacles: [
                new Obstacle({x:0,y:0,w:50,h:50,type:'safe'}),
                new Obstacle({x:3950,y:1950,w:50,h:50,world:'hub',type:'world'}),
            ],
        },
    ]
}
module.exports = map;