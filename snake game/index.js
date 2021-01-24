const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

var emoji1 = new Image();
    emoji1.src = "happy.png";
    emoji1.onload = function () {
    }

var emoji2 = new Image();
    emoji2.src = "concerned.png";
    emoji2.onload = function () {
    }

var emoji3 = new Image();
    emoji3.src = "mad.png";
    emoji3.onload = function () {
    }

var emoji4 = new Image();
    emoji4.src = "meh.png";
    emoji4.onload = function () {
    }

var emoji5 = new Image();
    emoji5.src = "rage.png";
    emoji5.onload = function () {
    }

var emoji6 = new Image();
    emoji6.src = "sad.png";
    emoji6.onload = function () {
    }

var girlimg = new Image();
    girlimg.src = "girl.png";
    girlimg.onload = function () {
    }

var emojiimages = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6];

class SnakePart {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

function drawGame(){
    
    changeSnakePosition();

    let result = isGameOver();
    if (result) {
        setTimeout(function() {
            window.open("https://flowerescent-website.glitch.me/index.html", "_blank");
        }, 4000); 
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        speed = 9;
    }
    if (score > 5){
        speed = 11;
    }
    if (score > 20){
        speed = 15;
    }
    if (score > 30){
        speed = 20;
    }

    setTimeout(drawGame, 1000/speed);
}

function isGameOver() {
    let gameOver = false;

    if (xVelocity === 0 && yVelocity === 0){
        return false;
    }

    // Game Over if Snake hits walls
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount){
        gameOver = true;
    }

    // Game Over if Snake eats itself
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    // Game Over Font
    if (gameOver) {
        ctx.fillStyle = "white";
        //ctx.font = "42px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        // Fill with gradient
        ctx.fillStyle = gradient;

        ctx.font = "37.5px Verdana";
        ctx.fillText("Feeling overwhelmed", canvas.width/400, canvas.height/2.7)


        ctx.fillText("with emotions?", canvas.width/400, canvas.height/2.2)

        ctx.font = "45px Verdana";
        ctx.fillText("You are not alone", canvas.width/400, canvas.height/1.8);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake() { 

    //ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.drawImage(emojiimages[Math.floor(Math.random() * 6)],part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX,headY));
    // add while statement here to reset snake after collision
    if(snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.drawImage(girlimg, headX * tileCount, headY * tileCount, tileSize, tileSize);
    //ctx.fillStyle = 'orange';
    //ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

 }

 function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.drawImage(emojiimages[Math.floor(Math.random() * 6)], appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    /*function loop() {
        for (var i = 0; i<snakeeatgraphics.length;i++) {
        ctx.drawImage(snakeeatgraphics[i], 0, 0);
          console.log(array[i%snakeeatgraphics.length])
        }
      } */
     //ctx.fillStyle = 'red';
     //ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
 }

function checkAppleCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){

    // up
    if (event.keyCode == 38){
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1
        xVelocity = 0;
    }

    // down
    if (event.keyCode == 40){
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1
        xVelocity = 0;
    }

    // left
    if (event.keyCode == 37){
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }

    // right
    if (event.keyCode == 39){
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
