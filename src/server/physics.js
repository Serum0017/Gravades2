var SAT = require('sat');
function runObstaclePhysics(obstacles) {
    for(let i in obstacles){
        obstacles[i].simulate(dt);
    }
}
function findDistance(x1,y1,x2,y2){
    return(Math.sqrt((x2-x1)**2+(y2-y1)**2));
}
function boundCircleRect(circle, rect){
    var c = new SAT.Circle(new SAT.Vector(circle.x,circle.y), circle.radius);
    var r = new SAT.Box(new SAT.Vector(rect.x,rect.y), rect.w, rect.h);
    var response = new SAT.Response();
    const collided = SAT.testCirclePolygon(c, r.toPolygon(), response);
    if(collided){
        return response;
    } else {
        return false;
    }
}
function boundPlayerCircularObstacle(circle, obstacle){
    var p = new SAT.Circle(new SAT.Vector(circle.x,circle.y), circle.radius);
    var o = new SAT.Circle(new SAT.Vector(obstacle.x,obstacle.y), obstacle.radius);
    var response = new SAT.Response();
    const collided = SAT.testCircleCircle(p, o, response);
    if(collided){
        return response;
    } else {
        return false;
    }
}
function boundPlayerRotatingObstacle(player, obstacle) {
    let obsCircleDist = Math.sqrt((obstacle.w/2)**2+(obstacle.h/2)**2);
    let pdist = findDistance(player.x, player.y, obstacle.x, obstacle.y);
	if (pdist < Math.abs(player.radius+obsCircleDist)) {
        const oldX = obstacle.x;
        const oldY = obstacle.y;
        obstacle.x -= obstacle.w / 2;
        obstacle.y -= obstacle.h / 2;
        const points = [
            rotatePoint(obstacle.x, obstacle.y, obstacle.pivotX, obstacle.pivotY, obstacle.angle, obstacle.distToPivot),
            rotatePoint(obstacle.x + obstacle.w, obstacle.y, obstacle.pivotX, obstacle.pivotY, obstacle.angle, obstacle.distToPivot),
            rotatePoint(obstacle.x + obstacle.w, obstacle.y + obstacle.h, obstacle.pivotX, obstacle.pivotY, obstacle.angle, obstacle.distToPivot),
            rotatePoint(obstacle.x, obstacle.y + obstacle.h, obstacle.pivotX, obstacle.pivotY, obstacle.angle, obstacle.distToPivot),
        ]
        obstacle.x = oldX;
        obstacle.y = oldY;
        const polySat = new SAT.Polygon(new SAT.Vector(0, 0), [...points.map(({x, y}) => new SAT.Vector(x, y))])
        const psat = new SAT.Circle(new SAT.Vector(player.x,player.y), player.radius);
        let response = new SAT.Response();
        const collision = SAT.testPolygonCircle(polySat, psat, response);
        if (collision) {
            return response;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function runCollision (player, obstacles, arena){
    // bounding player w/ arena
    if (player.x - player.radius < 0) {
        player.x = player.radius;
        player.xChanged = true;
    } else if (player.x + player.radius > arena.width) {
        player.x = arena.width - player.radius;
        player.xChanged = true;
    }

    if (player.y - player.radius < 0) {
        player.y = player.radius;
        player.yChanged = true;
    } else if (player.y + player.radius > arena.height) {
        player.y = arena.height - player.radius;
        player.yChanged = true;
        player.jump = true;
    }

    // collision with obstacles
    for(let o in obstacles){
        let obstacle = obstacles[o];
        if(obstacle.type.includes('rotate')){
            let r = boundPlayerRotatingObstacle(player, obstacle)
            if(r){
                runCollisionEffects(player, obstacle, r);
                player.xChanged = true;
                player.yChanged = true;
            }
        } else if(obstacle.type.includes('circle')){
            let r = boundPlayerCircularObstacle(player, obstacle)
            if(r){
                runCollisionEffects(player, obstacle, r);
                player.xChanged = true;
                player.yChanged = true;
            }
        } else {
            let r = boundCircleRect(player, obstacle);
            if(r){
                runCollisionEffects(player, obstacle, r);
                player.xChanged = true;
                player.yChanged = true;
            }
        }
    }
}

function runEnemyCollision(player, enemy){
    for(let i in enemy){
        let e = enemy[i];
        let col = boundPlayerCircularObstacle(player, e);
        if(col){
            runEnemyCollisionEffects(e, player, col);
        }  
    } 
}

function runEnemyCollisionEffects(enemy, player, resp){
    if (enemy.type == 'nokill'){
        player.x -= resp.overlapV.x;
        player.y -= resp.overlapV.y;
    } else {
        player.dead = true;
        player.deadChanged = true;
    }
}

function runCollisionEffects(circle, rect, resp){
    if(!circle.dead){
        // effects
        if(rect.type.includes('bounce')){
            resp.overlapV.x *= rect.effect;
            resp.overlapV.y *= rect.effect;
        }
        if(rect.type.includes('lava')){
            circle.dead = true;
            circle.deadChanged = true;
        }
        // custom collision
        if(rect.type.includes('world')){
            circle.area = 0;
            circle.world = rect.world;
            circle.worldChanged = true;
        }
        if(rect.type.includes('area')){
            circle.area = rect.area;
            circle.areaChanged = true;
        }
        if(rect.type.includes('area')){
            circle.area = rect.area;
        }
        if(rect.type.includes('rotate') && !rect.type.includes('safe')){
            circle.x += resp.overlapV.x;
            circle.y += resp.overlapV.y;
        }
        if(rect.type.includes('normal') || rect.type.includes('move') || rect.type.includes('circle')){
            circle.x -= resp.overlapV.x;
            circle.y -= resp.overlapV.y;
        } else if(rect.type.includes('lava')){// lava pushes players out if it doenst have any other props
            circle.x -= resp.overlapV.x;
            circle.y -= resp.overlapV.y;
        }
        // platformer
        if(circle.platformer && !rect.type.includes('safe')){
            circle.vel.y = 0;
            circle.jump = true;
        }
    }
    if(rect.type.includes('safe')){
        circle.dead = false;
        circle.deadChanged = true;
    }
}

function rotatePoint (pointX, pointY, originX, originY, angle, distToPivot=1) {
    angle = (angle * Math.PI) / 180.0;
    return {
        x:
            Math.cos(angle)  * (pointX - originX) -
            Math.sin(angle)  * (pointY - originY) +
            originX,
        y:
            Math.sin(angle)  * (pointX - originX) +
            Math.cos(angle)  * (pointY - originY) +
            originY,
    };
}

module.exports = {
    runObstaclePhysics,
    runCollision,
    runEnemyCollision,
}