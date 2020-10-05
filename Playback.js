let oneFrameofData = nj.array([[[0.74499,0.5602, 1,0.74499,0.5602, 1],
        [0.74499,0.5602, 1,0.58452,0.49357,0.85397],
        [0.58452,0.49357,0.85397,0.4847,0.44748,0.7124],
        [0.4847,0.44748,0.7124,0.40718,0.41649,0.63356]],
       [[0.71036,0.64739,0.9864,0.42035,0.59533,0.86016],
        [0.42035,0.59533,0.86016,0.28916,0.51646,0.71494],
        [0.28916,0.51646,0.71494,0.27234,0.42476,0.65632],
        [0.27234,0.42476,0.65632,0.29461,0.35811,0.64173]],
       [[0.71748,0.66538,0.91115,0.45377,0.62521,0.73264],
        [0.45377,0.62521,0.73264,0.32326,0.49727,0.60367],
        [0.32326,0.49727,0.60367,0.32355,0.38001,0.58362],
        [0.32355,0.38001,0.58362,0.35934,0.31164,0.60109]],
       [[0.73299,0.67288,0.83481,0.51272,0.64587,0.61973],
        [0.51272,0.64587,0.61973,0.38349,0.53589,0.50123],
        [0.38349,0.53589,0.50123,0.3727,0.42187,0.48656],
        [0.3727,0.42187,0.48656,0.40107,0.35106,0.50825]],
       [[0.763,0.65403,0.75965,0.57562,0.64659,0.51993],
        [0.57562,0.64659,0.51993,0.47349,0.56085,0.42277],
        [0.47349,0.56085,0.42277,0.46011,0.48089,0.42706],
        [0.46011,0.48089,0.42706,0.47873,0.41604,0.46468]]])

anotherFrameOfData = nj.array([[[0.93268,0.41025, 1,0.93268,0.41025, 1],
        [0.93268,0.41025, 1,0.77982,0.31859,0.94334],
        [0.77982,0.31859,0.94334,0.67975,0.26487,0.817],
        [0.67975,0.26487,0.817,0.62434,0.2475,0.69708]],
       [[0.86318,0.47652, 1,0.70162,0.44857,0.71131],
        [0.70162,0.44857,0.71131,0.56798,0.40612,0.54572],
        [0.56798,0.40612,0.54572,0.50133,0.37676,0.44079],
        [0.50133,0.37676,0.44079,0.46005,0.35294,0.36041]],
       [[0.87006,0.52443, 1,0.72933,0.53369,0.69758],
        [0.72933,0.53369,0.69758,0.59337,0.55495,0.47567],
        [0.59337,0.55495,0.47567,0.51968,0.56175,0.33437],
        [0.51968,0.56175,0.33437,0.47507,0.56291,0.23571]],
       [[0.88951,0.56844, 1,0.77889,0.61155,0.70946],
        [0.77889,0.61155,0.70946,0.65825,0.63953,0.49807],
        [0.65825,0.63953,0.49807,0.58893,0.65133,0.35812],
        [0.58893,0.65133,0.35812,0.54561,0.65604,0.25913]],
       [[0.93506,0.59941, 1,0.84104,0.6723,0.71608],
        [0.84104,0.6723,0.71608,0.74723,0.71915,0.55967],
        [0.74723,0.71915,0.55967,0.69852,0.74016,0.46543],
        [0.69852,0.74016,0.46543,0.65832,0.7548,0.37713]]])

let frameIdx = 0;
let flipFlop = false;

function draw(){
  clear();
  frameIdx++;
  if (frameIdx === 100){
      frameIdx = 0;
      flipFlop = !flipFlop
  }

  console.log(flipFlop)

  for(fingerIdx = 0; fingerIdx < oneFrameofData.shape[0]; fingerIdx++){
    for(boneIdx=0; boneIdx<oneFrameofData.shape[1]; boneIdx++){
      if(flipFlop){
        xStart = oneFrameofData.get(fingerIdx,boneIdx,0)
        yStart = oneFrameofData.get(fingerIdx,boneIdx,1)
        zStart = oneFrameofData.get(fingerIdx,boneIdx,2)
        xEnd = oneFrameofData.get(fingerIdx,boneIdx,3)
        yEnd = oneFrameofData.get(fingerIdx,boneIdx,4)
        zEnd = oneFrameofData.get(fingerIdx,boneIdx,5)

        //scale data for display
        var xStart = window.innerWidth * xStart;
        xStart = xStart.toFixed(1)
        var yStart = window.innerHeight * (1 - yStart);
        yStart = yStart.toFixed(1)

        var xEnd = window.innerWidth * xEnd;
        xEnd = xEnd.toFixed(1)
        var yEnd = window.innerHeight * (1 - yEnd);
        yEnd = yEnd.toFixed(1)
        strokeWeight(8)
        line(xStart,yStart,xEnd,yEnd);
      }
      else{
        xStart = anotherFrameOfData.get(fingerIdx,boneIdx,0)
        yStart = anotherFrameOfData.get(fingerIdx,boneIdx,1)
        zStart = anotherFrameOfData.get(fingerIdx,boneIdx,2)
        xEnd = anotherFrameOfData.get(fingerIdx,boneIdx,3)
        yEnd = anotherFrameOfData.get(fingerIdx,boneIdx,4)
        zEnd = anotherFrameOfData.get(fingerIdx,boneIdx,5)
        

        //scale data for display
        var xStart = window.innerWidth * xStart;
        xStart = xStart.toFixed(1)
        var yStart = window.innerHeight * (1 - yStart);
        yStart = yStart.toFixed(1)

        var xEnd = window.innerWidth * xEnd;
        xEnd = xEnd.toFixed(1)
        var yEnd = window.innerHeight * (1 - yEnd);
        yEnd = yEnd.toFixed(1)
        strokeWeight(8)
        line(xStart,yStart,xEnd,yEnd);
      }
    }
  }

  console.log(xStart)
  console.log(yStart)
}
