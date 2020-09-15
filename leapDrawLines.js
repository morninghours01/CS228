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



function transformCoordinates(x,y){
  //resetting max and mins
  if(x < rawXMin){
    rawXMin = x;
    //console.log("xmin is true")
  }
  if(x > rawXMax){
    rawXMax = x;
    //console.log("xmax is true")
  }

  if(y < rawYMin){
    rawYMin = y;
    //console.log("ymin is true")
  }
  if(y > rawYMax){
    rawYMax = y;
    //console.log("xmax is true")
  }

  let percentX = (x-rawXMin)/(rawXMax-rawXMin);
  x = percentX * window.innerWidth;

  y = rawYMax-y;
  return [x,y];
}

function handleBone(bone,boneType){
  console.log(bone);
  console.log(boneType);
  x1= bone.nextJoint[0];
  y1 = bone.nextJoint[1];
  z1 = bone.nextJoint[2];
  [x1,y1] = transformCoordinates(x1,y1);

  x2 = bone.prevJoint[0];
  y2 = bone.prevJoint[1];
  z2 = bone.prevJoint[2];
  [x2,y2] = transformCoordinates(x2,y2);
  line(x1,y1,x2,y2);

}

function handleFinger(finger){
    for(k=0;k<finger.bones.length;k++){
      handleBone(finger.bones[k],finger.bones[k].type);
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
