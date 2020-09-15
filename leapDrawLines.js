var controllerOptions = {};
let x1;
let x2;
let y1;
let y2;
let z1;
let z2;

let rawXMin = 500;
let rawXMax = -500;
let rawYMin = 500;
let rawYMax = -500;
var rangeX;
var rangeY;
var percentX1;
var percentX2;
var percentY1;
var percentY2;

function handleBone(bone){
  //console.log(bone);
  x1= bone.nextJoint[0];
  y1 = bone.nextJoint[1];
  z1 = bone.nextJoint[2];

  x2 = bone.prevJoint[0];
  y2 = bone.prevJoint[1];
  z2 = bone.prevJoint[2];
  //resetting max and mins
  if(x2 < rawXMin){
    rawXMin = x2;
    //console.log("xmin is true")
  }
  if(x2 > rawXMax){
    rawXMax = x2;
    //console.log("xmax is true")
  }

  if(y2 < rawYMin){
    rawYMin = y2;
    //console.log("ymin is true")
  }
  if(y2 > rawYMax){
    rawYMax = y2;
    //console.log("xmax is true")
  }
  //console.log(x,y)
  //console.log([rawXMin,rawXMax,rawYMin,rawYMax]);
  rangeX = rawXMax-rawXMin;
  rangeY = rawYMax-rawYMin;

  percentX1 = (x1-rawXMin)/rangeX
  x1 = percentX1 * window.innerWidth
  percentX2 = (x2-rawXMin)/rangeX
  x2 = percentX2 * window.innerWidth
  //
  // percentY1 = (y1-rawYMin)/rangeY
  // y1 = (1-percentY1) * window.innerWidth
  y1 = rawYMax-y1
  y2 = rawYMax-y2
  // percentY2 = (y2-rawYMin)/rangeY
  // y = (1-percentY2) * window.innerWidth
}

function handleFinger(finger){
    for(k=1;k<finger.bones.length;k++){
      handleBone(finger.bones[k]);
      line(x1,y1,x2,y2);
    }

}

function handleHand(hand){
  for (i=0; i<hand.fingers.length; i++){
    handleFinger(hand.fingers[i])
  }
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
