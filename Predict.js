let trainingCompleted = false;

function Train(){
  console.log("I am being Trained");
  trainingCompleted = true;
}

function Test(){
  console.log("I am being Tested");
}

function draw(){
  clear();
  if(!trainingCompleted){
    Train();
  }

  Test();
}
