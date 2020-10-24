const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {};

let numTrainingSamples = train6.shape[3];
let numTestingSamples = test.shape[3];

let trainingCompleted = false;

let oneFrameOfData = nj.zeros([5,4,6]);

let m = 1;
let n = 0;
let d = 9;


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

    let features0 = reshapeTensor4d(train0,i)
    knnClassifier.addExample(features0.tolist(), 0);

    let features00 = reshapeTensor4d(train0Wills,i)
    knnClassifier.addExample(features00.tolist(), 0);

    let features1 = reshapeTensor4d(train1,i)
    knnClassifier.addExample(features1.tolist(), 1);

    let features1Mc = reshapeTensor4d(train1McLaughlin,i)
    knnClassifier.addExample(features1Mc.tolist(), 1);

    let features1Rice = reshapeTensor4d(train1Rice,i)
    knnClassifier.addExample(features1Rice.tolist(), 1);

    let features1Davis = reshapeTensor4d(train1Davis,i)
    knnClassifier.addExample(features1Davis.tolist(), 1);

    let features2 = reshapeTensor4d(train2,i)
    knnClassifier.addExample(features2.tolist(), 2);

    let features22 = reshapeTensor4d(train2Banaszewski,i)
    knnClassifier.addExample(features22.tolist(), 2);

    let features3 = reshapeTensor4d(train3,i)
    knnClassifier.addExample(features3.tolist(), 3);

    let features33 = reshapeTensor4d(train3Riofrio,i)
    knnClassifier.addExample(features33.tolist(), 3);

    let features4 = reshapeTensor4d(train4,i)
    knnClassifier.addExample(features4.tolist(), 4);

    let features5 = reshapeTensor4d(train5,i)
    knnClassifier.addExample(features5.tolist(), 5);

    let features6 = reshapeTensor4d(train6,i);
    knnClassifier.addExample(features6.tolist(), 6);

    let features7 = reshapeTensor4d(train7,i);
    knnClassifier.addExample(features7.tolist(), 7);

    let features77 = reshapeTensor4d(train7Laquerre,i);
    knnClassifier.addExample(features77.tolist(), 7);

    let features8 = reshapeTensor4d(train8,i)
    knnClassifier.addExample(features8.tolist(), 8);

    let features88 = reshapeTensor4d(train8Bongard,i)
    knnClassifier.addExample(features88.tolist(), 8);

    let features9 = reshapeTensor4d(train9,i)
    knnClassifier.addExample(features9.tolist(), 9);

  }

  trainingCompleted = true;
  console.log("I am being Tested");
}

function runningAvg(c){
  n++;
  m = ((n-1)*m+(c==d))/n;
  return m
}

function GotResults(err,result){
  //console.log("Prediction: ", parseInt(result.label),"| n = ",n,"| m = ", m);
  console.log("Prediction: ", parseInt(result.label));
  runningAvg(result.label)
  //predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
}

//warning: extreme code reuse, very awesome
function centerData(dim){
  dimValues = oneFrameOfData.slice([],[],[dim,6,3])
  currentMean = dimValues.mean()
  //console.log(dim.toString(),":",currentMean)
  dimShift = 0.5-currentMean
  //console.log(dimShift)
  for(i=0; i<oneFrameOfData.shape[0]; i++){
    for(j=0; j<oneFrameOfData.shape[1]; j++){
      //x2
      currentDim = oneFrameOfData.get(i, j, dim);
      shiftedX = currentDim + dimShift;
      oneFrameOfData.set(i, j, dim, shiftedX);
      //x1
      currentDim = oneFrameOfData.get(i, j, dim+3);
      shiftedX = currentDim + dimShift;
      oneFrameOfData.set(i, j, dim+3, shiftedX);
    }
  }
  let shiftedMean = dimValues.mean();
  //console.log(dim.toString(),":",shiftedMean);

}

function Test(){
  //console.log(oneFrameOfData.size)
  centerData(0)
  centerData(1)
  centerData(2)
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
