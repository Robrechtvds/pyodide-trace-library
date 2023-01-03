import { PyodideClient } from "pyodide-worker-runner";
import { makeChannel } from "sync-message";

export class TraceGenerator {
  private client: PyodideClient;

  constructor() {
    const channel = makeChannel();
    this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
  }

  public async setup(): Promise<void> {
    await this.client.call(this.client.workerProxy.launch);
  }

  public async generateTrace(code: string, clearInput: boolean = false): Promise<string> {
    return this.client.call(this.client.workerProxy.runCode, code, clearInput);
  }

  public async pushInput(input: string): Promise<void> {
    await this.client.workerProxy.pushInput(input);
  }

  public async popInput(): Promise<void> {
    await this.client.call(this.client.workerProxy.popInput);
  }
}