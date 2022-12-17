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

  constructor() {
    const channel = makeChannel();
    this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
  }

  public async doStuff() {
    console.log("Start to do stuff");

    const res =  this.client.call(this.client.workerProxy.doStuff, 1, 2);
    return res;
  }

  public async generateTrace() {
    console.log("Running tracegen");
    const res = this.client.call(this.client.workerProxy.runCode, "print('hello world')", "code");
    return res;
  }
}