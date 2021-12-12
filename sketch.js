// Based on Benedikt Groß's https://b-g.github.io/p5-matter-examples/1-mouse/

let Engine = Matter.Engine;
let Render = Matter.Render;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;

let drawBody = Helpers.drawBody;
let drawBodies = Helpers.drawBodies;

let engine;
let ball;
let layers = [];
let sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9;
let cat;

let colliding = false;
let colliding2 = false;

function preload() {
  sound1 = loadSound("guitarcut.mp3");
  sound2 = loadSound("raincut.mp3");
  sound3 = loadSound("bubble.mp3");
  sound4 = loadSound("meow.mp3");
  sound5 = loadSound("ladar.mp3");
  sound6 = loadSound("house.mp3");
  sound7 = loadSound("friction.mp3");
  sound8 = loadSound("wuuu.mp3");
  sound9 = loadSound("lalala.mp3");
  sound10 = loadSound("drum1.mp3");
  sound11 = loadSound("drum2.mp3");
  sound12 = loadSound("drum3.mp3");
  sound13 = loadSound("drumbg.mp3");
  sound14 = loadSound("ying.mp3");
  sound15 = loadSound("ding.mp3");
  sound16 = loadSound("wong.mp3");
  sound17 = loadSound("upup.mp3");
  cat = loadImage("cat.png");
}

let cnv;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(600, 600);
  centerCanvas();

  //borders 1
  layers.push(
    Bodies.rectangle(300, 600, 600, 20, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(300, 5, 600, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(5, 300, 600, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(595, 300, 600, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  //horizontal walls 1
  layers.push(
    Bodies.rectangle(140, 70, 260, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(464, 70, 134, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(104, 136, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(264, 136, 134, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(464, 136, 134, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(36, 200, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(368, 200, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(496, 200, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(104, 266, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(300, 266, 200, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(136, 332, 130, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(364, 332, 202, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(36, 398, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(464, 400, 134, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(136, 462, 130, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(36, 528, 66, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(238, 528, 70, 10, { isStatic: true, label: "wall" })
  );
  layers.push(
    Bodies.rectangle(526, 526, 130, 10, { isStatic: true, label: "wall" })
  );
  //vertical walls 1
  layers.push(
    Bodies.rectangle(136, 172, 198, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(136, 430, 198, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(200, 234, 206, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(200, 434, 66, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(200, 558, 70, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(268, 170, 66, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(268, 430, 190, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(332, 74, 134, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(332, 500, 200, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(400, 201, 140, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(400, 464, 138, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(464, 266, 142, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(464, 496, 69, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(526, 108, 66, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );
  layers.push(
    Bodies.rectangle(526, 328, 266, 10, {
      isStatic: true,
      label: "wall",
      angle: PI / 2,
    })
  );

  ball = Bodies.circle(40, 30, 20, { label: "ball" });
  ball1 = Bodies.circle(550, 540, 20);
  engine = Engine.create();

  World.add(engine.world, [ball, ball1, ...layers]);
  Matter.Events.on(engine, "collisionStart", function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;

    if (bodyA.label === "wall" || bodyB.label === "wall") {
      console.log("play a sound!");
    }
    if (bodyB.label === "ball") {
      sound1.stop();
      sound2.stop();
      sound3.stop();
      sound4.stop();
      sound5.stop();
      sound6.stop();
      sound7.stop();
      sound8.stop();
      sound9.stop();
      sound10.stop();
      sound11.stop();
      sound12.stop();
      sound13.stop();
      sound14.stop();
      sound15.stop();
      sound16.stop();
      sound17.stop();
      console.log("play ball sound!");
    }
  });
  Engine.run(engine);
  console.log(layers[5]);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  let collisions = [];
  let collisions2 = [];
  for (let i = 0; i < layers.length; i++) {
    // visualize collision
    const collided = Matter.SAT.collides(layers[i], ball).collided;
    const collided2 = Matter.SAT.collides(layers[i], ball1).collided;
    if (collided && colliding == false) {
      console.log("collision!!!!!!!");
      colliding = true;
      if (ball.position.x < width / 2 && ball.position.y < height / 2) {
        sound10.play();
      }
      if (ball.position.x > width / 2 && ball.position.y < height / 2) {
        sound11.play();
      }
      if (ball.position.x < width / 2 && ball.position.y > height / 2) {
        sound12.play();
      }

      if (ball.position.x > width / 2 && ball.position.y > height / 2) {
        sound13.play();
      }
    }
    //second ball
    if (collided2 && colliding2 == false) {
      console.log("collision 222222!");
      colliding2 = true;
      if (ball1.position.x < width / 2 && ball1.position.y < height / 2) {
        sound14.play();
      }
      if (ball1.position.x > width / 2 && ball1.position.y < height / 2) {
        sound15.play();
      }
      if (ball1.position.x < width / 2 && ball1.position.y > height / 2) {
        sound16.play();
      }

      if (ball1.position.x > width / 2 && ball1.position.y > height / 2) {
        sound17.play();
      }
    }

    collisions.push(collided);
    collisions2.push(collided2);
  }

  if (!collisions.includes(true)) {
    colliding = false;
  }
  if (!collisions2.includes(true)) {
    colliding2 = false;
  }

  background(250, 227, 8);

  noStroke();
  fill(15, 55, 224);
  // drawBody(ball);
  ellipse(ball.position.x, ball.position.y, 40);
  // second ball
  fill(244, 116, 0);
  ellipse(ball1.position.x, ball1.position.y, 40);

  engine.gravity.scale = 0;

  if (keyIsDown(UP_ARROW)) {
    // Move up
    // engine.gravity.scale = 0.005;
    // engine.gravity.x = 0;
    // engine.gravity.y = -1;
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: 0, y: -0.002 }
    );
  } else if (keyIsDown(LEFT_ARROW)) {
    // Move left
    // engine.gravity.scale = 0.005;
    // engine.gravity.x = -1;
    // engine.gravity.y = 0;
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: -0.002, y: 0 }
    );
  } else if (keyIsDown(RIGHT_ARROW)) {
    // Move right
    // engine.gravity.scale = 0.005;
    // engine.gravity.x = 1;
    // engine.gravity.0y = 0;
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: 0.004, y: 0 }
    );
  } else if (keyIsDown(DOWN_ARROW)) {
    // Move down
    // engine.gravity.scale = 0.005;
    // engine.gravity.x = 0;
    // engine.gravity.y = 1;
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: 0, y: 0.004 }
    );
  }

  if (keyIsDown(87)) {
    // Move up
    Body.applyForce(
      ball1,
      { x: ball1.position.x, y: ball1.position.y },
      { x: 0, y: -0.004 }
    );
    console.log("w");
  } else if (keyIsDown(65)) {
    // Move left
    Body.applyForce(
      ball1,
      { x: ball1.position.x, y: ball1.position.y },
      { x: -0.004, y: 0 }
    );
    console.log("a");
  } else if (keyIsDown(68)) {
    // Move right
    Body.applyForce(
      ball1,
      { x: ball1.position.x, y: ball1.position.y },
      { x: 0.004, y: 0 }
    );
    console.log("s");
  } else if (keyIsDown(83)) {
    // Move down
    Body.applyForce(
      ball1,
      { x: ball1.position.x, y: ball1.position.y },
      { x: 0, y: 0.004 }
    );
    console.log("d");
  }
  imageMode(CENTER);
  image(cat, 168, 450, 44, 32);
  if (
    ball.position.x <= 165 &&
    ball.position.x >= 130 &&
    ball.position.y <= 460 &&
    ball.position.y >= 420
  ) {
    sound4.playMode("restart");
    sound4.play();
  }
  if (
    ball1.position.x <= 165 &&
    ball1.position.x >= 130 &&
    ball1.position.y <= 460 &&
    ball1.position.y >= 420
  ) {
    sound4.playMode("restart");
    sound4.play();
  }

  //point
  fill(0);
  drawBodies(layers);
  triangle(470, 205, 495, 230, 520, 205);
  if (
    ball.position.x <= 500 &&
    ball.position.x >= 450 &&
    ball.position.y <= 250 &&
    ball.position.y >= 230
  ) {
    sound8.playMode("restart");
    sound8.play();
  }
  if (
    ball1.position.x <= 500 &&
    ball1.position.x >= 450 &&
    ball1.position.y <= 250 &&
    ball1.position.y >= 230
  ) {
    sound8.playMode("restart");
    sound8.play();
  }

  //purple
  fill(114, 25, 233);
  for (let i = 0; i < 120; i = i + 18) {
    triangle(280 + i, 336, 290 + i, 352, 300 + i, 336);
  }
  if (
    ball.position.x <= 420 &&
    ball.position.x >= 280 &&
    ball.position.y <= 360 &&
    ball.position.y >= 330
  ) {
    sound7.playMode("restart");
    sound7.play();
  }

  if (
    ball1.position.x <= 420 &&
    ball1.position.x >= 280 &&
    ball1.position.y <= 360 &&
    ball1.position.y >= 330
  ) {
    sound7.playMode("restart");
    sound7.play();
  }

  //pink rect
  fill(249, 159, 241);
  rect(355, 221, 40);
  if (
    ball.position.x <= 375 &&
    ball.position.x >= 335 &&
    ball.position.y <= 240 &&
    ball.position.y >= 200
  ) {
    sound6.playMode("restart");
    sound6.play();
  }
  if (
    ball1.position.x <= 375 &&
    ball1.position.x >= 335 &&
    ball1.position.y <= 240 &&
    ball1.position.y >= 200
  ) {
    sound6.playMode("restart");
    sound6.play();
  }

  for (let i = 0; i < 60; i = i + 16) {
    for (let j = 0; j < 30; j = j + 16) {
      rect(338 + i, 560 + j, 14, 14);
    }
  }
  if (
    ball.position.x <= 380 &&
    ball.position.x >= 300 &&
    ball.position.y <= 600 &&
    ball.position.y >= 540
  ) {
    sound9.playMode("restart");
    sound9.play();
  }
  if (
    ball1.position.x <= 380 &&
    ball1.position.x >= 300 &&
    ball1.position.y <= 600 &&
    ball1.position.y >= 540
  ) {
    sound9.playMode("restart");
    sound9.play();
  }

  //blue dot
  fill(176, 238, 254);
  for (let i = 0; i < 40; i = i + 18) {
    for (let j = 0; j < 80; j = j + 18) circle(150 + i, 190 + j, 12);
  }
  if (
    ball.position.x <= 190 &&
    ball.position.x >= 150 &&
    ball.position.y <= 270 &&
    ball.position.y >= 190
  ) {
    sound2.playMode("restart");
    sound2.play();
  }
  if (
    ball1.position.x <= 190 &&
    ball1.position.x >= 150 &&
    ball1.position.y <= 270 &&
    ball1.position.y >= 190
  ) {
    sound2.playMode("restart");
    sound2.play();
  }

  //green line
  stroke(1, 197, 113);
  strokeWeight(3);
  for (let i = 0; i < 50; i = i + 6) {
    line(200 + i, 12, 200 + i, 62);
  }
  if (
    ball.position.x <= 250 &&
    ball.position.x >= 230 &&
    ball.position.y < 70
  ) {
    sound1.playMode("restart");
    sound1.play();
  }

  if (
    ball1.position.x <= 250 &&
    ball1.position.x >= 230 &&
    ball1.position.y < 70
  ) {
    sound1.playMode("restart");
    sound1.play();
  }

  //rings
  stroke(255);
  noFill();
  strokeWeight(2);
  for (let i = 0; i < 50; i = i + 7) {
    circle(494, 102, 1 + i);
  }
  if (
    ball.position.x <= 560 &&
    ball.position.x >= 480 &&
    ball.position.y <= 120 &&
    ball.position.y >= 80
  ) {
    sound5.playMode("restart");
    sound5.play();
  }

  if (
    ball1.position.x <= 560 &&
    ball1.position.x >= 480 &&
    ball1.position.y <= 120 &&
    ball1.position.y >= 80
  ) {
    sound5.playMode("restart");
    sound5.play();
  }

  //dune
  noStroke();
  fill(252, 252, 196);
  for (let i = 0; i < 150; i = i + 45) {
    arc(10, 230 + i, 40, 50, PI + HALF_PI, HALF_PI, PIE);
  }
  if (
    ball.position.x <= 40 &&
    ball.position.y >= 230 &&
    ball.position.y < 380
  ) {
    sound3.playMode("sustain");
    sound3.play();
  }

  if (
    ball1.position.x <= 40 &&
    ball1.position.y >= 230 &&
    ball1.position.y < 380
  ) {
    sound3.playMode("sustain");
    sound3.play();
  }
}
