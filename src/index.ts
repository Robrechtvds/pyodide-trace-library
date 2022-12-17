import { PyodideClient } from "pyodide-worker-runner";
import { makeChannel } from "sync-message";

export class TraceGenerator {
  private client: PyodideClient;

  constructor() {
    const channel = makeChannel();
    this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
  }

  public async generateTrace(code: string) {
    return this.client.call(this.client.workerProxy.runCode, code);
  }
}