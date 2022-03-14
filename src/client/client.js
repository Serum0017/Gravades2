let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
ws.binaryType = "arraybuffer"

var players = {};
var enemies = {};
var obstacles = {};

// interpolation
let lastUpdate = {lastPlayers: {}, lastEnemies: {}, lastObstacles: {}};
let lastTime = Date.now();
let dt = 0;

let displayCoords = false;

var renderPosX = canvas.width/2;
var renderPosY = canvas.height/2;

let selfId = "";
let map = {width: canvas.width, height: canvas.height, bgColor: "#1f2229", tileColor: "#323645"};

const tileSize = 50;

ws.addEventListener("message", function (data) {
    let message = msgpack.decode(new Uint8Array(data.data));
    // Recieving Messages from the server and updating the client side constructor correspondingly
    if (message.player) {
      //console.log(message.player);
      lastUpdate.lastPlayers = players;
      for (let a in message.player) {
        players[message.player[a].id] = message.player[a];
      }
    }

    if (message.enemy) {
      lastUpdate.lastEnemies = enemies;
      for (let a in message.enemy) {
        enemies[message.enemy[a].id] = message.enemy[a];
      }
    }
    if (message.obstacle) {
      obstacles = {};
      lastUpdate.lastObstacles = obstacles;
      for (let a in message.obstacle) {
        obstacles[message.obstacle[a].id] = message.obstacle[a];
      }
    }
    if (message.ar){
      obstacles = {};
      players = {};
      enemies = {};
    }

    // Players leaving
    if (message.l) {
      delete players[message.l];
    }

    if (message.mc) {
      // if this gets any bigger just use object.assign
      map.width = message.mc.width;
      map.height = message.mc.height;
      map.bgColor = message.mc.bgColor;
      map.tileColor = message.mc.tileColor;
    }

    // Player canvas resizing (caused by changing window size)
    if (message.si) {
      Resize();
      requestAnimationFrame(renderGame);
      selfId = message.si;
    }
    requestAnimationFrame(renderGame)
});
setInterval(() => requestAnimationFrame(renderGame), 1000/60);
/*
bgColor: '#1f2229',
tileColor: '#323645',
*/
let camera = {x: 0, y: 0};
function renderGame() {
  dt = Date.now() - lastTime;
  lastTime = Date.now();
  //bg
  ctx.fillStyle = map.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = map.tileColor;
  let interpX = 0;
  let interpY = 0;
  for(let i in players){
    if(players[i].id == selfId){
      interpX = camera.x - interpolateObject(players[i],lastUpdate.lastPlayers[i],dt).x;
      interpY = camera.y - interpolateObject(players[i],lastUpdate.lastPlayers[i],dt).y;
    }
  }
  ctx.fillRect(offset({x:interpX,y:interpY}).x,offset({x:interpX,y:interpY}).y,map.width, map.height);

  // tiles
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  for(let x = 0; x <= canvas.width/tileSize+1; x++){
    ctx.beginPath();
    ctx.moveTo(x*tileSize+interpX-camera.x%tileSize-tileSize/4+2.5,0);
    ctx.lineTo(x*tileSize+interpX-camera.x%tileSize-tileSize/4+2.5,canvas.height);
    ctx.stroke();
    ctx.closePath();
  }
  for(let y = 0; y <= canvas.height/tileSize+1; y++){
    ctx.beginPath();
    ctx.moveTo(0,y*tileSize+interpY-camera.y%tileSize+tileSize/4-2.5);
    ctx.lineTo(canvas.width,y*tileSize+interpY-camera.y%tileSize+tileSize/4-2.5);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;

  for(let i in obstacles){
    let obstacle = obstacles[i];
    // interpolating between last player and the current player
    if(lastUpdate.lastObstacles[i]){
      obstacle = interpolateObject(obstacles[i],lastUpdate.lastObstacles[i],dt);
    }
    ctx.beginPath();
    if(obstacle.type.includes('bounce')){
      ctx.fillStyle = 'green';
    } else if(obstacle.type.includes('lava')){
      ctx.fillStyle = 'red';
    } else if(obstacle.type.includes('safe')){
      ctx.fillStyle = 'grey';
      ctx.globalAlpha = 0.5;
    } else if(obstacle.type.includes('world') || obstacle.type.includes('area')){
      ctx.fillStyle = 'hsl('+Date.now()/12+' 50% 50%)';
    } else {
      ctx.fillStyle = map.bgColor;
    }
    if(obstacle.type.includes('rotate')){
      ctx.translate(offset(obstacle).x, offset(obstacle).y);
      ctx.rotate(obstacle.angle*Math.PI/180);
      ctx.fillRect(-obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h);
      ctx.rotate(-obstacle.angle*Math.PI/180);
      ctx.translate(-offset(obstacle).x, -offset(obstacle).y);
    } else if(obstacle.type.includes('circle')){
      ctx.arc(offset(obstacle).x,offset(obstacle).y,obstacle.radius,0,Math.PI*2);
      ctx.fill();
    } else { 
      ctx.fillRect(offset(obstacle).x,offset(obstacle).y,obstacle.w,obstacle.h);
    }
    if(obstacle.type.includes('world') && obstacle.strokeColor != undefined){
      ctx.lineWidth = 2;
      ctx.strokeStyle = obstacle.strokeColor.replaceAll('NaN','');
      ctx.strokeRect(offset(obstacle).x,offset(obstacle).y,obstacle.w,obstacle.h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
    }
    ctx.closePath();
    /*if(obstacle.type.includes('turret')){
      ctx.fillStyle = 'red';
      for(let i in obstacle.projectiles){
        let projectile = {x: obstacle.projectiles[i][0], y: obstacle.projectiles[i][1], radius: obstacle.projectiles[i][2]};
        ctx.beginPath();
        ctx.arc(offset(projectile).x, offset(projectile).y, projectile.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }*/
    ctx.globalAlpha = 1;
  }

  for (let e in enemies) {
    let enemy = enemies[e];
    // interpolating between last player and the current player
    if(lastUpdate.lastEnemies[e]){
      enemy = interpolateObject(enemies[e],lastUpdate.lastEnemies[e],dt);
    }
    ctx.beginPath();
    enemy.type = enemy.type.replaceAll('NaN', '');
    if(enemy.type == 'nokill'){
      ctx.fillStyle = map.bgColor;
    } else if(enemy.type == 'home'){
      ctx.fillStyle = '#634a22';
    } else if(enemy.type == 'rain'){
      ctx.fillStyle = '#25b8a4';
    } else if(enemy.type == 'superhome'){
      ctx.fillStyle = '#524023';
    } else if(enemy.type == 'growaura'){
      ctx.fillStyle = '#997531';
    } else {
      ctx.fillStyle = 'rgba(120,120,120,0.9)';
    }
    ctx.arc(offset(enemy).x, offset(enemy).y, enemy.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    if(enemy.aura){
      if(enemy.type == 'growaura'){
        ctx.fillStyle = '#997531';
      } else {
        ctx.fillStyle = 'rgba(120,120,120,0.9)';
      }
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(offset(enemy).x, offset(enemy).y, enemy.aura, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.globalAlpha = 1;
    }
  }

  for (let i in players) {
    ctx.beginPath();
    if (players[i].id == selfId) {
      let player = players[i];
      if(lastUpdate.lastPlayers[i]){
        player = interpolateObject(players[i],lastUpdate.lastPlayers[i],dt);
      }
      if(players[i].d == true){
        ctx.textAlign = 'center';
        ctx.font = "28px Arial";
        ctx.fontWeight = "bold";
        ctx.fillStyle = 'white';
        ctx.fillText('Press r to respawn', canvas.width/2, canvas.height-50);
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = 'black';
      }
      ctx.arc(canvas.width/2, canvas.height/2, 24.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      // camera tweening
      /*if(lastUpdate.lastPlayers[i]){
        camera.x = interpolateObject(players[i],lastUpdate.lastPlayers[i],dt).x;
        camera.y = interpolateObject(players[i],lastUpdate.lastPlayers[i],dt).y;
      } else {*/
        camera.x = player.x;
        camera.y = player.y;
      //}
    }
  }

  if(displayCoords){
    ctx.textAlign = 'center';
    ctx.font = "18px Arial";
    ctx.fontWeight = "bold";
    ctx.fillStyle = 'white';
    ctx.fillText('( '+ camera.x + ' ' + camera.y + ' )', canvas.width/2, canvas.height/2+48);
  }

  for (let i in players) {
    if (players[i].id != selfId) {
      let player = players[i];
      // interpolating between last player and the current player
      if(lastUpdate.lastPlayers[i]){
        player = interpolateObject(players[i],lastUpdate.lastPlayers[i],dt);
      }
      ctx.beginPath();
      // filling with a different color if player is dead
      if(players[i].d == true){
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = 'black';
      }
      ctx.arc(offset(player).x, offset(player).y, 24.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
}

function Resize() {
  let scale = window.innerWidth / canvas.width;
  if (window.innerHeight / canvas.height < window.innerWidth / canvas.width) {
    scale = window.innerHeight / canvas.height;
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = 1 / 2 * (window.innerWidth - canvas.width) + "px";
  canvas.style.top = 1 / 2 * (window.innerHeight - canvas.height) + "px";
}
Resize();

window.addEventListener('resize', function () {
  Resize();
});

function getCursorPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect(),
	  scaleX = canvas.width / rect.width,
	  scaleY = canvas.height / rect.height;
  
	mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
	ws.send(msgpack.encode({ mp: [mouseX, mouseY] }));
}
window.addEventListener('mousedown', function (e) {
  ws.send(msgpack.encode({ cs: true }));
})
window.addEventListener('mousemove', function (e) {
  getCursorPosition(canvas, e);
})

document.onkeydown = function (e) {
  ws.send(msgpack.encode({ kD: e.key.toLowerCase() }));
}

document.onkeyup = function (e) {
  if(e.key == 'u'){
    displayCoords = !displayCoords;
  } else {
    ws.send(msgpack.encode({ kU: e.key.toLowerCase() }));
  }
}

function offset(obj){
  return {x: obj.x - camera.x + canvas.width/2, y: obj.y - camera.y + canvas.height/2};
}

function interpolateObject(object1, object2, ratio) {
  if (!object2) {
    return object1;
  }

  const interpolated = {};
  Object.keys(object1).forEach(key => {
    interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
  });
  return interpolated;
}