function setup() {
  createCanvas(600, 600);
  background(191, 214, 219);
}

function draw() { 
  strokeWeight(2);
  // Top of Hair
  fill(18, 10, 2); // hair color
  ellipse(310, 183, 200, 250);
  ellipse(290, 175, 200, 250);
  
  // Clothes
  fill(70);
  rect(170, 330, 260, 270, 40, 40, 5, 5);
  rect(160, 332, 60, 270, 30, 20, 5, 5);
  rect(380, 332, 60, 270, 20, 30, 5, 5);
  
  // Hair left side
  fill(18, 10, 2); // hair color
  strokeJoin(ROUND); 
  
  beginShape(); // next to outer strand
  curveVertex(217, 150); // left side vertex
  curveVertex(212, 270);
  curveVertex(217, 350);
  curveVertex(212, 410);
  curveVertex(222, 550);
  curveVertex(227, 500);
  curveVertex(237, 400);
  curveVertex(262, 250);
  endShape(CLOSE);
  
  beginShape(); // outer strand
  curveVertex(270, 250); // inner vertex
  curveVertex(195, 150); // left side vertex
  curveVertex(200, 350);
  curveVertex(215, 550);
  curveVertex(220, 500);
  curveVertex(225, 450);
  curveVertex(245, 350);
  endShape(CLOSE);
  
  beginShape(); // next to inner strand
  curveVertex(232, 150); // left side vertex
  curveVertex(228, 270);
  curveVertex(232, 350);
  curveVertex(227, 410);
  curveVertex(237, 550);
  curveVertex(242, 500);
  curveVertex(252, 400);
  curveVertex(277, 250);
  endShape(CLOSE);
  
  beginShape(); // inner strand
  curveVertex(240, 150);
  curveVertex(250, 270);
  curveVertex(250, 350);
  curveVertex(235, 440);
  curveVertex(245, 550);
  curveVertex(250, 500);
  curveVertex(270, 400);
  curveVertex(276, 250);
  endShape(CLOSE);
  
  beginShape(); // middle strand
  curveVertex(225, 150);
  curveVertex(220, 270);
  curveVertex(225, 350);
  curveVertex(220, 410);
  curveVertex(230, 550);
  curveVertex(237, 500);
  curveVertex(245, 400);
  curveVertex(270, 180);
  endShape(CLOSE);
  
  // Hair right side
  push();
  translate(125,0);
  
  beginShape(); // next to inner strand
  curveVertex(217, 150); // left side vertex
  curveVertex(212, 270);
  curveVertex(217, 350);
  curveVertex(212, 410);
  curveVertex(222, 550);
  curveVertex(227, 500);
  curveVertex(237, 400);
  curveVertex(262, 250);
  endShape(CLOSE);
  
  beginShape(); // inner strand
  curveVertex(270, 250); // inner vertex
  curveVertex(197, 150); // left side vertex
  curveVertex(200, 350);
  curveVertex(210, 430);
  curveVertex(212, 550);
  curveVertex(220, 500);
  curveVertex(225, 450);
  curveVertex(245, 350);
  endShape(CLOSE);
  
  beginShape(); // next to outer strand
  curveVertex(232, 150);
  curveVertex(228, 270);
  curveVertex(232, 350);
  curveVertex(227, 410);
  curveVertex(237, 550);
  curveVertex(242, 500);
  curveVertex(252, 400);
  curveVertex(277, 250);
  endShape(CLOSE);
  
  beginShape(); // middle strand
  curveVertex(225, 150);
  curveVertex(220, 270);
  curveVertex(225, 350);
  curveVertex(220, 410);
  curveVertex(230, 550);
  curveVertex(237, 500);
  curveVertex(245, 400);
  curveVertex(270, 250);
  endShape(CLOSE);
  
  beginShape(); // outer strands
  curveVertex(280, 150);
  curveVertex(250, 270);
  curveVertex(250, 350);
  curveVertex(235, 440);
  curveVertex(245, 550);
  curveVertex(250, 500);
  curveVertex(270, 400);
  curveVertex(285, 250);
  curveVertex(285, 180);
  endShape(CLOSE);
  pop();
  
  // Neck
  fill(203, 157, 124);
  rect(276, 280, 48, 50);
  strokeWeight(1);
  fill(70);
  rect(276, 310, 48, 22);
  
  // Face Shape
  strokeWeight(2);
  fill(203, 157, 124);
  beginShape();
  curveVertex(310, 68);  // top
  curveVertex(290, 68);
  curveVertex(267, 74);
  curveVertex(236, 95);
  curveVertex(210, 150); // side
  curveVertex(215, 210);
  curveVertex(229, 250);
  curveVertex(265, 277);
  curveVertex(300, 290); // chin
  curveVertex(335, 277);
  curveVertex(371, 250);
  curveVertex(385, 210);
  curveVertex(390, 150); // side
  curveVertex(364, 95);
  curveVertex(333, 74);
  endShape(CLOSE);
    
  // Glasses
  // side
  fill(20, 21, 23); // glasses color
  triangle(232, 160, 223, 168, 195, 162);
  triangle(368, 160, 377, 168, 405, 162);
  // bridge
  beginShape();
  curveVertex(285, 167);
  curveVertex(288, 175);
  curveVertex(300, 174);
  curveVertex(311, 175);
  curveVertex(314, 167);
  curveVertex(300, 169);
  endShape(CLOSE);
  // lens
  strokeWeight(4);
  noFill();
  rect(225, 160, 63, 52, 10, 16, 19, 24);
  rect(312, 160, 63, 52, 16, 10, 24, 19);
  
  // Eyebrows
  strokeWeight(2);
  fill(18, 10, 2); // hair color
  beginShape(); // left
  curveVertex(280, 145);
  curveVertex(280, 152);
  curveVertex(245, 150);
  curveVertex(230, 153);
  curveVertex(245, 145);
  endShape(CLOSE);
  
  beginShape(); // right
  curveVertex(320, 145);
  curveVertex(320, 152);
  curveVertex(355, 150);
  curveVertex(370, 153);
  curveVertex(355, 145);
  endShape(CLOSE);
  
  // Eyes
  fill(255);
  beginShape(); // right (clockwise verticies)
  curveVertex(237, 184);
  curveVertex(242, 179);
  curveVertex(247, 175);
  curveVertex(255, 171);
  curveVertex(265, 173);
  curveVertex(276, 186);
  curveVertex(255, 190);
  endShape(CLOSE);
  
  beginShape(); // left
  curveVertex(362, 184);
  curveVertex(357, 179);
  curveVertex(352, 175);
  curveVertex(344, 171);
  curveVertex(334, 173);
  curveVertex(323, 186);
  curveVertex(344, 190);
  endShape(CLOSE);
  fill(18, 8, 1);
  circle(257, 181, 18);
  circle(341, 181, 18);
  
  
  // Hair front of face
  fill(18, 10, 2);
  beginShape();
  curveVertex(332, 72);  // top right
  curveVertex(300, 100); // upper curve
  curveVertex(220, 180); // lower curve
  curveVertex(210, 340); // lower end
  curveVertex(193, 170); // lower edge
  curveVertex(225, 90);  //upper edge
  curveVertex(280, 60);  // top edge
  endShape(CLOSE);
  
  beginShape();
  curveVertex(330, 70);  // top left
  curveVertex(345, 95);  // upper curve
  curveVertex(380, 165); // lower curve
  curveVertex(395, 330); // lower end
  curveVertex(405, 170); // lower edge
  curveVertex(380, 105); // upper edge
  endShape(CLOSE);
  
  // Mouth, smile
  strokeWeight(1);
  fill(221, 152, 155);
  beginShape(); // top lip
  curveVertex(261, 246);
  curveVertex(290, 245);
  curveVertex(300, 247);
  curveVertex(310, 245);
  curveVertex(338, 246);
  curveVertex(300, 252);
  endShape(CLOSE);
  
  fill(213, 145, 150);
  beginShape(); // bottom lip
  curveVertex(262, 246);
  curveVertex(262, 247);
  curveVertex(285, 262);
  curveVertex(315, 262);
  curveVertex(337, 247);
  curveVertex(334, 247);
  curveVertex(300, 259);
  endShape(CLOSE);
  
  fill(255);
  beginShape(); // teeth
  curveVertex(262, 246);
  curveVertex(300, 251);
  curveVertex(335, 247);
  curveVertex(300, 259);
  endShape(CLOSE);
  
  // Nose
  noFill();
  strokeWeight(2);
  beginShape();
  curveVertex(290, 210);
  curveVertex(290, 210);
  curveVertex(286, 217);
  curveVertex(284, 219);
  curveVertex(283, 225);
  curveVertex(287, 230);
  curveVertex(292, 229);
  curveVertex(300, 231);
  curveVertex(307, 229);
  curveVertex(312, 230);
  curveVertex(316, 225);
  curveVertex(315, 219);
  curveVertex(313, 217);
  curveVertex(309, 210);
  curveVertex(309, 210);
  endShape();
}
