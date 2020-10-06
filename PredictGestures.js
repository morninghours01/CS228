const knnClassifier = ml5.KNNClassifier();

let numTrainingSamples = train0.shape[3];
let testingSampleIndex = 0;
let numTestingSamples = test.shape[3];
let trainingCompleted = false;

function reshapeTensor(tensor4d,sample){
  let tensor3d = tensor4d.pick(null,null,null,sample);
  let vector = tensor3d.reshape(tensor3d.size);
  return vector
}

function Train(){
  console.log("I am being Trained");
  for(i=0; i<numTrainingSamples; i++){

    let features0 = reshapeTensor(train0,i);
    label = 0;
    knnClassifier.addExample(features0.tolist(), label);

    features1 = reshapeTensor(train1,i)
    label = 1;
    knnClassifier.addExample(features1.tolist(), label);
  }

  trainingCompleted = true;
}

function GotResults(err,result){
  console.log("Prediction: ", parseInt(result.label));
  //predictedClassLabels.set(testingSampleIndex,parseInt(result.label));


}

function Test(){
  console.log("I am being Tested");

  let currentTestingSample = reshapeTensor(test,testingSampleIndex);
  knnClassifier.classify(currentTestingSample.tolist(),GotResults);
  //console.log(currentTestingSample.toString());

  testingSampleIndex++;
  if(testingSampleIndex>=numTestingSamples){
    testingSampleIndex = 0;
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
