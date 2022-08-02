let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let player = new Player(0, 0, 1000, "Player", "#" + Math.floor(Math.random()*16777215).toString(16));

let otherPlayers = [];

const BASE_SPEED = 5;
const PLAYER_SIZE = 30;

const DOWN_KEY = 83 // 40;
const UP_KEY = 87 // 38;
const RIGHT_KEY = 68 // 39;
const LEFT_KEY = 65 // 37;

let mouse = { x: 0, y: 0 };

let downPressed = false;
let upPressed = false;
let rightPressed = false;
let leftPressed = false;

window.onkeydown = function (event) {
    if (event.keyCode == DOWN_KEY && downPressed == false) {
        player.ySpeed += BASE_SPEED;
        downPressed = true;
    }
    if (event.keyCode == UP_KEY && upPressed == false) {
        player.ySpeed -= BASE_SPEED;
        upPressed = true;
    }
    if (event.keyCode == RIGHT_KEY && rightPressed == false) {
        player.xSpeed += BASE_SPEED;
        rightPressed = true;
    }
    if (event.keyCode == LEFT_KEY && leftPressed == false) {
        player.xSpeed -= BASE_SPEED;
        leftPressed = true;
    }
}

window.onkeyup = function (event) {
    if (event.keyCode == DOWN_KEY && downPressed == true) {
        player.ySpeed -= BASE_SPEED;
        downPressed = false;
    }
    if (event.keyCode == UP_KEY && upPressed == true) {
        player.ySpeed += BASE_SPEED;
        upPressed = false;
    }
    if (event.keyCode == RIGHT_KEY && rightPressed == true) {
        player.xSpeed -= BASE_SPEED;
        rightPressed = false;
    }
    if (event.keyCode == LEFT_KEY && leftPressed == true) {
        player.xSpeed += BASE_SPEED;
        leftPressed = false;
    }
}

canvas.onmousemove = function (event) {
    let rect = event.target.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}

function move() {
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width) player.x = canvas.width;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height) player.y = canvas.height;

    player.rot = Math.atan2(mouse.y - player.y, mouse.x - player.x) * 180 / Math.PI;
}

function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (connection.readyState == 1) {
        move();
        player.draw();

        for (i in otherPlayers) {
            otherPlayers[i].draw();
        }

        connection.send(JSON.stringify(player));
    } else if (connection.readyState == 3) {
        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Connection lost!", 10, 50);
    } else {
        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Attempting to connect...", 10, 50);
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

setInterval(gameLoop, 1000 / 30);