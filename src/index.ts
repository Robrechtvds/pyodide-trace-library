import { TypedArray, PyodideInterface } from "pyodide";

export async function generateTrace(code: string, pyodide: PyodideInterface, archive: TypedArray|ArrayBuffer, format: string) :  Promise<string> {
  pyodide.unpackArchive(archive, format);
  let pkg = pyodide.pyimport("code_example");
  return pkg.test_function(code);
}