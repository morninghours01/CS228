var controllerOptions = {};
let x = window.innerWidth/2;
let y = window.innerHeight/2;
var z;

function handleFingers(fingers){
  for (i=0; i<fingers.length; i++){
    if(i===1){
      console.log(fingers[i].tipPosition);
      x = fingers[i].tipPosition[0]+window.innerWidth/2;
      y = window.innerWidth-fingers[i].tipPosition[1];
      z = fingers[i].tipPosition[2];
    }

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

    circle(x, y, 50);
    // x+=Math.random()*2-1;
    // y+=Math.random()*2-1;
}
);
