const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {};

let numTrainingSamples = train6.shape[3];
let numTestingSamples = test.shape[3];

let trainingCompleted = false;

let oneFrameOfData = nj.zeros([5,4,6]);

let m = 1;
let n = 0;
let d = 6;

function runningAvg(c){
  n++;
  m = ((n-1)*m+(c==d))/n;
  return m
}

function reshapeTensor4d(tensor4d,sample){
  let tensor3d = tensor4d.pick(null,null,null,sample);
  let vector = tensor3d.reshape(tensor3d.size);
  return vector
}

function reshapeTensor3d(tensor3d){
  let vector = tensor3d.reshape(tensor3d.size);
  return vector
}

function Train(){
  console.log("I am being Trained");
  for(i=0; i<numTrainingSamples; i++){

    let features0 = reshapeTensor4d(train6,i);
    label = 6;
    knnClassifier.addExample(features0.tolist(), label);

    features1 = reshapeTensor4d(train8,i)
    label = 8;
    knnClassifier.addExample(features1.tolist(), label);
  }

  trainingCompleted = true;
  console.log("I am being Tested");
}

function GotResults(err,result){
  //console.log("Prediction: ", parseInt(result.label),"| n = ",n,"| m = ", m);
  console.log("Prediction: ", parseInt(result.label));
  runningAvg(result.label)
  //predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
}

function centerData(){
  xValues = oneFrameOfData.slice([],[],[0,6,3])
  console.log(xValues.shape)
}

function Test(){
  //console.log(oneFrameOfData.size)
  centerData()
  let currentTestingSample = reshapeTensor3d(oneFrameOfData);
  knnClassifier.classify(currentTestingSample.tolist(),GotResults);
  //console.log(currentTestingSample.toString());

}

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

  oneFrameOfData.set(fingerIdx, boneType, 0, x2 )
  oneFrameOfData.set(fingerIdx, boneType, 1, y2 )
  oneFrameOfData.set(fingerIdx, boneType, 2, z2 )
  oneFrameOfData.set(fingerIdx, boneType, 3, x1 )
  oneFrameOfData.set(fingerIdx, boneType, 4, y1 )
  oneFrameOfData.set(fingerIdx, boneType, 5, z1 )

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

  stroke(color(255-256/5*(boneType+1)));
  line(canvasX1,canvasY1,canvasX2,canvasY2);
}

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
    //console.log(oneFrameOfData.toString())
    Test();
  }
}


Leap.loop(controllerOptions, function(frame){
  clear();
  if(!trainingCompleted){
    Train();
  }
  handleFrame(frame);




  //console.log(predictedClassLabels.toString())
}
);
