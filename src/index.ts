import { loadPyodide } from "pyodide";
import { readFileSync } from 'fs';

async function run_python_code(code: string) {
  let pyodide = await loadPyodide();

  //let zipResponse = await fetch("./assets/python.zip");
  let data = readFileSync('src/assets/python.zip');

  // Slice (copy) its segment of the underlying ArrayBuffer
  let ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);

  pyodide.unpackArchive(ab, "zip");
  let pkg = pyodide.pyimport("code_example");
  return pkg.test_function(code);
}

export function generateTrace(code: string) {
  console.log("Running code");
  return run_python_code(code);
}