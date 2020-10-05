let oneFrameofData = nj.array([[[0.51053,0.43446, 1,0.51053,0.43446, 1],
        [0.51053,0.43446, 1,0.45159,0.41239,0.79214],
        [0.45159,0.41239,0.79214,0.45229,0.38799,0.56467],
        [0.45229,0.38799,0.56467,0.51925,0.36229,0.45491]],
       [[0.53667,0.52929, 1,0.4646,0.56641,0.59911],
        [0.4646,0.56641,0.59911,0.4429,0.59819,0.31486],
        [0.4429,0.59819,0.31486,0.43396,0.58436,0.15338],
        [0.43396,0.58436,0.15338,0.42998,0.557,0.04645]],
       [[0.58561,0.54293, 1,0.55727,0.58226,0.59411],
        [0.55727,0.58226,0.59411,0.55647,0.63472,0.27876],
        [0.55647,0.63472,0.27876,0.55323,0.63138,0.08644],
        [0.55323,0.63138,0.08644,0.5497,0.61032, 0]],
       [[0.63715,0.5437, 1,0.65183,0.58146,0.62753],
        [0.65183,0.58146,0.62753,0.68652,0.63272,0.34164],
        [0.68652,0.63272,0.34164,0.70395,0.63774,0.15639],
        [0.70395,0.63774,0.15639,0.71289,0.62577,0.03219]],
       [[0.68994,0.51425, 1,0.73722,0.56026,0.66464],
        [0.73722,0.56026,0.66464,0.83021,0.58553,0.48097],
        [0.83021,0.58553,0.48097,0.87783,0.58597,0.37246],
        [0.87783,0.58597,0.37246,0.91595,0.57629,0.27403]]])



anotherFrameOfData = nj.array([[[0.5112,0.43458, 1,0.5112,0.43458, 1],
        [0.5112,0.43458, 1,0.45223,0.41239,0.79229],
        [0.45223,0.41239,0.79229,0.4528,0.38792,0.56484],
        [0.4528,0.38792,0.56484,0.51971,0.36214,0.45503]],
       [[0.53738,0.52938, 1,0.46517,0.56632,0.59912],
        [0.46517,0.56632,0.59912,0.44373,0.59854,0.31494],
        [0.44373,0.59854,0.31494,0.43493,0.58476,0.15344],
        [0.43493,0.58476,0.15344,0.43104,0.55731,0.04656]],
       [[0.58631,0.54299, 1,0.55785,0.58213,0.59403],
        [0.55785,0.58213,0.59403,0.55743,0.63529,0.27898],
        [0.55743,0.63529,0.27898,0.55436,0.63199,0.08665],
        [0.55436,0.63199,0.08665,0.55091,0.61071, 0]],
       [[0.63784,0.54373, 1,0.65242,0.5813,0.62738],
        [0.65242,0.5813,0.62738,0.68712,0.63249,0.34146],
        [0.68712,0.63249,0.34146,0.70453,0.63737,0.1562],
        [0.70453,0.63737,0.1562,0.71343,0.62525,0.03203]],
       [[0.69062,0.51425, 1,0.73781,0.56007,0.66445],
        [0.73781,0.56007,0.66445,0.83078,0.58544,0.48079],
        [0.83078,0.58544,0.48079,0.87838,0.58585,0.37225],
        [0.87838,0.58585,0.37225,0.91644,0.57607,0.27379]]])

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
