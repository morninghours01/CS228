const knnClassifier = ml5.KNNClassifier();
var controllerOptions = {};

nj.config.printThreshold = 1000;

let numTrainingSamples = train6.shape[3];
let numTestingSamples = test.shape[3];

let trainingCompleted = false;

let oneFrameOfData = nj.zeros([5,4,6]);
let oneFrameCentered = nj.zeros([5,4,6]);

let programState = 0;

let digitToShow = 8;

let timeSinceLastDigitChange = new Date()

let switchingTime = 5;

let testAllHands;

let handImageX = 3*window.innerWidth/4;
let handImageY = window.innerHeight/2;
let handImageHeight = window.innerWidth/4;
let handImageWidth = window.innerHeight/2;

let numberPromptX = window.innerWidth/2;
let numberPromptY = window.innerHeight/2;
let numberPromptSize = 300;
let promptingTime = switchingTime;
let keepPrompting = true;

let m = 0;
let n = 0;

let successChart = nj.zeros(10);
//let d = 9;

function IsNewUser(username,list){
  var users = list.children;
  usernameFound = false;
  for(i=0; i<users.length; i++){
    if(username == users[i].innerHTML){
      usernameFound = true;
    }
  }
  return usernameFound == false;
}

function CreateNewUser(username,list){
  var item = document.createElement('li');
  item.innerHTML = String(username);
  list.appendChild(item);
  item.id = String(username) + "_name";

  var itemSignIns = document.createElement('li');
  var signIns = 1;
  itemSignIns.innerHTML = Number(signIns);
  //console.log(itemSignIns.innerHTML)
  list.appendChild(itemSignIns);
  itemSignIns.id = String(username) + "_signins"
}


function SignIn(){
  username = document.getElementById('username').value;
  var list = document.getElementById('users');
  if(IsNewUser(username,list)){
    CreateNewUser(username,list)
  }
  else {
    ID = String(username) + "_signins";
    listItem = document.getElementById( ID );
    listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
  }

  console.log(list.innerHTML);
  return false;
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

    let features0 = reshapeTensor4d(train0,i);
    knnClassifier.addExample(features0.tolist(), 0);

    let features00 = reshapeTensor4d(train0Wills,i);
    knnClassifier.addExample(features00.tolist(), 0);


    let features1 = reshapeTensor4d(train1,i);
    knnClassifier.addExample(features1.tolist(), 1);

    let features1Mc = reshapeTensor4d(train1McLaughlin,i);
    knnClassifier.addExample(features1Mc.tolist(), 1);

    let features1Rice = reshapeTensor4d(train1Rice,i);
    knnClassifier.addExample(features1Rice.tolist(), 1);

    let features1Davis = reshapeTensor4d(train1Davis,i);
    knnClassifier.addExample(features1Davis.tolist(), 1);

    let features11 = reshapeTensor4d(train1Wolley,i);
    knnClassifier.addExample(features11.tolist(), 1);

    let features1Potts2 = reshapeTensor4d(train1Potts2,i);
    knnClassifier.addExample(features1Potts2.tolist(), 1);


    let features2 = reshapeTensor4d(train2,i);
    knnClassifier.addExample(features2.tolist(), 2);

    let features22 = reshapeTensor4d(train2Banaszewski,i);
    knnClassifier.addExample(features22.tolist(), 2);

    let features222 = reshapeTensor4d(train2Bongard,i);
    knnClassifier.addExample(features222.tolist(), 2);


    let features3 = reshapeTensor4d(train3,i);
    knnClassifier.addExample(features3.tolist(), 3);

    let features33 = reshapeTensor4d(train3Riofrio,i);
    knnClassifier.addExample(features33.tolist(), 3);


    // let features4 = reshapeTensor4d(train4,i);
    // knnClassifier.addExample(features4.tolist(), 4);

    let features44 = reshapeTensor4d(train4Kiely,i);
    knnClassifier.addExample(features44.tolist(), 4);

    let features444 = reshapeTensor4d(train4Beattie,i);
    knnClassifier.addExample(features444.tolist(), 4);

    let features4444 = reshapeTensor4d(train4Liu,i);
    knnClassifier.addExample(features4444.tolist(), 4);


    let features5 = reshapeTensor4d(train5,i);
    knnClassifier.addExample(features5.tolist(), 5);

    let features55 = reshapeTensor4d(train5Koretsky,i);
    knnClassifier.addExample(features55.tolist(), 5);

    let features555 = reshapeTensor4d(train5Shi,i);
    knnClassifier.addExample(features555.tolist(), 5);


    let features6 = reshapeTensor4d(train6,i);
    knnClassifier.addExample(features6.tolist(), 6);


    let features7 = reshapeTensor4d(train7,i);
    knnClassifier.addExample(features7.tolist(), 7);

    let features77 = reshapeTensor4d(train7Laquerre,i);
    knnClassifier.addExample(features77.tolist(), 7);

    let features777 = reshapeTensor4d(train7Manian,i);
    knnClassifier.addExample(features777.tolist(), 7);

    let features7777 = reshapeTensor4d(train7Vega,i);
    knnClassifier.addExample(features7777.tolist(), 7);

    let features77777 = reshapeTensor4d(train7Potts,i);
    knnClassifier.addExample(features77777.tolist(), 7);


    let features8 = reshapeTensor4d(train8,i);
    knnClassifier.addExample(features8.tolist(), 8);

    let features88 = reshapeTensor4d(train8Bongard,i);
    knnClassifier.addExample(features88.tolist(), 8);

    let features888 = reshapeTensor4d(train8Timsina,i);
    knnClassifier.addExample(features888.tolist(), 8);


    let features9 = reshapeTensor4d(train9,i);
    knnClassifier.addExample(features9.tolist(), 9);

    let features99 = reshapeTensor4d(train9Woolley,i);
    knnClassifier.addExample(features99.tolist(), 9);

    let features999 = reshapeTensor4d(train9Vega,i);
    knnClassifier.addExample(features999.tolist(), 9);

    let features9999 = reshapeTensor4d(train9JClark,i);
    knnClassifier.addExample(features9999.tolist(), 9);

  }

  trainingCompleted = true;
  console.log("I am being Tested");
}

function runningAvg(c,d){
  n++;
  m = ((n-1)*m+(c==d))/n;
  return m
}

function GotResults(err,result){
  runningAvg(result.label,digitToShow)
  //console.log("Prediction: ", parseInt(result.label),"| Mean Accurace: ", m);
  //console.log("Prediction: ", parseInt(result.label));

  //predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
}

function meanPosition(dim){
  let dimValues = oneFrameOfData.slice([],[],[dim,6,3]);
  let currentMean = dimValues.mean();
  //console.log(currentMean);
  return currentMean

}

//warning: extreme code reuse, very awesome
function centerData(dim){
  currentMean = meanPosition(dim);
  //console.log(dim.toString(),":",currentMean)
  dimShift = 0.5-currentMean
  //console.log(dimShift)
  oneFrameCentered = oneFrameOfData.clone()

  for(i=0; i<oneFrameCentered.shape[0]; i++){
    for(j=0; j<oneFrameCentered.shape[1]; j++){
      //x2
      currentDim = oneFrameCentered.get(i, j, dim);
      shiftedX = currentDim + dimShift;
      oneFrameCentered.set(i, j, dim, shiftedX);
      //x1
      currentDim = oneFrameCentered.get(i, j, dim+3);
      shiftedX = currentDim + dimShift;
      oneFrameCentered.set(i, j, dim+3, shiftedX);
    }
  }
  //let shiftedMean = dimValues.mean();
  //console.log(dim.toString(),":",shiftedMean);
}

function Test(){
  //console.log(oneFrameOfData.size)
  centerData(0)
  centerData(1)
  centerData(2)
  let currentTestingSample = reshapeTensor3d(oneFrameCentered);
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
  var canvasX1 = window.innerWidth/2 * x1;
  canvasX1 = canvasX1.toFixed(1)
  var canvasY1 = window.innerHeight/2 * (1 - y1);
  canvasY1 = canvasY1.toFixed(1)

  var canvasX2 = window.innerWidth/2 * x2;
  canvasX2 = canvasX2.toFixed(1)
  var canvasY2 = window.innerHeight/2 * (1 - y2);
  canvasY2 = canvasY2.toFixed(1)

  strokeWeight(2*(16-4*boneType));

  stroke((1-m)*(255-256/5*(boneType+1)), m*(255-256/5*(boneType+1)),0);
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
  if(frame.hands.length){
    handleHand(frame.hands[0],frame.interactionBox);
    //console.log(oneFrameOfData.toString())
  }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice(){
  image(img, 0, 0, window.innerWidth/2, window.innerHeight/2)
}

function TrainKNNIfNotDoneYet(){
  if(!trainingCompleted){
    Train();
  }
}

function HandleState0(frame){
  TrainKNNIfNotDoneYet()
  DrawImageToHelpUserPutTheirHandOverTheDevice()
}

function HandleState1(frame){
  handleFrame(frame);
  if(HandTooLeft()){
    image(imgTooLeft, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2)
  }
  else if(HandTooRight()){
    image(imgTooRight, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2)
  }
  else if(HandTooLow()){
    image(imgTooLow, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2)
  }
  else if(HandTooHigh()){
    image(imgTooHigh, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2)
  }
  else if(HandTooClose()){
    image(imgTooClose, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2)
  }
  else if(HandTooFar()){
    image(imgtooFar, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
  }
}

function promptDigit(imageToShow){
  textSize(300);
  strokeWeight(0)
  fill(50);
  textAlign(LEFT,TOP);
  text(digitToShow.toString(), numberPromptX, numberPromptY)
  if(keepPrompting){
    image(imageToShow, handImageX, handImageY, handImageWidth, handImageHeight)
  }
}

function DrawLowerRightPanel(){
  if(digitToShow == 0){
    promptDigit(asl0);
  }
  else if(digitToShow == 1){
    promptDigit(asl1);
  }
  else if(digitToShow == 2){
    promptDigit(asl2);
  }
  else if(digitToShow == 3){
    promptDigit(asl3);
  }
  else if(digitToShow == 4){
    promptDigit(asl4);
  }
  else if(digitToShow == 5){
    promptDigit(asl5);
  }
  else if(digitToShow == 6){
    promptDigit(asl6);
  }
  else if(digitToShow == 7){
    promptDigit(asl7);
  }
  else if(digitToShow == 8){
    promptDigit(asl8);
  }
  else{
    promptDigit(asl9);
  }
}

// X
function HandTooLeft(){
  if(meanPosition(0) < 0.25){
    //console.log("too left")
    return true;
  }
  else {
    return false;
  }
}

function HandTooRight(){
  if(meanPosition(0) > 0.75){
    //console.log("too right")
    return true;
  }
  else {
    return false;
  }
}

// Y
function HandTooLow(){
  if(meanPosition(1) < 0.25){
    //console.log("too low")
    return true;
  }
  else {
    return false;
  }
}

function HandTooHigh(){
  if(meanPosition(1) > 0.75){
    //console.log("too high")
    return true;
  }
  else {
    return false;
  }
}

//Z
function HandTooClose(){
  if(meanPosition(2) > 0.75){
    //console.log("too close")
    return true;
  }
  else {
    return false;
  }
}

function HandTooFar(){
  if(meanPosition(2) < 0.25){
    //console.log("too far")
    return true;
  }
  else {
    return false;
  }
}

function HandIsUncentered(){
  if(HandTooLeft() || HandTooRight() || HandTooLow()||
  HandTooHigh() || HandTooClose() || HandTooFar()){
    return(true)
  }
}


function SwitchDigits(){
  // digitToShow = digitToShow + 1
  // if(digitToShow = 9){
  //   digitToShow = 0
  // }
  if(digitToShow == 5){
    digitToShow = 8;
  }
  else{
    digitToShow = 5;
  }
}

function TimeToSwitchDigits(){
  let currentTime = new Date();
  let elapsedInMilliseconds = currentTime - timeSinceLastDigitChange;
  let elapsedInSeconds = elapsedInMilliseconds/1000;

  switchingTime =

  if(elapsedInSeconds < promptingTime ){
      keepPrompting = true;
  }
  else{
      keepPrompting = false;
  }

  if(elapsedInSeconds > switchingTime){
    return true;
  }
  else{
    return false;
  }
}

function DetermineWhetherToSwitchDigits(){
  if(TimeToSwitchDigits()){
    successChart.set(digitToShow, m)
    SwitchDigits()
    promptingTime = 10 * (1 - 2*successChart.get(digitToShow))
    }
  n=0;
  timeSinceLastDigitChange = new Date()
  }
}

function HandleState2(frame){
  handleFrame(frame);
  DetermineWhetherToSwitchDigits()
  DrawLowerRightPanel()
  Test();
}

function DetermineState(frame){
  if(!frame.hands.length){
    programState = 0;
  }
  else if(HandIsUncentered()){
     programState = 1;
  }
  else {
    programState = 2;
  }
  //console.log(programState)
}

Leap.loop(controllerOptions, function(frame){
  clear();

  DetermineState(frame);
  if(programState==0){
    HandleState0(frame);
  }
  else if (programState==1) {
    HandleState1(frame);
  }
  else if (programState == 2){
    HandleState2(frame);
  }
  console.log(successChart.toString())
}
);
