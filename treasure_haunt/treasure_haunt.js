/**
 * Treasure Haunt
 *
 * by Olivia Joy Cacdac
 */
 
// global variables
var canvasSize = 900;
var itemBar = 70;
var tSize; // text size
var x, y; // ghost coordinates
var wSize, hSize;  // ghost size
var wSpider, hSpider, spiderX, spiderY, spider2X, spider2Y, spider3X, spider3Y; // spider info
var score, itemsOutOf; // score out of x items
var strikes; // stikes of spider hits
var showScore; // true/false to show the score
var lvl; // level
var gameState, prevGameState; // game states
var ghost, ghost2, ghost3, spider, exterior, lvrm, bkrm, at, bedrm, green, door, check; // characters & backgrounds
var lantern, coins, bna; // lvrm items
var journal, map, gem; // bkrm items
var blanket, k; // bedrm items
var shield, compass, chest; // attic items
var potion, pumpkin, apple; // greenhouse items
var sword, crown, pearls, goblet, watch; // extra items
var lanT, cT, bnaT, jT, mapT, gemT, blT, kT, sT, compT, chT, poT, pumpT, aplT; // true/false to draw items
var swT, crnT, pT, gobT, wT; // true/false extra items
var startButton, restartButton; // buttons
var selChar; // character selection menu
var g1, g2, g3; // true/false for character selection

// Load images
function preload() { 
  // Characters
  ghost = loadImage('ghost.png');
  ghost2 = loadImage('ghost2.png');
  ghost3 = loadImage('ghost3.png');
  spider = loadImage('spider.png');
  
  // Backgrounds
  exterior = loadImage('house-exterior.jpg');
  lvrm = loadImage('living-room.jpg');
  bkrm = loadImage('book-room.jpg');
  green = loadImage('greenhouse.jpg');
  bedrm = loadImage('bedroom.jpg');
  at = loadImage('attic.jpg');  
  door = loadImage('door.jpg');
  
  // Items
  lantern = loadImage('lantern.png');
  coins = loadImage('coins.png');
  bna = loadImage('bow-arrow.png');
  map = loadImage('map.png');
  gem = loadImage('gem.png');
  journal = loadImage('journal.png');
  blanket = loadImage('blanket2.png');
  k = loadImage('key2.png');
  shield = loadImage('shield.png');
  compass = loadImage('compass.png');
  chest = loadImage('treasure-chest.png');
  pumpkin = loadImage('pumpkin2.png');
  potion = loadImage('potion.png');
  apple = loadImage('apple.png');
  sword = loadImage('sword.png');
  crown = loadImage('crown.png');
  pearls = loadImage('pearls.png');
  goblet = loadImage('goblet.png');
  watch = loadImage('pocket-watch.png');
  check = loadImage('check.png');
} // end preload

// Create canvas
function setup() {
  createCanvas(canvasSize, (3/5)*canvasSize+itemBar);
  resetAll();
} // end setup

// Reset all variables
function resetAll() {
  tSize = 22;
  textSize(tSize);
  itemsOutOf = 0;
  showScore = false; // don't show score on title screen
  strike = true;
  g1 = g2 = g3 = false;
  lvl = "0";
  wSize = 80;
  hSize = wSize*1.4;
  wSpider = 40;
  hSpider = wSpider*0.65;
  resetLvL();
  prevGameState = "none";
  gameState = "start";
} // end resetAll

// Reset level items, locations, score
function resetLvL() {
  lanT = cT = bnaT = jT = mapT = gemT = blT = kT = sT = compT = chT = poT = pumpT = aplT = true;
  swT = crnT = pT = gobT = wT = true;
  x = width/2;
  y = (height-itemBar)/2;
  spiderX = spider2X = spider3X = -hSize*2;
  spiderY = spider2Y = spider3Y = -hSize*2;
  score = 0;
  strikes = 0;
} // end resetLvL

// Game
function draw() {
  background(65, 57, 82);
  fill(240); // text color
  textAlign(CENTER); // center score and room label
  
  // Use W, A, S, D or the arrow keys to move
  if (keyIsDown(87)  || keyIsDown(UP_ARROW)) { // W
    y -= 5;
    if (y <= 0) {
      y = 0;
    }
  }
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A
    x -= 5;
    if (x <= 0) {
      x = 0;
    }
  }
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // S
    y += 5;
    if (y >= (height-itemBar)) {
      y = (height-itemBar);
    }
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D
    x += 5;
    if (x >= width) {
      x = width;
    }
  }

  // Start
  if (gameState == "start") {
    titleScreen();
  }
  
  // Rooms
  if (gameState == "lvrm") {
    livingroom();
  }
  else if (gameState == "bkrm") {
    bookroom();
  }
  else if (gameState == "green") {
    greenhouse(); 
  }
  else if (gameState == "bedrm") {
    bedroom();
  }
  else if (gameState == "attic") {
    attic();
  }
  
  // Level Objectives
  if (gameState == "lvl1Obj") {
    lvl = "Obj1";
    lvl1Obj();
  }
  else if (gameState == "lvl1Compl") {
    lvl = "Obj2";
    lvl2Obj();
  }
  else if (gameState == "lvl2Compl") {
    lvl = "Obj3";
    lvl3Obj();
  }
  else if (gameState == "lvl3Compl") {
    lvl = "Obj4";
    lvl4Obj();
  }
  else if (gameState == "lvl4Compl") {
    lvl = "Obj5";
    lvl5Obj();
  }
  
  // Score -> move to next level
  if (score >= 2 && lvl == "1") {
    gameState = "lvl1Compl";
  }
  else if (score >= 3 && lvl == "2") {
    gameState = "lvl2Compl";
  }
  else if (score >= 4 && lvl == "3") {
    gameState = "lvl3Compl";
  }
  else if (score >=5 && lvl == "4") {
    gameState = "lvl4Compl";
  }
  else if (score >= 5 && lvl == "5") {
    x = width/2; // set ghost position for win screen
    y = (height-itemBar)/3;
    lvl = "end";
    gameState = "win";
  }
  
  // Win or Lose
  if (gameState == "win") {
    win();
  }
  else if (gameState == "lose") {
    lose();
  }
  
  // Ghost character everywhere except Objective screens
  if (lvl != "Obj1" && lvl != "Obj2" && lvl != "Obj3" && lvl != "Obj4" && lvl != "Obj5") {
    if (g2) {
      image(ghost2, x-(wSize/2), y-(hSize/2), wSize, hSize);
    }
    else if (g3) {
      image(ghost3, x-(wSize/2), y-(hSize/2), wSize, hSize);
    }
    else {
      image(ghost, x-(wSize/2), y-(hSize/2), wSize, hSize);
    }
  }
  
  // Level 1
  if (lvl == "1") {
    // Checklist
    noFill();
    square((1/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((2/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    fill(240);
    textAlign(LEFT);
    textSize((3/4)*tSize);
    text("Gem", (1/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Coins", (2/6)*width, ((height-itemBar)+(itemBar/2)));
    textSize(tSize);
    textAlign(CENTER);
    if (!gemT) {
      image(check, (1/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!cT) {
      image(check, (2/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
  }
  
  // Level 2
  if (lvl == "2") {
    // Spiders on lvl 2 (one, slow)
    spiderX = spiderX + random(2);
    spiderY = spiderY + random(2);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= (height-itemBar)) {
      spiderX = random(2, width-2);
      spiderY = 2;
    }
    
    // Checklist
    noFill();
    square((1/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((2/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((3/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    fill(240);
    textAlign(LEFT);
    textSize((3/4)*tSize);
    text("Blanket", (1/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Pumpkin", (2/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Shield", (3/6)*width, ((height-itemBar)+(itemBar/2)));
    textSize(tSize);
    textAlign(CENTER);
    if (!blT) {
      image(check, (1/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!pumpT) {
      image(check, (2/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!sT) {
      image(check, (3/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
  }
  
  // Level 3
  if (lvl == "3") {
    // Spiders on lvl 3 (two, a bit faster)
    spiderX = spiderX + random(3);
    spiderY = spiderY + random(3);
    spider2X = spider2X - random(3);
    spider2Y = spider2Y + random(3);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    image(spider, spider2X, spider2Y, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= (height-itemBar)) {
      spiderX = random(2, width-2);
      spiderY = 2; // or random(2, (height-itemBar)-2);
    }
    if (spider2X <= 0 || spider2X >= width || spider2Y <= 0 || spider2Y >= (height-itemBar)) {
      spider2X = random(2, width-2);
      spider2Y = 2;
    }
    
    // Checklist
    noFill();
    square((1/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((2/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((3/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((4/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    fill(240);
    textAlign(LEFT);
    textSize((3/4)*tSize);
    text("Lantern", (1/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Compass", (2/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Map", (3/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Apple", (4/6)*width, ((height-itemBar)+(itemBar/2)));
    textSize(tSize);
    textAlign(CENTER);
    if (!lanT) {
      image(check, (1/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!compT) {
      image(check, (2/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!mapT) {
      image(check, (3/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!aplT) {
      image(check, (4/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
  }
  
  
  // Level 4
  if (lvl == "4") {
    // Spiders on lvl 4 (two, fast)
    spiderX = spiderX + random(4);
    spiderY = spiderY + random(4);
    spider2X = spider2X - random(4);
    spider2Y = spider2Y + random(4);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    image(spider, spider2X, spider2Y, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= (height-itemBar)) {
      spiderX = random(2, width-2);
      spiderY = 2; //random(2, (height-itemBar)-2);
    }
    if (spider2X <= 0 || spider2X >= width || spider2Y <= 0 || spider2Y >= (height-itemBar)) {
      spider2X = random(2, width-2);
      spider2Y = 2;
    }
    
    // Checklist
    noFill();
    square((1/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((2/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((3/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((4/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((5/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    fill(240);
    textAlign(LEFT);
    textSize((3/4)*tSize);
    text("Key", (1/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Potion", (2/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Journal", (3/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Chest", (4/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Bow & Arrow", (5/6)*width, ((height-itemBar)+(itemBar/2)));
    textSize(tSize);
    textAlign(CENTER);
    if (!kT) {
      image(check, (1/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!poT) {
      image(check, (2/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!jT) {
      image(check, (3/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!chT) {
      image(check, (4/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!bnaT) {
      image(check, (5/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
  }
  
  // Level 5
  if (lvl == "5") {
    // Spiders lvl 5 (three, fast)
    spiderX = spiderX + random(4);
    spiderY = spiderY + random(4);
    spider2X = spider2X - random(4);
    spider2Y = spider2Y + random(4);
    spider3X = spider3X + random(4);
    spider3Y = spider3Y + random(4);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    image(spider, spider2X, spider2Y, wSpider, hSpider);
    image(spider, spider3X, spider3Y, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= (height-itemBar)) {
      spiderX = random(2, width-2);
      spiderY = 2; //random(2, (height-itemBar)-2);
    }
    if (spider2X <= 0 || spider2X >= width || spider2Y <= 0 || spider2Y >= (height-itemBar)) {
      spider2X = random(2, width-2);
      spider2Y = 2;
    }
    if (spider3X <= 0 || spider3X >= width || spider3Y <= 0 || spider3Y >= (height-itemBar)) {
      spider3X = random(2, width-2);
      spider3Y = 2;
    }
    
    // Checklist
    noFill();
    square((1/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((2/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((3/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((4/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    square((5/6)*width-30, ((height-itemBar)+(itemBar/2))-15, 20);
    fill(240);
    textAlign(LEFT);
    textSize((3/4)*tSize);
    text("Goblet", (1/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Pearls", (2/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Sword", (3/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Crown", (4/6)*width, ((height-itemBar)+(itemBar/2)));
    text("Pocket Watch", (5/6)*width, ((height-itemBar)+(itemBar/2)));
    textSize(tSize);
    textAlign(CENTER);
    if (!gobT) {
      image(check, (1/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!pT) {
      image(check, (2/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!swT) {
      image(check, (3/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!crnT) {
      image(check, (4/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
    if (!wT) {
      image(check, (5/6)*width-30, ((height-itemBar)+(itemBar/2))-20, 20, 20);
    }
  }
  
  // Lose if spider touches you
  distToSp1 = dist(spiderX+(wSpider/2), spiderY+(hSpider), x, y);
  distToSp2 = dist(spider2X+(hSpider), spider2Y+(hSpider), x, y);
  distToSp3 = dist(spider3X+(hSpider), spider3Y+(hSpider), x, y);
  if (distToSp1 < ((2/3)*wSize) || distToSp2 < ((2/3)*wSize) || distToSp3 < ((2/3)*wSize)) {
    strikes = strikes + 1;
    spiderX = random(2, width-2);
    spider2X = random(2, width-2);
    spider3X = random(2, width-2);
    spiderY = spider2Y = spider3Y = 2;
    if (strikes >= 3) {
      spiderX = spiderY = spider2X = spider2Y = spider3X = spider3Y = -hSize*2;
      x = width/2; // set ghost position for lose screen
      y = (height-itemBar)/3;
      lvl = "end";
      gameState = "lose";
    }
  }
  
  // Show level number & strikes
  fill(240); // text color
  if (showScore) {
    textSize((2/3)*tSize);
    text(("Level " + lvl), width/2, 60);
    if (lvl != "1") {
      text(("Strikes: " + strikes + "/3"), width/2, 80);
    }
    textSize(tSize);
  }
} // end draw

// Level 1 Objective
function lvl1Obj() {
  image(door, 0, 0, width, (height-itemBar));
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, (height-itemBar)/10, width/3, (3/4)*(height-itemBar));
  fill(240); // text color
  text("Level 1", width/2, (height-itemBar)/6);
  textAlign(LEFT);
  text("Retrieve 2 items:\n - Coins\n - Gem", width/3+20, (height-itemBar)/4);
  prevGameState = "lvl1Obj";
  textAlign(CENTER);
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.style('font-size', '16px');
    startButton.position(width/2-(startButton.width/2), (height-itemBar)-(height-itemBar)/4);
    startButton.mousePressed(startGame);
  }
} // end lvl1Obj

// Level 2 Objective
function lvl2Obj() {
  image(door, 0, 0, width, (height-itemBar));
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, (height-itemBar)/10, width/3, (3/4)*(height-itemBar));
  fill(240); // text color
  text("Level 2", width/2, (height-itemBar)/6);
  textAlign(LEFT);
  text("Retrieve 3 items:\n - Blanket\n - Pumpkin\n - Shield\n\nAvoid the spider.", width/3+20, (height-itemBar)/4);
  prevGameState = "lvl2Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.style('font-size', '16px');
    startButton.position(width/2-(startButton.width/2), (height-itemBar)-(height-itemBar)/4);
    startButton.mousePressed(startGame);
  }
} // end lvl2Obj

// Level 3 Objective
function lvl3Obj() {
  image(door, 0, 0, width, (height-itemBar));
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, (height-itemBar)/10, width/3, (3/4)*(height-itemBar));
  fill(240); // text color
  text("Level 3", width/2, (height-itemBar)/6);
  textAlign(LEFT);
  text("Retrieve 4 items:\n - Lantern\n - Compass\n - Map\n - Apple\n\nAvoid the spiders.", width/3+20, (height-itemBar)/4);
  prevGameState = "lvl3Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.style('font-size', '16px');
    startButton.position(width/2-(startButton.width/2), (height-itemBar)-(height-itemBar)/4);
    startButton.mousePressed(startGame);
  }
} // end lvl3Obj

// Level 4 Objective
function lvl4Obj() {
  image(door, 0, 0, width, (height-itemBar));
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, (height-itemBar)/10, width/3, (3/4)*(height-itemBar));
  fill(240); // text color
  text("Level 4", width/2, (height-itemBar)/6);
  textAlign(LEFT);
  text("Retrieve 5 items:\n - Key\n - Potion\n - Journal\n - Treasure Chest\n - Bow & Arrow\n\nAvoid the spiders.\n  They're faster now.", width/3+20, (height-itemBar)/4);
  prevGameState = "lvl4Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.style('font-size', '16px');
    startButton.position(width/2-(startButton.width/2), (height-itemBar)-(height-itemBar)/4);
    startButton.mousePressed(startGame);
  }
} // end lvl4Obj

// Level 5 Objective
function lvl5Obj() {
  image(door, 0, 0, width, (height-itemBar));
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, (height-itemBar)/10, width/3, (3/4)*(height-itemBar));
  fill(240); // text color
  text("Level 5", width/2, (height-itemBar)/6);
  textAlign(LEFT);
  text("Retrieve 5 items:\n - Goblet\n - Pearls\n - Sword\n - Crown\n - Pocket Watch\n\nAvoid the spiders.\n  There's three.", width/3+20, (height-itemBar)/4);
  prevGameState = "lvl5Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.style('font-size', '16px');
    startButton.position(width/2-(startButton.width/2), (height-itemBar)-(height-itemBar)/4);
    startButton.mousePressed(startGame);
  }
} // end lvl5Obj

// Title screen
function titleScreen() {
  image(exterior, 0, 0, width, (height-itemBar));
  textSize(tSize*2.2);
  text("Treasure Haunt", width/2, 50);
  textSize(tSize);
  text("Choose Your Ghost", width-width/6, (height-itemBar)/6);
  
  x = width-width/8;
  y = (height-itemBar)/3-10;
  
  // Character options
  if (!selChar) {
    selChar = createSelect();
    selChar.position(width-width/4, (height-itemBar)/5);
    selChar.option('Ghost 1');
    selChar.option('Ghost 2');
    selChar.option('Ghost 3');
    selChar.selected('Ghost 1');
    selChar.changed(selectGhost);
  }
  
  if (!startButton) {
    startButton = createButton('Play');
    startButton.style('font-size', '20px');
    startButton.position(width/2-(startButton.width/2), height-((3/4)*itemBar));
    startButton.mousePressed(startGame);
  }
} // end titleScreen

// Character selection
function selectGhost() {
    character = selChar.value();
    if (character == 'Ghost 1') {
      g1 = true;
      g2 = g3 = false;
    }
    else if (character == 'Ghost 2') {
      g2 = true;
      g1 = g3 = false;
    }
    else if (character == 'Ghost 3') {
      g3 = true;
      g1 = g2 = false;
    }
} // end selectGhost

// Start game, remove buttons
function startGame() {
  startButton.remove();
  startButton = undefined;
  if (restartButton) {
    restartButton.remove();
    restartButton = undefined;
  }
  if (selChar) {
    selChar.remove();
    selChar = undefined;
  }
  showScore = true;
  resetLvL();
  if (prevGameState == "lvl1Obj") {
    lvl = "1";
    itemsOutOf = 2;
    gameState = "lvrm";
  }
  else if (prevGameState == "lvl2Obj") {
    lvl = "2";
    itemsOutOf = 3;
    gameState = "lvrm";
  }
  else if (prevGameState == "lvl3Obj") {
    lvl = "3";
    itemsOutOf = 4;
    gameState = "lvrm";
  }
  else if (prevGameState == "lvl4Obj") {
    lvl = "4";
    itemsOutOf = 5;
    gameState = "lvrm";
  }
  else if (prevGameState == "lvl5Obj") {
    lvl = "5";
    itemsOutOf = 5;
    gameState = "lvrm";
  }
  else {
    gameState = "lvl1Obj";
  }
} // end startGame

// Restart game from beginning
function restartGame() {
  restartButton.remove();
  restartButton = undefined;
  if (startButton) {
    startButton.remove();
    startButton = undefined;
  }
  resetAll();
} // end restartGame

// Living Room
function livingroom() {
  image(lvrm, 0, 0, width, (height-itemBar));
  text("Living Room", width/2, 40);
  
  var lanternX = width-width/3;
  var lanternY = (height-itemBar)-(height-itemBar)/3-10;
  if (lanT) {
    image(lantern, lanternX, lanternY, 30, 50);
  }
  if (dist(lanternX+15, lanternY+25, x, y) < wSize/2 && lanT && lvl == "3") {
    score = score + 1;
    lanT = false;
  }
  
  var coinsX = width-width/5;
  var coinsY = (height-itemBar)-(height-itemBar)/4.5;
  if (cT) {
    image(coins, coinsX, coinsY, 50, 30);
  }
  if (dist(coinsX+25, coinsY+15, x, y) < wSize/2 && cT && lvl == "1") {
    score = score + 1;
    cT = false;
  }
  
  var bnaX = width/4+10; // bow & arrow
  var bnaY = (height-itemBar)-(height-itemBar)/2.8;
  if (bnaT) {
    image(bna, bnaX, bnaY, 80, 80);
  }
  if (dist(bnaX+40, bnaY+40, x, y) < wSize/2 && bnaT && lvl == "4") {
    score = score + 1;
    bnaT = false;
  }
  
  var wX = width/11;
  var wY = (9/10)*(height-itemBar);
  if (wT && lvl == "5") {
    image(watch, wX, wY, 40, 35);
  }
  if (dist(wX+20, wY+17, x, y) < wSize/2 && wT && lvl == "5") {
    score = score + 1;
    wT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var greenX = width/11;
  var greenY = (height-itemBar)/2 + 15;
  square(greenX, greenY, 10);
  
  var distToG = dist(greenX, greenY, x, y);
  if (distToG < wSize/2) {
    x = width/4;
    y = (height-itemBar)/2;
    gameState = "green"; // greenhouse
  }
  
  var bkrmX = width/2 - 55;
  var bkrmY = (height-itemBar)/2 + 80;
  square(bkrmX, bkrmY, 10);
  
  var distToBookrm = dist(bkrmX, bkrmY, x, y);
  if (distToBookrm < hSize/2) {
    x = wSize + 20;
    y = (height-itemBar)/2 + 20;
    gameState = "bkrm"; // book room
  }
  
  var bedrmX = width-width/3 + 10;
  var bedrmY = 30;
  square(bedrmX, bedrmY, 10);
  
  var distToBedrm = dist(bedrmX, bedrmY, x, y);
  if (distToBedrm < hSize/2) {
    x = width-width/4;
    y = (height-itemBar) - 90;
    gameState = "bedrm"; // upstairs
  }
} // end livingroom

// Book Room
function bookroom() {
  image(bkrm, 0, 0, width, (height-itemBar));
  text("Book Room", width/2, 40);
  
  var mapX = width/3;
  var mapY = (height-itemBar)/4 + 10;
  if (mapT) {
    image(map, mapX, mapY, 50, 50);
  }
  if (dist(mapX+25, mapY+25, x, y) < wSize/2 && mapT && lvl == "3") {
    score = score + 1;
    mapT = false;
  }
  
  var gemX = width/4.4;
  var gemY = (height-itemBar)-(height-itemBar)/3.5;
  if (gemT) {
    image(gem, gemX, gemY, 25, 25);
  }
  if (dist(gemX+12, gemY+12, x, y) < wSize/2 && gemT && lvl == "1") {
    score = score + 1;
    gemT = false;
  }
  
  var journalX = width-width/2.3;
  var journalY = (height-itemBar)-(height-itemBar)/3.7;
  if (jT) {
    image(journal, journalX, journalY, 50, 50);
  }
  if (dist(journalX+25, journalY+25, x, y) < wSize/2 && jT && lvl == "4") {
    score = score + 1;
    jT = false;
  }
  
  var swordX = width-110;
  var swordY = (1/3)*(height-itemBar);
  if (swT && lvl == "5") {
    image(sword, swordX, swordY, 70, 120);
  }
  if (dist(swordX+35, swordY+60, x, y) < wSize/2 && swT && lvl == "5") {
    score = score + 1;
    swT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = 10;
  var lvrmY = (height-itemBar)/2;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < wSize/2) {
    x = width/2 - 55;
    y = (height-itemBar)/2 - 40;
    gameState = "lvrm";
  }
} // end level 2

// Greenhouse
function greenhouse() {
  image(green, 0, 0, width, (height-itemBar));
  text("Greenhouse", width/2, 40);
  
  var pumpkinX = width-width/6;
  var pumpkinY = (height-itemBar)-(height-itemBar)/4;
  if (pumpT) {
    image(pumpkin, pumpkinX, pumpkinY, 110, 100);
  }
  if (dist(pumpkinX+55, pumpkinY+50, x, y) < wSize/2 && pumpT && lvl == "2") {
    score = score + 1;
    pumpT = false;
  }
  
  var potionX = width-width/2.3;
  var potionY = (height-itemBar)-(height-itemBar)/2.1-3;
  if (poT) {
    image(potion, potionX, potionY, 45, 45);
  }
  if (dist(potionX+22, potionY+22, x, y) < wSize/2 && poT && lvl == "4") {
    score = score + 1;
    poT = false;
  }
  
  var aplX = width/3;
  var aplY = (height-itemBar)-(height-itemBar)/7;
  if (aplT) {
    image(apple, aplX, aplY, 35, 35);
  }
  if (dist(aplX, aplY, x, y) < wSize/2 && aplT && lvl == "3") {
    score = score + 1;
    aplT = false;
  }
  
  var gobX = width-width/5-10;
  var gobY = (2/3)*(height-itemBar)-18;
  if (gobT && lvl == "5") {
    image(goblet, gobX, gobY, 45, 55);
  }
  if (dist(gobX+22, gobY+28, x, y) < wSize/2 && gobT && lvl == "5") {
    score = score + 1;
    gobT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = width/6;
  var lvrmY = (height-itemBar)-(height-itemBar)/2.3;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < wSize/2) {
    x = width/3;
    y = (height-itemBar)/2;
    gameState = "lvrm";
  }
} // end bookroom

// Bedroom, upstairs
function bedroom() {
  image(bedrm, 0, 0, width, (height-itemBar));
  text("Bedroom", width/2, 40);
  
  var blanketX = width/4.5;
  var blanketY = (height-itemBar)-(height-itemBar)/2.3;
  if (blT) {
    image(blanket, blanketX, blanketY, 100, 210);
  }
  if (dist(blanketX+50, blanketY+105, x, y) < wSize/2 && blT && lvl == "2") {
    score = score + 1;
    blT = false;
  }
  
  var kX = width-width/2.7; // key
  var kY = (height-itemBar)/2+8;
  if (kT) {
    image(k, kX, kY, 30, 40);
  }
  if (dist(kX+15, kY+20, x, y) < wSize/2 && kT && lvl == "4") {
    score = score + 1;
    kT = false;
  }
  
  var pearlX = width-width/6;
  var pearlY = (5/6)*(height-itemBar);
  if (pT && lvl == "5") {
    image(pearls, pearlX, pearlY, 50, 35);
  }
  if (dist(pearlX+25, pearlY+18, x, y) < wSize/2 && pT && lvl == "5") {
    score = score + 1;
    pT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = width-width/3;
  var lvrmY = (height-itemBar) - 20;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < hSize/2) {
    x = width-width/3 + 40;
    y = 100;
    gameState = "lvrm";
  }
  
  var atticX = width/7;
  var atticY = (height-itemBar)/8;
  square(atticX, atticY, 10);
  
  var distToAttic = dist(atticX, atticY, x, y);
  if (distToAttic < hSize/2) {
    x = width/2;
    y = (height-itemBar)-(height-itemBar)/4;
    gameState = "attic";
  }
} // end bedroom

// Attic
function attic() {
  image(at, 0, 0, width, (height-itemBar));
  text("Attic", width/2, (height-itemBar)-10);
  text("Attic", width/2, 40);
  
  var chestX = width/5 + 5;
  var chestY = (height-itemBar)-(height-itemBar)/4;
  if (chT) {
    image(chest, chestX, chestY, 110, 90);
  }
  if (dist(chestX+55, chestY+45, x, y) < wSize/2 && chT && lvl == "4") {
    score = score + 1;
    chT = false;
  }
  
  var shieldX = width-width/5;
  var shieldY = (height-itemBar)-(height-itemBar)/3.9;
  if (sT) {
    image(shield, shieldX, shieldY, 110, 90);
  }
  if (dist(shieldX+55, shieldY+45, x, y) < wSize/2 && sT && lvl == "2") {
    score = score + 1;
    sT = false;
  }
  
  var compassX = width-width/4;
  var compassY = (height-itemBar)/2+15;
  if (compT) {
    image(compass, compassX, compassY, 30, 30);
  }
  if (dist(compassX+15, compassY+15, x, y) < wSize/2 && compT && lvl == "3") {
    score = score + 1;
    compT = false;
  }
  
  var crnX = width/14;
  var crnY = (1/2)*(height-itemBar)-27;
  if (crnT && lvl == "5") {
    image(crown, crnX, crnY, 70, 60);
  }
  if (dist(crnX+35, crnY+30, x, y) < wSize/2 && crnT && lvl == "5") {
    score = score + 1;
    crnT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var bedrmX = width/2;
  var bedrmY = (height-itemBar) - (height-itemBar)/10;
  square(bedrmX, bedrmY, 10);
  
  var distToBedrm = dist(bedrmX, bedrmY, x, y);
  if (distToBedrm < hSize/2) {
    x = width/4;
    y = (height-itemBar)/5;
    gameState = "bedrm";
  }
} // end attic

// Win game
function win() {
  fill(240);
  textSize(tSize*2);
  showScore = false;
  text("You Won!", width/2, 50);
  textSize(tSize);
  text(("Thanks for playing!"), width/2, 90);
  strikes = 0;
  
  if (!restartButton) {
    restartButton = createButton('Replay Game');
    restartButton.style('font-size', '20px');
    restartButton.position(width/2-(restartButton.width/2+10), (height-itemBar)/2 + 40);
    restartButton.mousePressed(restartGame);
  }
} // end win

// Lose game, retry options
function lose() {
  showScore = false;
  textSize(tSize*2);
  fill(240);
  text("Try Again", width/2, 50);
  textSize(tSize);
  text(("Strikes: " + strikes + "/3"), width/2, 90);
  
  if (!startButton) {
    startButton = createButton('Retry Level');
    startButton.style('font-size', '20px');
    startButton.position(width/2-(startButton.width/2+10), (height-itemBar)/2);
    startButton.mousePressed(startGame);
  }
  
  if (!restartButton) {
    restartButton = createButton('Restart Game');
    restartButton.style('font-size', '20px');
    restartButton.position(width/2-(restartButton.width/2+10), (height-itemBar)/2 + startButton.height + 30);
    restartButton.mousePressed(restartGame);
  }
} // end lose
