// global variables
var canvasSize = 600;
var x, x2 = 300;    // x coordinate
var y, y2 = 300;    // y coordinate
var size = 100; // image size
var birdSize = size/2;
var score = 0;  // start score at 0
var tSize = 20; // text size
var gameState = "L1"; // start on level  1
var dog, bg1, bg2, bg3, bg4;
let sel, item, button;

// Preload images
function preload() {
  dog = loadImage('dog.png');
  bird = loadImage('bird.png');
  bg1 = loadImage('neighborhood.jpeg');
  bg2 = loadImage('park.jpeg');
  bg3 = loadImage('picnic.jpeg');
  bg4 = loadImage('dog-bed.jpg');
}

// Setup
function setup() {
  createCanvas(canvasSize+(canvasSize/3), canvasSize);
  textAlign(CENTER);
  textSize(tSize);
  x = random(width); // starting coordinates
  y = random((2/3)*height, height); // from 2/3 of the height to the bottom of the canvas
  x2 = random(width);
  y2 = random(height);
  
  cursor(HAND); // start cursor with no item
  // create selection
  sel = createSelect();
  sel.position(10, 10);
  sel.option('No Item');
  sel.option('Dog Bone');
  sel.option('Duck');
  sel.option('Baseball');
  sel.option('Rope');
  sel.option('Bacon');
  sel.selected('No Item');
  sel.changed(selectCursor);
  
  // create button for restart option anytime
  button = createButton('Restart');
  button.position(width-75, 10);
  button.mousePressed(pressed);
} // end setup

// Draw
function draw() {
  fill(240); // Light color text
  if(gameState == "L1") {
    levelOne();
  }
  else if (gameState == "L2") {
    levelTwo();
  }
  else if (gameState == "L3") {
    levelThree();
  }
  else if (gameState == "end") {
    end();
  }
  text(("Score: " + score), width/2, 40); // display score
} // end draw

// Change cursor
function selectCursor() {
    item = sel.value();
    if (item == 'Baseball') {
      cursor('baseball.png', 16, 16);
    }
    else if (item == 'Rope') {
      cursor('rope.png', 50, 33);
    }
    else if (item == 'Duck') {
      cursor('duck.png', 25, 25);
    }
    else if (item == 'Bacon') {
      cursor('bacon.png', 35, 20);
    }
    else if (item == 'Dog Bone') {
      cursor('dog-bone.png', 37, 19);
    }
    else if (item == 'No Item') {
      cursor(HAND);
    }
}

// Restart button pressed - reset game state to beginning
function pressed() {
  gameState = "L1";
  score = 0;
  size = 100;
  textSize(tSize);
}

// Level 1 - duck, dog bone, bacon, cursors work
function levelOne() {
  image(bg1, 0, 0, width, height);
  text("Level 1", width/2, height-20); // text to display, where to put it coords
  
  // dist to the dog
  var distTo = dist(x, y, mouseX, mouseY);
  if (distTo < size/2 && (item == 'Duck' || item == 'Dog Bone' || item == 'Bacon')) {
    x = random(width);
    y = random((2/3)*height, height);
    x2 = random(width);
    y2 = random(height);
    score = score + 1;
  }
  
  // move to next level
  if (score >= 5) {
    gameState = "L2";
  }
  
  // line to dog
  line(x, y, mouseX, mouseY);
  image(bird, x2-(birdSize/2), y2-(birdSize/2), birdSize, birdSize); 
  image(dog, x-(size/2), y-(size/2), size, size); 
  //cursor('baseball.png', 16, 16);
} // end level 1

// Level 2 - only rope, baseball cursor work
function levelTwo() {
  image(bg2, 0, 0, width, height);
  text("Level 2", width/2, height-20);
  
  var distTo = dist(x, y, mouseX, mouseY); // dist to dog
  if (distTo < size/2 && (item == 'Rope' || item == 'Baseball')) {
    x = random(width);
    y = random((1/2)*height, height);
    x2 = random(width);
    y2 = random(height);
    score = score + 1;
  }
  
  // move to next level
  if (score >= 15) {
    gameState = "L3";
  }
  
  image(bird, x2-(birdSize/2), y2-(birdSize/2), birdSize, birdSize); 
  image(dog, x-(size/2), y-(size/2), size, size); 
} // end level 2

function levelThree() { // only bacon works
  image(bg3, 0, 0, width, height);
  text("Level 3", width/2, height-20);
  
  var distTo = dist(x, y, mouseX, mouseY); // dist to dog
  if (distTo < size/2 && item == 'Bacon') {
    x = random(width);
    y = random((1/3)*height, height);
    x2 = random(width);
    y2 = random(height);
    score = score + 1;
    size = size - 5;
  }
  
  // end game
  if (score >= 30) {
    gameState = "end";
  }
  
  image(bird, x2-(birdSize/2), y2-(birdSize/2), birdSize, birdSize); 
  image(dog, x-(size/2), y-(size/2), size, size); 
} // end level 3

function end() {
  image(bg4, 0, 0, width, height);
  textSize(tSize*2); // increase text size
  fill(0); // black text
  text("Thanks for playing!", width/2, 100);
  size = 250; // increase dog size
  image(dog, (width/2)-(size/2), (height/2)-(size/2), size, size);
}
