import { TypedArray, PyodideInterface, PyProxy } from "pyodide";
import { initPyodide, PyodideClient } from "pyodide-worker-runner";
import { makeChannel } from "sync-message";
import { SyncClient } from "comsync";

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

export class TraceGeneratorV2 {
  private client: PyodideClient;
  private pyodide: PyodideInterface;
  private pkg: PyProxy;

  constructor(pyodide: PyodideInterface, init: boolean, archive: TypedArray|ArrayBuffer) {
    this.pyodide = pyodide;
    this.pyodide.unpackArchive(archive, "zip");
    this.pkg = this.pyodide.pyimport("code_example");
    if (init) {
      initPyodide(this.pyodide); //TODO: Create a pyodide instance if init is false
    }

    const channel = makeChannel();
    this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
  }

  public async generateTrace() {
    const res = this.client.call(this.client.workerProxy.runCode, "print('hello world')", "lol");
    return res;
  }
}