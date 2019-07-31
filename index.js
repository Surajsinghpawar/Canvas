
let canvas=document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let c = canvas.getContext('2d');

let gravity=1;
let friction=0.99;

// c.fillStyle="rgba(255,0,0,0.5)";
// c.fillRect(100,100,100,100);
// c.fillStyle="rgba(0,0,255,0.5)";
// c.fillRect(400,100,100,100);
// c.fillStyle="rgba(0,255,0,0.5)";
// c.fillRect(300,300,100,100);

// //lines
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle="#fa34a3"
// c.stroke();

// //arc/circle
// c.beginPath();
// c.arc(300,300,30,0,Math.PI*2,false);
// c.strokeStyle='blue';
// c.stroke();

// for(let i =0; i<100;i++)
// {
//     let x=Math.random()*window.innerWidth;
//     let y=Math.random()*window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }


// let x=Math.random()*window.innerWidth;
// let y=Math.random()*window.innerHeight;
// let dx=(Math.random() - 0.5)*8;
// let dy=(Math.random() - 0.5)*8;
// let radius=30;

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

let mouse={
    x:undefined,
    y:undefined
}
let maxRadius=40;
let circleArray=[];
addEventListener("mousemove",(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
})

addEventListener('resize',()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});

addEventListener('click',()=>{
    init();
});

function getDistance(x1, y1, x2, y2){
    let xDistance = x2-x1;
    let yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}

function init(){
    circleArray=[];
    for(let i=0; i<500;i++)
    {
      let radius = randomIntFromRange(8,20);
      let x = randomIntFromRange(radius,canvas.width-radius);
      let y = randomIntFromRange(radius,canvas.height-radius);
      let dx = randomIntFromRange(-2,2);
      let dy = randomIntFromRange(-2,2);
  
      circleArray.push(new Circle(x, y, dx, dy, radius,getColor()));
    }
}

init();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getColor()
  {
      let clr=['#2C3E50','#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];
      return clr[Math.floor(Math.random()*clr.length)];
  }

  function Circle(x,y,dx,dy,radius,color){
      this.x=x;
      this.y=y;
      this.dx=dx;
      this.dy=dy;
      this.radius=radius;
      this.color=color;
      this.minRadius=radius;
    
      this.draw=function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle=this.color;
        c.fill();
       //    c.stroke();
      };
      this.update=function(){
            // if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            //     this.dx = -this.dx;
            // }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
           // this.dy = -this.dy * friction;        //for gravity
            this.dy = -this.dy;
        }
        // else{
        //     this.dy+=gravity;  //gravity
        // }

        if(this.x + radius + this.dx>canvas.width || this.x-this.radius <= 0)
        {
            this.dx= -this.dx;  
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>=-50){
            if(this.radius<maxRadius){
                this.radius+=4;
            }
        }
        else if(this.radius>this.minRadius)
        {
            this.radius-=1;
        }
        
        this.draw();
      };
  }

  let circle=new Circle(200,200,4,4,30);
  circle.draw();
  


  



  

  console.log(circleArray);
  
  function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    
    for(let i=0;i<circleArray.length;i++)
    {
        circleArray[i].update();
    }
}

animate();