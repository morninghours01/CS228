var controllerOptions = {};
let x = window.innerWidth/2;
let y = window.innerHeight/2;
Leap.loop(controllerOptions, function(frame)
  {
    clear();
    circle(x, y, 50);
    x+=Math.random()*2-1;
    y+=Math.random()*2-1;
  }
);
