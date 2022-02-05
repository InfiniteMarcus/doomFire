const firePixelsArray = [];
 
let fireWidth = 61;
let fireHeight = 41;
let invertFire = false;
let grid = false;
let intervalTime = 50;
let debug = false;

const canvas = document.getElementById('fireCanvas');
canvas.width = fireWidth;
canvas.height = fireHeight;
const context = canvas.getContext('2d');
const image = context.createImageData(fireWidth, fireHeight);

const gridCanvas = document.getElementById('grid');
gridCanvas.width = fireWidth;
gridCanvas.height = fireHeight;
let gridContext = gridCanvas.getContext('2d');
let gridImage = gridContext.createImageData(fireWidth, fireHeight);

//Alaranjado - palheta original
const originalFireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},
{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},
{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},
{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},
{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},
{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//Vermelho
const redFireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":0,"b":7},{"r":47,"g":0,"b":7},{"r":71,"g":0,"b":7},{"r":87,"g":0,"b":7},{"r":103,"g":0,"b":7},
{"r":119,"g":7,"b":7},{"r":143,"g":7,"b":7},{"r":159,"g":15,"b":7},{"r":175,"g":15,"b":7},{"r":191,"g":15,"b":7},{"r":199,"g":15,"b":7},
{"r":223,"g":23,"b":7},{"r":223,"g":23,"b":7},{"r":223,"g":23,"b":7},{"r":215,"g":23,"b":7},{"r":215,"g":23,"b":7},{"r":215,"g":23,"b":15},
{"r":207,"g":40,"b":15},{"r":207,"g":40,"b":15},{"r":207,"g":40,"b":15},{"r":207,"g":40,"b":23},{"r":199,"g":55,"b":23},{"r":199,"g":60,"b":23},
{"r":199,"g":85,"b":31},{"r":191,"g":85,"b":31},{"r":191,"g":98,"b":31},{"r":191,"g":98,"b":39},{"r":191,"g":110,"b":39},{"r":191,"g":110,"b":47},
{"r":183,"g":110,"b":47},{"r":183,"g":135,"b":47},{"r":183,"g":135,"b":55},{"r":207,"g":160,"b":111},{"r":223,"g":200,"b":159},{"r":239,"g":230,"b":199},{"r":255,"g":255,"b":255}]

//Azul
const blueFireColorsPalette = [{"r":7,"g":7,"b":7},{"r":7,"g":7,"b":31},{"r":7,"g":15,"b":47},{"r":7,"g":15,"b":71},{"r":7,"g":23,"b":87},{"r":7,"g":31,"b":103},
{"r":7,"g":31,"b":119},{"r":7,"g":39,"b":143},{"r":7,"g":47,"b":159},{"r":7,"g":63,"b":175},{"r":7,"g":71,"b":191},{"r":7,"g":71,"b":199},{"r":7,"g":79,"b":223},
{"r":7,"g":87,"b":223},{"r":7,"g":87,"b":223},{"r":7,"g":95,"b":215},{"r":7,"g":95,"b":215},{"r":15,"g":103,"b":215},{"r":15,"g":111,"b":207},{"r":15,"g":119,"b":207},
{"r":15,"g":127,"b":207},{"r":23,"g":135,"b":207},{"r":23,"g":135,"b":199},{"r":23,"g":143,"b":199},{"r":31,"g":151,"b":199},{"r":31,"g":159,"b":191},{"r":31,"g":159,"b":191},
{"r":39,"g":167,"b":191},{"r":36,"g":167,"b":191},{"r":47,"g":175,"b":191},{"r":47,"g":175,"b":183},{"r":47,"g":183,"b":183},{"r":55,"g":183,"b":183},{"r":111,"g":207,"b":207},
{"r":159,"g":223,"b":223},{"r":199,"g":239,"b":239},{"r":255,"g":255,"b":255}]

//Verde
const greenFireColorsPalette = [{"r":7,"g":7,"b":7},{"r":7,"g":31,"b":7},{"r":15,"g":47,"b":7},{"r":15,"g":71,"b":7},{"r":23,"g":87,"b":7},{"r":31,"g":103,"b":7},
{"r":31,"g":119,"b":7},{"r":39,"g":143,"b":7},{"r":47,"g":159,"b":7},{"r":65,"g":175,"b":7},{"r":71,"g":191,"b":7},{"r":71,"g":199,"b":7},{"r":79,"g":223,"b":7},
{"r":87,"g":223,"b":7},{"r":87,"g":223,"b":7},{"r":95,"g":215,"b":7},{"r":95,"g":215,"b":7},{"r":103,"g":215,"b":15},{"r":111,"g":207,"b":15},{"r":119,"g":207,"b":15},
{"r":127,"g":207,"b":15},{"r":135,"g":207,"b":23},{"r":135,"g":199,"b":23},{"r":143,"g":199,"b":23},{"r":151,"g":199,"b":31},{"r":159,"g":191,"b":31},{"r":159,"g":191,"b":31},
{"r":167,"g":191,"b":39},{"r":167,"g":191,"b":39},{"r":175,"g":191,"b":47},{"r":175,"g":183,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},
{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//Arco-iris
const rainbowFireColorsPalette = [{"r":7,"g":7,"b":7},{"r":150,"g":15,"b":15},{"r":180,"g":23,"b":59},{"r":207,"g":17,"b":11},{"r":213,"g":13,"b":55},{"r":239,"g":47,"b":47},{"r":255,"g":0,"b":0},
{"r":199,"g":143,"b":23},{"r":199,"g":135,"b":23},{"r":207,"g":135,"b":23},{"r":207,"g":127,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":111,"b":15},
{"r":191,"g":191,"b":0},{"r":167,"g":167,"b":0},{"r":159,"g":159,"b":0},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":199,"g":151,"b":31},
{"r":80,"g":207,"b":15},{"r":100,"g":207,"b":15},{"r":103,"g":215,"b":15},{"r":95,"g":215,"b":7},{"r":95,"g":215,"b":7},{"r":87,"g":223,"b":7},{"r":87,"g":223,"b":7},
{"r":7,"g":79,"b":223},{"r":7,"g":71,"b":199},{"r":7,"g":71,"b":191},{"r":7,"g":63,"b":175},{"r":7,"g":47,"b":159},{"r":7,"g":39,"b":143},{"r":7,"g":31,"b":119},
{"r":113,"g":31,"b":113},{"r":98,"g":23,"b":98},{"r":87,"g":15,"b":87},{"r":71,"g":15,"b":71},{"r":51,"g":7,"b":51}]

let colors = [originalFireColorsPalette, redFireColorsPalette, blueFireColorsPalette, greenFireColorsPalette, rainbowFireColorsPalette]
let fireColorsPalette = originalFireColorsPalette;
let actualColor = 0;

function start() {
    createFireDataStructure();
    createFireSource();
    renderFire();
    
    setTimeout(calculateFirePropagation, intervalTime);
}

function mySetInterval() {
    setTimeout(calculateFirePropagation, intervalTime);
}

function createFireDataStructure(){
    const numberPixels = fireHeight * fireWidth;

    for(let i = 0; i < numberPixels; i++)
        firePixelsArray[i] = 0
}

function calculateFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row);
            updateFireIntensity(pixelIndex);
        }
    }
    renderFire();
    renderGrid();
    mySetInterval();
}

function updateFireIntensity(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;

    if(belowPixelIndex >= fireWidth * fireHeight) return;

    const decay = Math.floor(Math.random() * 3);
    const belowPixelIntensity = firePixelsArray[belowPixelIndex];
    const newFireIntensity = belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0;

    const index = invertFire ? currentPixelIndex + decay : currentPixelIndex - decay;

    firePixelsArray[index] = newFireIntensity;
}

function renderFire() {
    for (let pixelIndex = 0; pixelIndex < firePixelsArray.length; pixelIndex++) {
      const fireIntensity = firePixelsArray[pixelIndex];
      const color = fireColorsPalette[fireIntensity];
  
      image.data[pixelIndex * 4] = color.r;
      image.data[pixelIndex * 4 + 1] = color.g;
      image.data[pixelIndex * 4 + 2] = color.b;
      image.data[pixelIndex * 4 + 3] = 255;
    }
  
    context.putImageData(image, 0, 0);
}

function renderGrid(){
    if(grid) {
        let pixelIndex = 0
        for(let heightGrid = 0; heightGrid < fireHeight; heightGrid++) {
            for(let widthGrid = 0; widthGrid < fireWidth; widthGrid++) {
                if(widthGrid%2 || heightGrid%2){
                    gridImage.data[pixelIndex * 4] = 0;
                    gridImage.data[pixelIndex * 4 + 1] = 0;
                    gridImage.data[pixelIndex * 4 + 2] = 0;
                    gridImage.data[pixelIndex * 4 + 3] = 255;
                }
                pixelIndex++;
            }
        }
        return gridContext.putImageData(gridImage, 0, 0);
    }
    gridContext.clearRect(0, 0, fireWidth, fireHeight);
}

function createFireSource(){
    const overflowPixelIndex = fireWidth * fireHeight;

    for (let column = 0; column <= fireWidth; column++) {
        const pixelIndex = (overflowPixelIndex - fireWidth) + column;
        firePixelsArray[pixelIndex] = 36;
    }

}

function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight;
      const pixelIndex = (overflowPixelIndex - fireWidth) + column;
  
      firePixelsArray[pixelIndex] = 0;
    }
  }

  function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight;
      const pixelIndex = (overflowPixelIndex - fireWidth) + column;
      const currentFireIntensity = firePixelsArray[pixelIndex];
  
      if (currentFireIntensity < 36) {
        const increase = Math.floor(Math.random() * 14);
        const newFireIntensity =
          currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase;
  
        firePixelsArray[pixelIndex] = newFireIntensity;
      }
    }
  }

  function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight;
      const pixelIndex = (overflowPixelIndex - fireWidth) + column;
      const currentFireIntensity = firePixelsArray[pixelIndex];
  
      if (currentFireIntensity > 0) {
        const decay = Math.floor(Math.random() * 14)
        const newFireIntensity =
          currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0;
  
        firePixelsArray[pixelIndex] = newFireIntensity;
      }
    }
  }

/*
    Funções para mudar opções do fogo
    por @infinitemarcus
*/

function fireWind(){
    invertFire = !invertFire;
}

function changeColor(){
    actualColor++;

    if(actualColor === colors.length)
        actualColor = 0;

    fireColorsPalette = colors[actualColor];

    createFireDataStructure();
    createFireSource();
}

function gridChange(){
    grid = !grid;
}

function increaseIntervalTime(){
    intervalTime = intervalTime + 10 < 200 ? intervalTime += 10 : 200;
}

function decreaseIntervalTime(){
    intervalTime = intervalTime - 10 > 0 ? intervalTime -= 10 : 0;
}

function normalizeIntervalTime(){
    intervalTime = 50;
}

start();