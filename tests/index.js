import assert from "assert"
import { add, generateCheckerBoard, memory, CHECKERBOARD_BUFFER_POINTER, CHECKERBOARD_BUFFER_SIZE } from "../build/debug.js"
assert.strictEqual(add(1, 2), 3)

generateCheckerBoard(1, 2, 3, 4, 5, 6)
const wasmByteMemoryArray = new Uint8Array(memory.buffer)
const imageDataArray = wasmByteMemoryArray.slice(
  CHECKERBOARD_BUFFER_POINTER.valueOf(),
  CHECKERBOARD_BUFFER_SIZE.valueOf()
)
assert.strictEqual(imageDataArray.length, CHECKERBOARD_BUFFER_SIZE.valueOf())
assert.strictEqual(imageDataArray[0],1)
assert.strictEqual(imageDataArray[1],2)
assert.strictEqual(imageDataArray[2],3)
assert.strictEqual(imageDataArray[3],255)
assert.strictEqual(imageDataArray[4],4)
assert.strictEqual(imageDataArray[5],5)
assert.strictEqual(imageDataArray[6],6)
assert.strictEqual(imageDataArray[7],255)
console.log("ok")
