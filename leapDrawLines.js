var controllerOptions = {};
let x = window.innerWidth/2;
let y = window.innerHeight/2;
var z;
let rawXMin = 500;
let rawXMax = -500;
let rawYMin = 500;
let rawYMax = -500;
var rangeX;
var rangeY;
var percentX;
var percentY


function handleFingers(fingers){
  for (i=0; i<fingers.length; i++){

      //console.log(fingers[i].tipPosition);
      x = fingers[i].tipPosition[0];
      y = fingers[i].tipPosition[1];
      z = fingers[i].tipPosition[2];
      //resetting max and mins
      if(x < rawXMin){
        rawXMin = x;
        console.log("xmin is true")
      }
      if(x > rawXMax){
        rawXMax = x;
        console.log("xmax is true")
      }

      if(y < rawYMin){
        rawYMin = y;
        console.log("ymin is true")
      }
      if(y > rawYMax){
        rawYMax = y;
        console.log("xmax is true")
      }
      //console.log(x,y)
      //console.log([rawXMin,rawXMax,rawYMin,rawYMax]);
      rangeX = rawXMax-rawXMin;
      rangeY = rawYMax-rawYMin;
      percentX = (x-rawXMin)/rangeX
      x = percentX * window.innerWidth
      percentY = (y-rawYMin)/rangeY
      y = (1-percentY) * window.innerWidth
      circle(x, y, 50);
  }
}

function handleHand(hand){
  handleFingers(hand.fingers)
}

function handleFrame(frame){
  if(frame.hands.length === 1){
    handleHand(frame.hands[0])
  }
}


Leap.loop(controllerOptions, function(frame)
  {
    clear();
    handleFrame(frame);


    // x+=Math.random()*2-1;
    // y+=Math.random()*2-1;
}
);
