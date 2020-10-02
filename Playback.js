let oneFrameofData = nj.array([[[  768.35282,    163.725,    68.9342,  768.35282,    163.725,    68.9342],
        [  768.35282,    163.725,    68.9342,   637.5183,    143.746,     35.707],
        [   637.5183,    143.746,     35.707,  577.29482,    132.166,     7.0896],
        [  577.29482,    132.166,     7.0896,  556.18304,    125.968,   -14.9005]],
       [[  808.26892,    142.073,    69.9662,  723.44205,    109.024,    7.47894],
        [  723.44205,    109.024,    7.47894,  691.49877,     93.113,   -31.6833],
        [  691.49877,     93.113,   -31.6833,  673.47712,    103.888,   -52.8808],
        [  673.47712,    103.888,   -52.8808,  666.80592,    119.238,   -60.2119]],
       [[  856.72792,    139.796,    66.6778,  814.99047,     108.45,    5.16013],
        [  814.99047,     108.45,    5.16013,  800.45131,     93.234,   -40.4417],
        [  800.45131,     93.234,   -40.4417,  772.63758,    106.073,   -64.9182],
        [  772.63758,    106.073,   -64.9182,  752.08053,     122.44,   -72.7196]],
       [[   905.7595,    140.757,    63.3365,  907.23047,    113.405,    6.98481],
        [  907.23047,    113.405,    6.98481,  910.23609,     102.73,   -36.3949],
        [  910.23609,     102.73,   -36.3949,  881.19273,    117.691,   -58.6406],
        [  881.19273,    117.691,   -58.6406,  854.55204,    134.443,   -63.8806]],
       [[  951.21621,    148.878,    59.1806,  987.30611,    122.721,     8.1624],
        [  987.30611,    122.721,     8.1624, 1043.66926,    118.223,   -24.1886],
        [ 1043.66926,    118.223,   -24.1886, 1028.48096,    128.615,   -40.3513],
        [ 1028.48096,    128.615,   -40.3513,  989.26186,    142.022,   -45.6914]]]);

anotherFrameOfData = nj.array([[[ 667.20629,   285.467,   98.1593, 667.20629,   285.467,   98.1593],
        [ 667.20629,   285.467,   98.1593, 592.91138,   241.116,   84.9689],
        [ 592.91138,   241.116,   84.9689, 544.95668,   210.919,   74.7451],
        [ 544.95668,   210.919,   74.7451, 512.32669,   190.205,   67.6058]],
       [[ 740.92046,   272.611,   105.321, 734.54539,   211.801,   63.9444],
        [ 734.54539,   211.801,   63.9444,  734.4363,   181.594,   33.3948],
        [  734.4363,   181.594,   33.3948, 722.36726,   168.854,   13.0806],
        [ 722.36726,   168.854,   13.0806, 707.72614,   162.526,  -2.35447]],
       [[ 786.17708,   274.481,   101.083, 812.89201,   219.916,   58.1307],
        [ 812.89201,   219.916,   58.1307, 812.05659,   191.391,   19.2777],
        [ 812.05659,   191.391,   19.2777, 789.55721,   180.454,  -6.35128],
        [ 789.55721,   180.454,  -6.35128, 764.85187,   176.501,  -23.6348]],
       [[ 825.91546,   278.994,   95.5877,  881.3188,   234.235,   54.0505],
        [  881.3188,   234.235,   54.0505, 872.03843,   214.068,   14.2501],
        [ 872.03843,   214.068,   14.2501,  819.2163,   214.368,  -10.0397],
        [  819.2163,   214.368,  -10.0397, 769.43632,    220.66,  -22.3692]],
       [[ 849.41766,   288.567,   86.8807, 931.44985,   250.536,   48.3024],
        [ 931.44985,   250.536,   48.3024, 941.12729,   240.995,   14.3424],
        [ 941.12729,   240.995,   14.3424, 900.34683,   241.731,  -2.28077],
        [ 900.34683,   241.731,  -2.28077, 845.51273,   245.919,   -11.687]]]);

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
        line(xStart,yStart,xEnd,yEnd);
      }
      else{
        xStart = anotherFrameOfData.get(fingerIdx,boneIdx,0)
        yStart = anotherFrameOfData.get(fingerIdx,boneIdx,1)
        zStart = anotherFrameOfData.get(fingerIdx,boneIdx,2)
        xEnd = anotherFrameOfData.get(fingerIdx,boneIdx,3)
        yEnd = anotherFrameOfData.get(fingerIdx,boneIdx,4)
        zEnd = anotherFrameOfData.get(fingerIdx,boneIdx,5)
        line(xStart,yStart,xEnd,yEnd);
      }
    }
  }

  console.log(xStart)
  console.log(yStart)
}