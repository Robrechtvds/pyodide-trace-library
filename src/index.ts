import { loadPyodide, TypedArray } from "pyodide";

async function run_python_code(code: string, archive: TypedArray|ArrayBuffer, format: string) {
  let pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/",
  });

  //let zipResponse = await fetch("./assets/python.zip");
  //let data = readFileSync('src/assets/python.zip');

  pyodide.unpackArchive(archive, format);
  let pkg = pyodide.pyimport("code_example");
  return pkg.test_function(code);
}

export function generateTrace(code: string, archive: TypedArray|ArrayBuffer, format: string) {
  console.log("Running code");

  return run_python_code(code, archive, format);
}