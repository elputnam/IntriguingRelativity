let swarm = [];
let flock = [];
let spin = 0;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  for (let i = 0; i < 100; i++){
    flock.push(new Bug());
  }
}

function draw() {
  // background(random(10));
  push();
  locX = map(mouseX, 0, width, -width/2, width/2);
  locY = map(mouseY, 0, height, -height/2, height/2);
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
  }


class TimeCone{
  constructor(){
    this.wide = random(30);
    this.high = this.wide*2;
    this.inside = random(90);
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
    fill(this.inside);
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
      this.rad = random(height*0.5);
      this.ts = random(6);
      this.color = random(360);
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
      fill(this.color, random(100), random(100));
      noStroke()
      translate(this.loc);
      plane(random(this.rad), random(20));
      pop();
    }
  }
