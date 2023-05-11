// global variables
var canvasSize = 870;
var tSize; // text size
var x, y; // ghost coordinates
var x2, y2, x3, y3; // other ghost cordinates
var wSpider, hSpider, spiderX, spiderY, spider2X, spider2Y;
var wSize, hSize;  // ghost size
var score, itemsOutOf; // score out of x items
var strikes; // stikes of spider hits
var strike; // T/F to control strikes
var showScore; // true/fase to show the score
var lvl; // level
var gameState, prevGameState; // game states
var ghost, ghost2, ghost3, spider, exterior, lvrm, bkrm, at, bedrm, green, door; // characters & backgrounds
var lantern, coins, bna; // lvrm items
var journal, map, gem; // bkrm items
var blanket, k; // bedrm items
var shield, compass, chest; // attic items
var potion, pumpkin, apple; // greenhouse items
var startButton, restartButton; // buttons
var lanT, cT, bnaT, jT, mapT, gemT, blT, kT, sT, compT, chT, poT, pumpT, aplT; // true/false to draw items
var g1, g2, g3;
g1 = g2 = g3 = false;

function preload() { 
  // Characters
  ghost = loadImage('ghost.png');
  //ghost2 = loadImage('ghost2.png');
  //ghost3 = loadImage('ghost3.png');
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
}

function setup() {
  createCanvas(canvasSize, (3/5)*canvasSize);
  resetAll();
} // end setup

function resetAll() {
  tSize = 20;
  textSize(tSize);
  itemsOutOf = 0;
  showScore = false; // don't show score on title screen
  strike = true;
  lvl = "0";
  wSize = 80;
  hSize = wSize*1.4;
  wSpider = 40;
  hSpider = wSpider*0.65;
  resetLvL();
  prevGameState = "none";
  gameState = "start";
}

function resetLvL() {
  lanT = cT = bnaT = jT = mapT = gemT = blT = kT = sT = compT = chT = poT = pumpT = aplT = true;
  x = width/2;
  y = height/2;
  spiderX = spider2X = -hSize*2;
  spiderY = spider2Y = -hSize*2;
  score = 0;
  strikes = 0;
}

function draw() {
  background(220);
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
    if (y >= height) {
      y = height;
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
  
  // Score - move to next level
  if (score >= 2 && lvl == "1") {
    //resetLvL();
    gameState = "lvl1Compl";
  }
  else if (score >= 3 && lvl == "2") {
    //resetLvL();
    gameState = "lvl2Compl";
  }
  else if (score >= 4 && lvl == "3") {
    //resetLvL();
    gameState = "lvl3Compl";
  }
  else if (score >= 5 && lvl == "4") {
    x = width/2; // set ghost position for lose screen
    y = height/3;
    lvl = "end";
    gameState = "win";
  }
  
  // Win
  if (gameState == "win") {
    resetLvL();
    win();
  }
  else if (gameState == "lose") {
    lose();
  }

  //clear();
  // Ghost character everywhere except Objective screens
  if (lvl != "Obj1" && lvl != "Obj2" && lvl != "Obj3" && lvl != "Obj4") {
    image(ghost, x-(wSize/2), y-(hSize/2), wSize, hSize);
  }
  
  // Spider on lvl 2 - one, slow
  if (lvl == "2") {
    spiderX = spiderX + random(2);
    spiderY = spiderY + random(2);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= height) {
      spiderX = random(2, width-2);
      spiderY = 2;
    }
  }
  
  // Spider on lvl 3 - two, slow
  if (lvl == "3") {
    spiderX = spiderX + random(3);
    spiderY = spiderY + random(3);
    spider2X = spider2X - random(3);
    spider2Y = spider2Y + random(3);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    image(spider, spider2X, spider2Y, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= height) {
      spiderX = random(2, width-2);
      spiderY = 2; // or random(2, height-2);
    }
    if (spider2X <= 0 || spider2X >= width || spider2Y <= 0 || spider2Y >= height) {
      spider2X = random(2, width-2);
      spider2Y = 2;
    }
  }
  
  // Spider on lvl 4 - two, fast
  if (lvl == "4") {
    spiderX = spiderX + random(4);
    spiderY = spiderY + random(4);
    spider2X = spider2X - random(4);
    spider2Y = spider2Y + random(4);
    image(spider, spiderX, spiderY, wSpider, hSpider);
    image(spider, spider2X, spider2Y, wSpider, hSpider);
    if (spiderX <= 0 || spiderX >= width || spiderY <= 0 || spiderY >= height) {
      spiderX = random(2, width-2);
      spiderY = 2; //random(2, height-2);
    }
    if (spider2X <= 0 || spider2X >= width || spider2Y <= 0 || spider2Y >= height) {
      spider2X = random(2, width-2);
      spider2Y = 2;
    }
  }
  
  // Lose if spider touches you
  distToSp1 = dist(spiderX+(wSpider/2), spiderY+(hSpider), x, y);
  distToSp2 = dist(spider2X+(hSpider), spider2Y+(hSpider), x, y);
  if (distToSp1 < ((2/3)*wSize) || distToSp2 < ((2/3)*wSize)) {
    strikes = strikes + 1;
    spiderX = random(2, width-2);
    spider2X = random(2, width-2);
    spiderY = spider2Y = 2;
    if (strikes >= 3) {
      spiderX = spiderY = spider2X = spider2Y = -hSize*2;
      x = width/2; // set ghost position for lose screen
      y = height/3;
      lvl = "end";
      gameState = "lose";
    }
  }
  
  // Show score
  fill(240); // text color
  if (showScore) {
    text(("Items: " + score + "/" + itemsOutOf), width/2, 40);
    textSize((2/3)*tSize);
    text(("Lv " + lvl), width/2, 60);
    if (lvl != "1") {
      text(("Strikes: " + strikes + "/3"), width/2, 80);
    }
    textSize(tSize);
  }
} // end draw

function lvl1Obj() {
  image(door, 0, 0, width, height);
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, height/10, width/3, (3/4)*height);
  fill(240); // text color
  text("Level 1", width/2, height/6);
  textAlign(LEFT);
  text("Retrieve 2 items:\n- Coins\n- Gem", width/3+20, height/4);
  prevGameState = "lvl1Obj";
  textAlign(CENTER);
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.position(width/2-(startButton.width/2), height-height/4);
    startButton.mousePressed(startGame);
  }
}

function lvl2Obj() {
  image(door, 0, 0, width, height);
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, height/10, width/3, (3/4)*height);
  fill(240); // text color
  text("Level 2", width/2, height/6);
  textAlign(LEFT);
  text("Retrieve 3 items:\n- Blanket\n- Pumpkin\n- Shield\n\nAvoid the spider.", width/3+20, height/4);
  prevGameState = "lvl2Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.position(width/2-(startButton.width/2), height-height/4);
    startButton.mousePressed(startGame);
  }
}

function lvl3Obj() {
  image(door, 0, 0, width, height);
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, height/10, width/3, (3/4)*height);
  fill(240); // text color
  text("Level 3", width/2, height/6);
  textAlign(LEFT);
  text("Retrieve 4 items:\n- Lantern\n- Compass\n- Map\n- Apple\n\nAvoid the spiders.", width/3+20, height/4);
  prevGameState = "lvl3Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.position(width/2-(startButton.width/2), height-height/4);
    startButton.mousePressed(startGame);
  }
}

function lvl4Obj() {
  image(door, 0, 0, width, height);
  showScore = false;
  fill(65, 57, 82, 200); // square bkdg
  rect(width/3, height/10, width/3, (3/4)*height);
  fill(240); // text color
  text("Level 4", width/2, height/6);
  textAlign(LEFT);
  text("Retrieve 5 items:\n- Bow & Arrow\n- Key\n- Journal\n- Treasure Chest\n- Potion\n\nAvoid the spiders.\n  They're faster now.", width/3+20, height/4);
  prevGameState = "lvl4Obj";
  if (!startButton) {
    startButton = createButton('Begin');
    startButton.position(width/2-(startButton.width/2), height-height/4);
    startButton.mousePressed(startGame);
  }
}

function titleScreen() {
  image(exterior, 0, 0, width, height);
  
  if (!startButton) {
    startButton = createButton('Play');
    startButton.position(width/2+10, height-height/3);
    startButton.mousePressed(startGame);
  }
}

function startGame() {
  startButton.remove();
  startButton = undefined;
  if (restartButton) {
    restartButton.remove();
    restartButton = undefined;
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
  else {
    gameState = "lvl1Obj";
  }
}

function restartGame() {
  restartButton.remove();
  restartButton = undefined;
  startButton.remove();
  startButton = undefined;
  resetAll();
}

function livingroom() {
  image(lvrm, 0, 0, width, height);
  text("Living Room", width/2, height-20); // text to display, where to put it coords
  
  var lanternX = width-width/3;
  var lanternY = height-height/3-10;
  if (lanT) {
    image(lantern, lanternX, lanternY, 30, 50);
  }
  if (dist(lanternX+15, lanternY+25, x, y) < wSize/2 && lanT && lvl == "3") {
    score = score + 1;
    lanT = false;
  }
  
  var coinsX = width-width/5;
  var coinsY = height-height/4.5;
  if (cT) {
    image(coins, coinsX, coinsY, 50, 30);
  }
  if (dist(coinsX+25, coinsY+15, x, y) < wSize/2 && cT && lvl == "1") {
    score = score + 1;
    cT = false;
  }
  
  var bnaX = width/4+10;
  var bnaY = height-height/2.8;
  if (bnaT) {
    image(bna, bnaX, bnaY, 80, 80);
  }
  if (dist(bnaX+40, bnaY+40, x, y) < wSize/2 && bnaT && lvl == "4") {
    score = score + 1;
    bnaT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var greenX = width/11;
  var greenY = height/2 + 15;
  square(greenX, greenY, 10);
  
  var distToG = dist(greenX, greenY, x, y);
  if (distToG < wSize/2) {
    x = width/4;
    y = height/2;
    gameState = "green"; // greenhouse
  }
  
  var bkrmX = width/2 - 55;
  var bkrmY = height/2 + 80;
  square(bkrmX, bkrmY, 10);
  
  var distToBookrm = dist(bkrmX, bkrmY, x, y);
  if (distToBookrm < hSize/2) {
    x = wSize + 20;
    y = height/2 + 20;
    gameState = "bkrm"; // book room
  }
  
  var bedrmX = width-width/3 + 10;
  var bedrmY = 30;
  square(bedrmX, bedrmY, 10);
  
  var distToBedrm = dist(bedrmX, bedrmY, x, y);
  if (distToBedrm < hSize/2) {
    x = width-width/4;
    y = height - 90;
    gameState = "bedrm"; // upstairs
  }
} // end level 1

function bookroom() {
  image(bkrm, 0, 0, width, height);
  text("Book Room", width/2, height-20);
  
  var mapX = width/3;
  var mapY = height/4 + 10;
  if (mapT) {
    image(map, mapX, mapY, 50, 50);
  }
  if (dist(mapX+25, mapY+25, x, y) < wSize/2 && mapT && lvl == "3") {
    score = score + 1;
    mapT = false;
  }
  
  var gemX = width/4.4;
  var gemY = height-height/3.5;
  if (gemT) {
    image(gem, gemX, gemY, 25, 25);
  }
  if (dist(gemX+12, gemY+12, x, y) < wSize/2 && gemT && lvl == "1") {
    score = score + 1;
    gemT = false;
  }
  
  var journalX = width-width/2.3;
  var journalY = height-height/3.7;
  if (jT) {
    image(journal, journalX, journalY, 50, 50);
  }
  if (dist(journalX+25, journalY+25, x, y) < wSize/2 && jT && lvl == "4") {
    score = score + 1;
    jT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = 10;
  var lvrmY = height/2;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < wSize/2) {
    x = width/2 - 55;
    y = height/2 - 40;
    gameState = "lvrm";
  }
} // end level 2

function greenhouse() {
  image(green, 0, 0, width, height);
  text("Greenhouse", width/2, height-20);
  
  var pumpkinX = width-width/6;
  var pumpkinY = height-height/4;
  if (pumpT) {
    image(pumpkin, pumpkinX, pumpkinY, 110, 100);
  }
  if (dist(pumpkinX+55, pumpkinY+50, x, y) < wSize/2 && pumpT && lvl == "2") {
    score = score + 1;
    pumpT = false;
  }
  
  var potionX = width-width/2.3;
  var potionY = height-height/2.1-3;
  if (poT) {
    image(potion, potionX, potionY, 45, 45);
  }
  if (dist(potionX+22, potionY+22, x, y) < wSize/2 && poT && lvl == "4") {
    score = score + 1;
    poT = false;
  }
  
  var aplX = width/3;
  var aplY = height-height/7;
  if (aplT) {
    image(apple, aplX, aplY, 35, 35);
  }
  if (dist(aplX, aplY, x, y) < wSize/2 && aplT && lvl == "3") {
    score = score + 1;
    aplT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = width/6;
  var lvrmY = height-height/2.3;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < wSize/2) {
    x = width/3;
    y = height/2;
    gameState = "lvrm";
  }
}

function bedroom() {
  image(bedrm, 0, 0, width, height);
  text("Bedroom", width/2, height-20);
  
  var blanketX = width/4.5;
  var blanketY = height-height/2.3;
  if (blT) {
    image(blanket, blanketX, blanketY, 100, 210);
  }
  if (dist(blanketX+50, blanketY+105, x, y) < wSize/2 && blT && lvl == "2") {
    score = score + 1;
    blT = false;
  }
  
  var kX = width-width/2.7;
  var kY = height/2+8;
  if (kT) {
    image(k, kX, kY, 30, 40);
  }
  if (dist(kX, kY, x, y) < wSize/2 && kT && lvl == "4") {
    score = score + 1;
    kT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var lvrmX = width-width/3;
  var lvrmY = height - 20;
  square(lvrmX, lvrmY, 10);
  
  var distToLvrm = dist(lvrmX, lvrmY, x, y);
  if (distToLvrm < hSize/2) {
    x = width-width/3 + 40;
    y = 100;
    gameState = "lvrm";
  }
  
  var atticX = width/7;
  var atticY = height/8;
  square(atticX, atticY, 10);
  
  var distToAttic = dist(atticX, atticY, x, y);
  if (distToAttic < hSize/2) {
    x = width/2;
    y = height-height/4;
    gameState = "attic";
  }
}

function attic() {
  image(at, 0, 0, width, height);
  text("Attic", width/2, height-10);
  
  var chestX = width/5 + 5;
  var chestY = height-height/4;
  if (chT) {
    image(chest, chestX, chestY, 110, 90);
  }
  if (dist(chestX, chestY, x, y) < wSize/2 && chT && lvl == "4") {
    score = score + 1;
    chT = false;
  }
  
  var shieldX = width-width/5;
  var shieldY = height-height/3.9;
  if (sT) {
    image(shield, shieldX, shieldY, 110, 90);
  }
  if (dist(shieldX, shieldY, x, y) < wSize/2 && sT && lvl == "2") {
    score = score + 1;
    sT = false;
  }
  
  var compassX = width-width/4;
  var compassY = height/2+15;
  if (compT) {
    image(compass, compassX, compassY, 30, 30);
  }
  if (dist(compassX, compassY, x, y) < wSize/2 && compT && lvl == "3") {
    score = score + 1;
    compT = false;
  }
  
  fill(152, 214, 179); // square color
  
  var bedrmX = width/2;
  var bedrmY = height - height/10;
  square(bedrmX, bedrmY, 10);
  
  var distToBedrm = dist(bedrmX, bedrmY, x, y);
  if (distToBedrm < hSize/2) {
    x = width/4;
    y = height/5;
    gameState = "bedrm";
  }
} 

function win() {
  background(65, 57, 82);
  fill(240);
  textSize(tSize*2);
  showScore = false;
  text("You Won!", width/2, 50);
  
  if (!restartButton) {
    restartButton = createButton('Replay Game');
    restartButton.position(width/2-(restartButton.width/2), height/2);
    restartButton.mousePressed(restartGame);
  }
  
  //wSize = wSize*2;
  //hSize = wSize*1.4;
  //image(ghost, (width/2)-(wSize/2), (height/2)-(hSize/2), wSize, hSize);
}

function lose() {
  background(65, 57, 82);
  showScore = false;
  textSize(tSize*2);
  fill(240);
  text("Try Again", width/2, 50);
  textSize(tSize);
  text(("Strikes: " + strikes + "/3"), width/2, 90);
  
  if (!startButton) {
    startButton = createButton('Retry Level');
    startButton.position(width/2-(startButton.width/2), height/2);
    startButton.mousePressed(startGame);
  }
  
  if (!restartButton) {
    restartButton = createButton('Restart Game');
    restartButton.position(width/2-(restartButton.width/2), height/2 + startButton.height + 30);
    restartButton.mousePressed(restartGame);
  }
  //wSize = wSize*2;
  //hSize = wSize*1.4;
  //image(ghost, (width/2)-(wSize/2), (height/2)-(hSize/2), wSize, hSize);
}
