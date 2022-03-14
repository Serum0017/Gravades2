const express = require('express');
const WebSocket = require('ws');
const uuid = require("uuid");
const path = require("path");
const msgpack = require("msgpack-lite");
const app = express();
const wss = new WebSocket.Server({ noServer: true });

app.use(express.static("src/client"));

let players = {};
let enemies = [];

app.get("/", function (req, res) {
	res.sendFile("index.html");
});
let id = 1;
let enemyId = 0;
let obstacleId = 0;

const { Player } = require("./player");
const { Enemy } = require("./enemy");
const { runCollision, runEnemyCollision } = require('./physics.js');
const maps = {
	hub: require("./maps/hub.js"),
	pot: require("./maps/pot.js"),
	pol: require("./maps/pol.js"),
	poe: require("./maps/poe.js"),
	pow: require("./maps/pow.js"),
}
let loadedMaps = [];
//let activeMaps = [];
let enemy = [];
let obstacle = [];

wss.on("connection", ws => {
	ws.binaryType = "arraybuffer"

	//Setting clientId to id
	const clientId = id;
  
	//Updating id for next player join
    id++;
    if(id > 9999){
        id = 0;
    }

	//Create new player
	const player = new Player(clientId, ws);
	players[clientId] = player;

	players[clientId].client.send(msgpack.encode({ si: clientId }));
	pushPlayerMap(players[clientId],maps[players[clientId].world]);

	ws.on('close', () => {
		//Send all clients the id of the player leaving
		for (let i of Object.keys(players)) {
			players[i].client.send(msgpack.encode({ l: clientId }))
		}

		//Delete player from players list
		delete players[clientId];
	})

	ws.on('message', data => {
		let d = msgpack.decode(new Uint8Array(data));
		if (d.mp) {
			player.mousePos.x = d.mp[0];
			player.mousePos.y = d.mp[1];
		}
		if (d.cs) {
			if(player.inputType == 'mouse'){
				player.inputType = 'keyboard';
			} else {
				player.inputType = 'mouse';
			}
		}
		if (d.kD) {
			if(d.kD == 'w' || d.kD == 'arrowup'){
				player.inputs.up = true;
			}
			if(d.kD == 'a' || d.kD == 'arrowleft'){
				player.inputs.left = true;
			}
			if(d.kD == 'd' || d.kD == 'arrowright'){
				player.inputs.right = true;
			}
			if(d.kD == 's' || d.kD == 'arrowdown'){
				player.inputs.down = true;
			}
			if(d.kD == 'shift'){
				player.inputs.shift = true;
			}
		}
		if (d.kU) {
			if(d.kU == 'w' || d.kU == 'arrowup'){
				player.inputs.up = false;
			}
			if(d.kU == 'a' || d.kU == 'arrowleft'){
				player.inputs.left = false;
			}
			if(d.kU == 'd' || d.kU == 'arrowright'){
				player.inputs.right = false;
			}
			if(d.kU == 's' || d.kU == 'arrowdown'){
				player.inputs.down = false;
			}
			if(d.kU == 'shift'){
				player.inputs.shift = false;
			}
			if(d.kU == 'r'){
				player.dead = false;
				player.deadChanged = true;
				player.x = player.spawn.x || 25;
				player.y = player.spawn.y || 25;
				player.xChanged = true;
				player.yChanged = true;
			}
			if(d.kU == 'p'){
				if(player.area < maps[player.world].areas.length-1){
					player.area++;
					//pushPlayerArea(player, maps[player.world], player.area);
					player.areaChanged = true;
					//console.log(maps[player.world].areas[player.area]);
				}
			}
			if(d.kU == 'o'){
				if(player.area > 0){
					player.area--;
					//pushPlayerArea(player, maps[player.world], player.area);
					player.areaChanged = true;
				}
			}
			if(d.kU == 'l'){
				player.god = !player.god;
			}
		}
	})
})

//Connection to server:
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);

server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, socket => {
		wss.emit('connection', socket, request);
	});
});

// simulate map is in physics

let lastTime = Date.now();
let timer = 10000;

function mainLoop() {
	let time = Date.now();
	let delta = time - lastTime;
	lastTime = time;

    for (let i in players) {
		//Update player position
		players[i].move(delta);
		if(players[i].worldChanged){
			pushPlayerMap(players[i],maps[players[i].world]);
		}
		if(players[i].areaChanged){
			pushPlayerArea(players[i],maps[players[i].world],players[i].area);
		}

		// Collision with enemies
		for (let e in enemies){
			if(Math.sqrt((enemies[e].x - players[i].x) ** 2 + (enemies[e].y - players[i].y) ** 2) < players[i].radius + enemies[e].radius){
				players[i].dead = true;
				players[i].deadChanged = true;
			}
		}

		// Players saving other dead players
		for (let e in players){
			if(players[e].id != players[i].id && players[e].area == players[i].area && players[e].world == players[i].world){
				if(Math.sqrt((players[e].x - players[i].x) ** 2 + (players[e].y - players[i].y) ** 2) < 24.5*2){
					players[i].dead = false;
					players[i].deadChanged = true;
				}
			}
		}
	}

	for (let i in enemies) {
		enemies[i].move(delta, players, enemies);
	}

	for(let i in loadedMaps){
		for(let j in loadedMaps[i].areas){
			simulateArea(loadedMaps[i], j, delta);
		}
		/*for(let j in loadedMaps[i].areas){
			for(let k in loadedMaps)
		}*/
		for(let j in players){
			if(maps[players[j].world] == loadedMaps[i] && !players[j].god){
				runEnemyCollision(players[j], maps[players[j].world].areas[players[j].area].enemies);
				runCollision(players[j], maps[players[j].world].areas[players[j].area].obstacles, {width: maps[players[j].world].areas[players[j].area].width || maps[players[j].world].default.width, height: maps[players[j].world].areas[players[j].area].height || maps[players[j].world].default.height});
			}
		}
		for(let j in players){
			// lol its inefficient so optimize later
			let playerUpdatePack = [];
			for(let k in players){
				if(players[k].world == players[j].world && players[k].area == players[j].area){
					if(players[k].getUpdatePack() != {}){
						playerUpdatePack.push(players[k].getUpdatePack());
					}
				}
			}
			players[j].client.send(msgpack.encode({ player: playerUpdatePack }));
			//players[j].client.send(msgpack.encode({ player: players[j].getUpdatePack() }));
			players[j].client.send(msgpack.encode({ obstacle: maps[players[j].world].areas[players[j].area].obstacles}));
			players[j].client.send(msgpack.encode({ enemy: maps[players[j].world].areas[players[j].area].enemies}));
		}
	}
}

function simulateArea(map, area, dt){
	for(let i in map.areas[area].obstacles){
		let obstacle = map.areas[area].obstacles[i];
		map.areas[area].obstacles[i].id = i;// todo: fix this ;-;
		obstacle.update(dt);
	}
	for(let i in map.areas[area].enemies){
		let enemy = map.areas[area].enemies[i];
		//enemy.world = map;
		enemy.area = area;
		map.areas[area].enemies[i].id = i;// todo: fix this ;-;
		enemy.move(dt, players, map.areas[area].enemies[i]);
	}
}

function pushPlayerMap(player, map/*, area*/){
	// unloading map player is the last player
	checkLoaded();
	player.spawn = map.areas[0].spawn || map.default.spawn;
	player.x = player.spawn.x || 25;
	player.y = player.spawn.y || 25;
	player.xChanged = true;
	player.yChanged = true;
	player.client.send(msgpack.encode({ ar: true }));
	player.client.send(msgpack.encode({ mc: { width: map.areas[0].width || map.default.width, height: map.areas[0].height || map.default.height, bgColor: map.areas[0].bgColor || map.default.bgColor, tileColor: map.areas[0].tileColor || map.default.tileColor}}));
	player.worldChanged = false;
	if(map.default.platformer == true){
		player.platformer = true;
	} else {
		player.platformer = false;
	}
}

function pushPlayerArea(player, map, area){
	player.spawn = map.areas[area].spawn || map.default.spawn;
	player.x = player.spawn.x || 25;
	player.y = player.spawn.y || 25;
	player.xChanged = true;
	player.yChanged = true;
	player.client.send(msgpack.encode({ ar: true }));
	player.client.send(msgpack.encode({ mc: { width: map.areas[area].width || map.default.width, height: map.areas[area].height || map.default.height, bgColor: map.areas[area].bgColor || map.default.bgColor, tileColor: map.areas[area].tileColor || map.default.tileColor}}));
	player.areaChanged = false;
}

function checkLoaded(){
	loadedMaps = [];
	for(let i in players){
		if(players[i].world && !loadedMaps.includes(maps[players[i].world])){
			loadedMaps.push(maps[players[i].world]);
		}
	}
}

setInterval(() => {
	mainLoop();
}, 1000 / 60);

console.log("App listening to Server " + PORT);