const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 1;


let trainingCompleted = false;


function Train(){
  console.log("I am being Trained");
  for(i=0; i<train0.shape[3]; i++){
    let features = train0.pick(null,null,null,i);
    features = features.reshape(120);
    //console.log(features.toString());
    label = 0;
    knnClassifier.addExample(features.tolist(), label);
  }

  trainingCompleted = true;
}

function Test(){
  if(testingSampleIndex==1){
    console.log("I am being Tested");
    console.log(test.toString())
  }
  testingSampleIndex++;



}

function draw(){
  clear();
  if(!trainingCompleted){
    Train();
  }
  Test();


  //console.log(predictedClassLabels.toString())
}
