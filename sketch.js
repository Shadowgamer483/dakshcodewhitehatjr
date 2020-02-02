var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudimg,cloudgroup,ob1,ob2,ob3,ob4,ob5,ob6,obstaclegroup,score=0;
var PLAY=1;
var END=0
var GAMESTATE=PLAY;
var GAMEOVER,RESTART,ULOST,TRYAGAIN;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
ob1 = loadImage("obstacle1.png")
ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
ULOST =loadImage("gameOver.png");
  TRYAGAIN=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  cloudgroup = new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  obstaclegroup = new Group();
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  trex.addImage("trex_die",trex_collided);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
GAMEOVER = createSprite(300,100);
GAMEOVER.addImage(ULOST);
RESTART = createSprite(260,60);
RESTART.addImage(TRYAGAIN);
GAMEOVER.visible=false
RESTART.visible=false
}

function draw() {
  background(185);
  text("score:"+score,500,20)
  if(GAMESTATE === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 161){
      trex.velocityY = -12 ;
   //   playSound("jump.mp3");
    }
  console.log(trex.y)
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclegroup.isTouching(trex)){
      //playSound("jump.mp3");
      GAMESTATE = END;
      //playSound("die.mp3");
    }
  }
  
  else if(GAMESTATE === END) {
    GAMEOVER.visible = true;
    RESTART.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_die",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(RESTART)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  GAMESTATE = PLAY;
  
  GAMEOVER.visible = false;
  RESTART.visible = false;
  
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
 
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudgroup.add(cloud);
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    obstaclegroup.add(obstacle);
    //generate random obstacles
    var rand = Math.round(random(1,6));
//    obstacle.setAnimation("obstacle" + rand);
  switch(rand){
    case 1:obstacle.addImage(ob1);
      break;
    case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
    case 6:obstacle.addImage(ob6);
      break;
   default:break 
    
    
  }  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}