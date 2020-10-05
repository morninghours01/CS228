var controllerOptions = {};
let x1;
let x2;
let y1;
let y2;
let z1;
let z2;

let prevNumHands;
let currentNumHands;

let numSamples = 2;
let currentSample = 0;

let framesOfData = nj.zeros([5,4,6,numSamples]);

function handleBone(bone,boneType,fingerIdx,InteractionBox){
  //console.log(bone);
  let normalizedNextJoint;
  let normalizedPrevJoint;

  //get data
  normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true)
  //normalizedNextJoint = bone.nextJoint;
  x1 = normalizedNextJoint[0]
  y1 = normalizedNextJoint[1]
  z1 = normalizedNextJoint[2]

  normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true)
  //normalizedPrevJoint = bone.prevJoint;
  x2 = normalizedPrevJoint[0]
  y2 = normalizedPrevJoint[1]
  z2 = normalizedPrevJoint[2]

  framesOfData.set(fingerIdx, boneType, 0, x2 )
  framesOfData.set(fingerIdx, boneType, 1, y2 )
  framesOfData.set(fingerIdx, boneType, 2, z2 )
  framesOfData.set(fingerIdx, boneType, 3, x1 )
  framesOfData.set(fingerIdx, boneType, 4, y1 )
  framesOfData.set(fingerIdx, boneType, 5, z1 )

  //scale data for display
  var canvasX1 = window.innerWidth * x1;
  canvasX1 = canvasX1.toFixed(1)
  var canvasY1 = window.innerHeight * (1 - y1);
  canvasY1 = canvasY1.toFixed(1)

  var canvasX2 = window.innerWidth * x2;
  canvasX2 = canvasX2.toFixed(1)
  var canvasY2 = window.innerHeight * (1 - y2);
  canvasY2 = canvasY2.toFixed(1)

  strokeWeight(2*(16-4*boneType));
  if(currentNumHands === 1){
    stroke(color(0,(255-256/5*(boneType+1)),0))
    line(canvasX1,canvasY1,canvasX2,canvasY2);
  }
  else if(currentNumHands > 1) {
    stroke(color((255-256/5*(boneType+1)),0,0))
    line(canvasX1,canvasY1,canvasX2,canvasY2);
  }


}

/*
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
*/

function handleHand(hand,InteractionBox){
  let numFingerBones = hand.fingers[0].bones.length;
  let numFingers = hand.fingers.length;

  for(k=numFingerBones-1;k>=0;k--){
    for (i=0; i<numFingers; i++){
      handleBone(
        hand.fingers[i].bones[k],
        hand.fingers[i].bones[k].type,
        hand.fingers[i].type,
        InteractionBox
      );
      //console.log([i,k])
    }
  }
}

function handleFrame(frame){
  if(frame.hands.length >= 1){

    handleHand(frame.hands[0],frame.interactionBox);
  }
}

function recordData(){
  if(currentNumHands == 1 && prevNumHands == 2){
    background(0)
    console.log(framesOfData.toString())
  }
}

Leap.loop(controllerOptions, function(frame)
  {

    currentNumHands = frame.hands.length;
    clear();
    handleFrame(frame);
    recordData();


    prevNumHands = currentNumHands;



    // x+=Math.random()*2-1;
    // y+=Math.random()*2-1;
}
);
