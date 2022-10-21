import { generateCheckerBoard, generateCheckerBoardArray, generateCheckerBoard2dArray, memory, CHECKERBOARD_BUFFER_POINTER, CHECKERBOARD_BUFFER_SIZE, CHECKERBOARD_SIZE } from "./build/release.js";

const runWasm = async () => {

  // Create a Uint8Array to give us access to Wasm Memory
  const wasmByteMemoryArray = new Uint8Array(memory.buffer);

  // Get our canvas element from our index.html
  const canvasElement = document.querySelector("canvas");

  // Set up Context and ImageData on the canvas
  const canvasContext = canvasElement.getContext("2d");
  const canvasImageData = canvasContext.createImageData(
    canvasElement.width,
    canvasElement.height
  );

  // Clear the canvas
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

  const getDarkValue = () => {
    return Math.floor(Math.random() * 100);
  };

  const getLightValue = () => {
    return Math.floor(Math.random() * 127) + 127;
  };

  const drawCheckerBoard = () => {
    const checkerBoardSize = 20;

    // Generate a new checkboard in wasm
    generateCheckerBoard(
      getDarkValue(),
      getDarkValue(),
      getDarkValue(),
      getLightValue(),
      getLightValue(),
      getLightValue()
    );

    // Pull out the RGBA values from Wasm memory, the we wrote to in wasm,
    // starting at the checkerboard pointer (memory array index)
    const imageDataArray = wasmByteMemoryArray.slice(
      CHECKERBOARD_BUFFER_POINTER.valueOf(),
      CHECKERBOARD_BUFFER_SIZE.valueOf()
    );

    // Set the values to the canvas image data
    canvasImageData.data.set(imageDataArray);

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Place the new generated checkerboard onto the canvas
    canvasContext.putImageData(canvasImageData, 0, 0);
  };

  const drawCheckerBoardArray = () => {
    const checkerBoardSize = 20;

    // Generate a new checkboard in wasm
    const imageDataArray = generateCheckerBoardArray(
      getDarkValue(),
      getDarkValue(),
      getDarkValue(),
      getLightValue(),
      getLightValue(),
      getLightValue()
    );

    // Set the values to the canvas image data
    canvasImageData.data.set(imageDataArray);

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Place the new generated checkerboard onto the canvas
    canvasContext.putImageData(canvasImageData, 0, 0);
  };

  const drawCheckerBoard2dArray = () => {
    const checkerBoardSize = 20;

    // Generate a new checkboard in wasm
    const result = generateCheckerBoard2dArray(
      getDarkValue(),
      getDarkValue(),
      getDarkValue(),
      getLightValue(),
      getLightValue(),
      getLightValue()
    );
    const imageDataArray = []

    for(let i = 0; i < result.length; i++){
      for(let j = 0; j < result[i].length; j++){
        let squareNumber = j * CHECKERBOARD_SIZE + i
        let squareRgbaIndex = squareNumber * 4
        imageDataArray[squareRgbaIndex] = result[i][j][0]
        imageDataArray[squareRgbaIndex + 1] = result[i][j][1]
        imageDataArray[squareRgbaIndex + 2] = result[i][j][2]
        imageDataArray[squareRgbaIndex + 3] = result[i][j][3]
      }
    }

    // Set the values to the canvas image data
    canvasImageData.data.set(imageDataArray);

    // Clear the canvas
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Place the new generated checkerboard onto the canvas
    canvasContext.putImageData(canvasImageData, 0, 0);
  };

  drawCheckerBoard2dArray();
  setInterval(() => {
    drawCheckerBoard2dArray();
  }, 1000);
};
runWasm();