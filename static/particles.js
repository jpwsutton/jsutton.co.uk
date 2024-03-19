

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,windowWidth);
        this.y = random(0,windowHeight);
        this.r = random(1,8);
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
       
      }
    
    // creation of a particle.
      createParticle() {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        circle(this.x,this.y,this.r);
      }
    
    // setting the particle in motion.
      moveParticle() {
        if(this.x < 0 || this.x > windowWidth)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > windowHeight)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach(element =>{
          let dis = dist(this.x,this.y,element.x,element.y);
          if(dis<85) {
            if(darkMode === true){
              stroke('rgba(255,255,255,0.04)');
            } else {
              stroke('rgba(1,1,1,0.04)');
            }
            line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
    
    // an array to add multiple particles
    let particles = [];
    let canvas;
    let bodyElement = document.body;
    let darkMode = false;
    
    function setup() {
      canvas = createCanvas(windowWidth, windowHeight);
      canvas.position(0,0);
      canvas.style('z-index', '-1');
      canvas.style('position', 'fixed')
      
      for(let i = 0;i<windowWidth/10;i++){
        particles.push(new Particle());
      }
    }
    
    function draw() {
      if(bodyElement.classList.contains("dark")){
        if (darkMode !== true){
          //console.log("Dark mode enabled")
          darkMode = true
        }
        background(29,30,32);
      } else {
        if (darkMode !== false){
          //console.log("Dark mode disabled")
          darkMode = false
        }
        background('#FFFFFF');
      }
      
      for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
      }
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
   }