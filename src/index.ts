import { TypedArray, PyodideInterface } from "pyodide";
import { initPyodide } from "pyodide-worker-runner";

export async function generateTrace(code: string, pyodide: PyodideInterface, archive: TypedArray|ArrayBuffer, format: string) :  Promise<string> {

  initPyodide(pyodide);

  pyodide.unpackArchive(archive, format);
  let pkg = pyodide.pyimport("code_example");
  return pkg.test_function(code);
}