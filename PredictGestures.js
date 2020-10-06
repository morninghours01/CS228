const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 1;


let trainingCompleted = false;

function reshapeTensor(tensor4d,sample){
  let tensor3d = tensor4d.pick(null,null,null,sample);
  let vector = tensor3d.reshape(tensor3d.size);
  return vector
}

function Train(){
  console.log("I am being Trained");
  for(i=0; i<train0.shape[3]; i++){
    let features = reshapeTensor(train0,i);
    console.log(features.toString());
    label = 0;
    knnClassifier.addExample(features.tolist(), label);

  }

  trainingCompleted = true;
}

function Test(){
  console.log("I am being Tested");

  let features = reshapeTensor(test,i);
  knnClassifier.classify(features.tolist(),GotResults);

  testingSampleIndex+=2;
  if(testingSampleIndex>=numSamples){
    testingSampleInd
  }
}

function draw(){
  clear();
  if(!trainingCompleted){
    Train();
  }
  Test();


  //console.log(predictedClassLabels.toString())
}
