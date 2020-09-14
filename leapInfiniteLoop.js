var controllerOptions = {};
let x = window.innerWidth/2;
let y = window.innerHeight/2;

function handleFingers(fingers){
  for (i=0; i<fingers.length; i++){
    if(i===1) console.log(fingers[i].tipPosition);
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
    handleFrame(frame);
    // clear();
    // circle(x, y, 50);
    // x+=Math.random()*2-1;
    // y+=Math.random()*2-1;
}
);
