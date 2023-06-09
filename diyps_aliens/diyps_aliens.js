var starsY, people, cow1, cow2, grass;
var initials ='ojmc';
var choice = '1'; // starting choice
var screenbg = 250; // off white background
var lastscreenshot=61; // last screenshot never taken

// Load images from github account
function preload() {
  starsY = loadImage('https://oliviajoyyy.github.io/images/p5js/stars-yellow.png');
  people = loadImage('https://oliviajoyyy.github.io/images/p5js/run.png');
  cow1 = loadImage('https://oliviajoyyy.github.io/images/p5js/cow1.png');
  cow2 = loadImage('https://oliviajoyyy.github.io/images/p5js/cow2.png');
  grass = loadImage('https://oliviajoyyy.github.io/images/p5js/grass-blades.png');
}

// Create canvas size and background
function setup() {
createCanvas(600, 600);
background(screenbg);
}

// Draw function
function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed){
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

// Key mapping to change drawing tools with each key pressed (toolChoice)
function newkeyChoice(toolChoice) {
 if (toolChoice == '1' ) {
    // Gradient for night sky
    strokeWeight(120);
    stroke(17, 2, 45);
    line(mouseX, mouseY-120, pmouseX, pmouseY-120);
    
    strokeWeight(120);
    stroke(27, 9, 67);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
    strokeWeight(120);
    stroke(63, 24, 87);
    line(mouseX, mouseY+120, pmouseX, pmouseY+120);
    
    stroke(20, 5, 58, 90);
    line(mouseX, mouseY-60, pmouseX, pmouseY-60);
    
    stroke(40, 15, 73, 90);
    line(mouseX, mouseY+60, pmouseX, pmouseY+60);
 }
 else if (toolChoice == '2') {
    // Ground
    noStroke();
    fill(26, 49, 18);
    rect(mouseX-25, mouseY-25, 50, 50);
 }
 else if (toolChoice == '3' ) {
    // Spotlights
    stroke(235, 211, 134, 50);
    strokeWeight(100);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  else if (toolChoice == '4') {
    // Space ship
    stroke(147, 245, 230, 50);
    strokeWeight(1);
    fill(147, 245, 230, 50);
    ellipse(mouseX, mouseY+5, 300, 110);
    stroke(0);
    strokeWeight(1);
    fill(0,0,random(255)); // random blue shades
    ellipse(mouseX, mouseY, 300, 100);
  }
  else if (toolChoice == '5') { 
    // Alien
    stroke(0);
    strokeWeight(1);
    alien(0, 255, 0); // green alien
  }
  else if (toolChoice == '6') {
    // Space ship cap
    stroke(0);
    strokeWeight(1);
    fill(150, 150, 150, 30);
    arc(mouseX, mouseY+45, 140, 170, PI, 0);
    arc(mouseX, mouseY+45, 140, 40, 0, PI);
  }
  else if (toolChoice == '7') {
    // Space ship lights
    stroke(0);
    strokeWeight(2);
    fill(245, 245, 147);
    ellipse(mouseX, mouseY, 10, 10);
  }
  else if (toolChoice == '8') {
    // Tree with trunk
    stroke(0);
    strokeWeight(1);
    // trunk
    fill(46, 28, 17);
    rect(mouseX-5, mouseY+25, 10, 15);
    // tree
    fill(7, 28, 11);
    triangle(mouseX, mouseY-25, mouseX-25, mouseY+30, mouseX+25, mouseY+30);
  }
  else if (toolChoice == '*') {
    // Tree without trunk - for making taller trees
    stroke(0);
    strokeWeight(1);
    // tree
    fill(7, 28, 11);
    triangle(mouseX, mouseY-25, mouseX-25, mouseY+30, mouseX+25, mouseY+30);
  }
  else if (toolChoice == '9') {
    // Moon
    noStroke();
    
    // when clicking to place moon, click a spot with the
    // color you want the inner part of the crescent to be
    var c = get(mouseX, mouseY);
    
    // crescent
    fill(161, 171, 191);
    ellipse(mouseX, mouseY, 50, 50);
    
    // fill the inner part of the moon with the color below the mouse
    fill(c);
    ellipse(mouseX-5, mouseY-5, 40, 40);
  } 
  else if (toolChoice == '0') {
    // Star
    noStroke();
    fill(252, 201, 65);
    quad(mouseX-4, mouseY-4, mouseX+1, mouseY-1, mouseX+4, mouseY+4, mouseX-1, mouseY+1);
    quad(mouseX+4, mouseY-4, mouseX-1, mouseY-1, mouseX-4, mouseY+4, mouseX+1, mouseY+1);
    fill(255, 255, 112);
    quad(mouseX, mouseY-12, mouseX-1, mouseY, mouseX, mouseY+12, mouseX+1, mouseY);
    quad(mouseX, mouseY-1, mouseX-8, mouseY, mouseX, mouseY+1, mouseX+8, mouseY);
    fill(255)
    circle(mouseX, mouseY, 2);
  }
  else if (toolChoice == 'y' || toolChoice == 'Y') {
    // yellow stars image
    image(starsY, mouseX-150, mouseY-150, 300, 300);
  }
  else if (toolChoice == 'r' || toolChoice == 'R') { 
    // people running silhouette
    image(people, mouseX-100, mouseY-45, 200, 90);
  }
  else if (toolChoice == 'c' || toolChoice == 'C') { 
    // a cow running
    image(cow1, mouseX-73, mouseY-50, 145, 100);
  }
  else if (toolChoice == 'v' || toolChoice == 'V') { 
    // a cow looking upward
    image(cow2, mouseX-60, mouseY-50, 140, 100);
  }
  else if (toolChoice == 'g' || toolChoice == 'G') { 
    // grass
    image(grass, mouseX-25, mouseY-25, 50, 50);
  }
}

// Draws the alien
function alien(r, g, b) {
  // Alien
  W = 50;
  H = W * (2/3);
  wEye = W/7;
  hEye = wEye * 2;
  // body
  fill(r, g-30, b);
  rect(mouseX-(W/4), mouseY+(W/2), W/2, W/1.5, 10, 10, 2, 2);
  rect(mouseX-(W/4)-5, mouseY+(W/2)+3, W/6, W/2, 4, 4, 2, 2); // left arm
  rect(mouseX+(W/4)-5, mouseY+(W/2)+3, W/6, W/2, 4, 4, 2, 2); // right arm
  circle(mouseX-(W/4)-1, mouseY+(W/2)+3+W/2, W/7);
  circle(mouseX+(W/4)-1, mouseY+(W/2)+3+W/2, W/7);
  // head
  fill(r, g, b);
  ellipse(mouseX, mouseY, W, W);
  beginShape();
  vertex(mouseX-(W/2.3), mouseY+(W/4)); // left point
  vertex(mouseX, mouseY+H);
  vertex(mouseX+(W/2.3), mouseY+(W/4)); // right point
  endShape();
  // eyes
  fill(0);
  ellipse(mouseX-(W/2.3)+10, mouseY+(W/4)-10, wEye, hEye);
  ellipse(mouseX+(W/2.3)-10, mouseY+(W/4)-10, wEye, hEye);
  // smile
  line(mouseX-6, mouseY+16, mouseX-4, mouseY+18);
  line(mouseX-4, mouseY+18, mouseX+4, mouseY+18);
  line(mouseX+4, mouseY+18, mouseX+6, mouseY+16);
}

// x clears the screen by resetting the background
// p calls saveme(), which saves a copy of the screen
function clear_print() {
  if (key == 'x' || key == 'X') {
    background(screenbg); // set  screen back to background color
    choice = '1'; // starting choice
  } else if (key == 'p' || key == 'P') {
     saveme();
  }
}

// Saves a screenshot of the canvas as a jpg 
function saveme(){
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) { // don't take a screenshot if you just took one
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second(); // set this to the current second so no more than one per second
}
