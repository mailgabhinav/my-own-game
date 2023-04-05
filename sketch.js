var bg,bgImg;
var player, shooterImg, shooter_shooting;
var explosionSound, winningSound, losingSound;
var hearts, bullet, bulletGroup, bulletImg, enemy1Img,  enemy2Img, enemyGroup ;
var doorimg, door;
var gameOver, gameOverImg;
var resetButton, resetButtonImg, blastImg;
var heart = 3;
var gameState = 1

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet.png.png")
  enemy1Img = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/background.png")
  doorimg = loadImage("assets/door.png")
  enemy2Img = loadImage("assets/player.png")
  explosionSound = loadSound("assets/lose.mp3")
  gameOverImg = loadImage("assets/gameOver.png")
  resetButtonImg = loadImage("assets/reset.png")
  blastImg = loadImage("assets/blast.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2,displayHeight/2-800,20,20);
  bg.addImage(bgImg);
  bg.scale=3.9

hearts = createSprite(displayWidth/2+375,displayHeight/2-490,25,25);
hearts.addImage(heart3Img);
hearts.scale = 0.2

gameOver = createSprite(displayWidth/2,displayHeight/2-300,20,20);
gameOver.addImage(gameOverImg);
gameOver.scale=3;
gameOver.visible=false;
  
resetButton = createSprite(windowWidth/2,windowHeight/2,20,20)
resetButton.addImage(resetButtonImg);
resetButton.scale=0.3
resetButton.visible=false;

door = createSprite(displayWidth/2+590,displayHeight/2+90,20,20);
door.addImage(doorimg);
door.scale=1

enemyGroup = createGroup();
 bulletGroup = createGroup()
console.log(frameCount)
//creating the player sprite
player = createSprite(displayWidth-1800, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3

   

 
   player.debug = true
   // player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
    player.setCollider("rectangle",0,0,300,300)
   // player.Setcollider("rectangle",0,0,300,300)

   
}

function draw() {
  background(0); 



if(gameState=1){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-10
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+10
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+10
 }
 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-10
 }

 spawnEnemy();

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 player.addImage(shooter_shooting)
 explosionSound.play();
 bullet = createSprite(player.x+50,player.y-24,20,20)
 bullet.addImage(bulletImg);
 bullet.scale=0.005;
 bullet.velocity.x=+30
 bullet.lifetime=300;
 bulletGroup.add(bullet);
 
}
if(player.isTouching(door)){
  gameState=2
}
if(enemyGroup.isTouching(bulletGroup)){
  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
  player.addImage(shooterImg)
 //player.addImage(shooter_1.png)

}
}

if(enemyGroup.isTouching(player)){
  player.remove();
  enemyGroup.destroyEach();
  gameState=2;
}







if(gameState===2){
player.remove();
   gameOver.visible=true;
   resetButton.visible=true;
   if(mousePressedOver(resetButton)) {
    reset();
  }
}

drawSprites();
}

function spawnEnemy(){
  if (frameCount % 60 === 0){
    var enemy = createSprite(2000,700,10,40);
    enemy.velocityX = -6 ;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: enemy.addImage(enemy1Img);
               break;
       case 2: enemy.addImage(enemy2Img);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
    enemy.scale = 0.09;
    enemy.lifetime = 400;
    
    //add each obstacle to the group
    enemyGroup.add(enemy);
    }}

    function reload(){
      gameState=1
      enemyGroup.destroyEach();
      player.position.x=120;
      player.position.y=780;
      gameOver.visible=false;
      resetButton.visible=false;
    }
  