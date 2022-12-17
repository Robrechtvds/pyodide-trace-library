import { TypedArray, PyodideInterface, PyProxy } from "pyodide";
import { initPyodide } from "pyodide-worker-runner";

export class TraceGenerator {

  private pyodide: PyodideInterface;
  private pkg: PyProxy;

  constructor(pyodide: PyodideInterface, init: boolean, archive: TypedArray|ArrayBuffer) {
    this.pyodide = pyodide;
    this.pyodide.unpackArchive(archive, "zip");
    this.pkg = this.pyodide.pyimport("code_example");
    if (init) {
      this.initPyodide()
    }
  }

  private initPyodide(): void {
    initPyodide(this.pyodide);
  }

  public async generateTrace(code: string): Promise<string> {
    return this.pkg.test_function(code);
  }
}