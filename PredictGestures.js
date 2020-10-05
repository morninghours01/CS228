const knnClassifier = ml5.KNNClassifier();
let testingSampleIndex = 1;


let trainingCompleted = false;


function Train(){
  console.log("I am being Trained");

  console.log(train0);
  trainingCompleted = true;
}

function Test(){
  if(testingSampleIndex==1){
    console.log("I am being Tested");
  }
  testingSampleIndex++


  console.log(test)
}

function draw(){
  clear();
  if(!trainingCompleted){
    Train();
  }
  Test();


  //console.log(predictedClassLabels.toString())
}
