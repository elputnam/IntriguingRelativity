let swarm = [];
let flock = [];
let spin = 0;

//CCapture
var capture = false; // default is to not capture frames, can be changed with button in browser
var capturer = new CCapture({
  format:'gif', 
  workersPath: 'js/',
  framerate: 60
});

const NUM_FRAMES = 275;

function setup() {
  // createCanvas(windowWidth, windowHeight, WEBGL);
  createCanvas(500, 500, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  let num = height*.2;
  for (let i = 0; i < num; i++){
    flock.push(new Bug());
  }

  
}

function draw() {
  // background(random(10));
  if (capture && frameCount==1) capturer.start(); // start the animation capture
  push();
  // locX = map(mouseX, 0, width, -width/2, width/2);
  // locY = map(mouseY, 0, height, -height/2, height/2);
  locX = 0;
  locY = 0;
  translate(locX, locY, 0);
  swarm.push(new TimeCone());
  for(let i = swarm.length - 1; i >= 0; i--){
    let t = swarm[i];
    t.run();
    if (t.ghost()){
      swarm.splice(i, 1);
    }
  }
  pop();
  for(let i = 0; i < flock.length; i++){
    flock[i].run();
    }

  //capture details
  if (capture){
    capturer.capture( canvas ); // if capture is 'true', save the frame
    if (frameCount-1 == NUM_FRAMES){ //stop and save after NUM_FRAMES
        capturer.stop(); 
        capturer.save(); 
        noLoop(); 
      }
    }
  }

  function buttonPress()
{
    if (capture == false) {
        capture = true;
        document.getElementById("myButton").value='Saving Frames... Press Again to Cancel'; 
        frameCount = 0;
    } else {
        location.reload(); //refresh the page (starts animation over, stops saving frames)
    }
}


class TimeCone{
  constructor(){
    this.wide = random(height*.03);
    this.high = this.wide*2;
    this.inside = createVector(random(200, 360), random(100), random(100));
    this.outside = random(100,200);
    this.vel = createVector(0, 0, 0);
    this.loc = createVector(0, 0, 0);
    this.ts = random(2)
    this.spin = 0;
    this.a = createVector(random(-0.1,0.1), random(-0.1,0.1), random(-0.1,0.1));
    this.lifespan = 255.0
  }

  run(){
    this.update();
    this.display();
  }
  update(){
    // this.a = p5.Vector.random3D();
    // this.a.mult(random(5));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
    this.spin += random(0.1)
    this.lifespan -= random(1,3);
  }
  display(){
    push();
    translate(this.loc);
    rotateX(this.spin);
    rotateY(this.spin);
    rotateZ(this.spin);
    fill(this.inside.x, this.inside.y, this.inside.z);
    stroke(this.outside, 100, 100, 10);
    // noStroke();
    cone(this.wide, this.high, 10);
    push();
    translate(0, this.high);
    rotate(PI);
    cone(this.wide, this.high, 10);
    pop();
    pop();
  }

  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
    }
  }

class Bug{
    constructor(){
      this.loc = createVector(0, 0, 0);
      this.vel = createVector(0, 0, 0);
      // this.rad = random(height*0.5);
      this.ts = random(6);
      this.color = random(250,360);
    }
  
    run(){
      this.update();
      this.display();
    }
    
    update(){
      this.a = p5.Vector.random3D();
      this.a.mult(random(3));
      this.vel.add(this.a);
      this.vel.limit(this.ts);
      this.loc.add(this.vel);
    }
    
    display(){
      push();
      fill(random(255))
      // fill(this.color, random(100), random(100));
      noStroke()
      translate(this.loc);
      sphere(random(8,10), 3, 3);
      pop();
    }
  }
