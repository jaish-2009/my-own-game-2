var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cat , cat_running;
//cat_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  cat_running = loadAnimation("cat1.png","cat2.png","cat3.png");
  //trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("grassbg.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("rock1.png");
  obstacle2 = loadImage("rock2.png");
  obstacle3 = loadImage("rock3.png");
  obstacle4 = loadImage("rock4.png");
  obstacle5 = loadImage("rock5.png");
  obstacle6 = loadImage("rock6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1600,800);
  
  cat = createSprite(350,300,20,50);
  cat.addAnimation("running", cat_running);
 // trex.addAnimation("collided" ,trex_collided);
    cat.scale = 0.5;
  
 // ground = createSprite(200,180,1600,600);
  //ground.addImage("ground",groundImage);
 // ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,690,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
 // trex.setCollider("rectangle",0,0,250,trex.height);
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(groundImage);
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(score > 0 && score % 100 === 0 ) {
  
//  checkPointSound.play();
    
  }
  
 // console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
  //  ground.velocityX = -(4+3*score/100);
    //scoring
    score = score + Math.round(frameCount/60);
    
   // if (ground.x < 0){
     // ground.x = ground.width/2;
    
  //  }
    
    //jump when the space key is pressed
    if(keyDown("space")&& cat.y >= 100) {
        cat.velocityY = -12;
    //  jumpSound.play();
    }
    
    //add gravity
    cat.velocityY = cat.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(cat)){
       gameState = END;
      dieSound.play();
    //cat.velocityY = -12;
      //jumpSound.play();
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
     // ground.velocityX = 0;
      cat.velocityY = 0
     
      //change the trex animation
      //cat.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  cat.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,500,10,40);
   obstacle.velocityX = -(6+score / 100);
   
   
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = cat.depth;
    cat.depth = cat.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

