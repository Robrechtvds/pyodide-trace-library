import { TypedArray, PyodideInterface } from "pyodide";

async function run_python_code(code: string, pyodide: PyodideInterface, archive: TypedArray|ArrayBuffer, format: string) {

  //let zipResponse = await fetch("./assets/python.zip");
  //let data = readFileSync('src/assets/python.zip');

  pyodide.unpackArchive(archive, format);
  let pkg = pyodide.pyimport("code_example");
  return pkg.test_function(code);
}

export function generateTrace(code: string, pyodide: PyodideInterface, archive: TypedArray|ArrayBuffer, format: string) {
  console.log("Running code");

  return run_python_code(code, pyodide, archive, format);
}