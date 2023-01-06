import { PyodideClient } from "pyodide-worker-runner";
export declare class TraceGenerator {
    private client;
    constructor(channel?: any, client?: PyodideClient);
    setup(): Promise<void>;
    generateTrace(code: string, clearInput?: boolean): Promise<string>;
    pushInput(input: string): Promise<void>;
    popInput(): Promise<void>;
}
export { PythonTraceGeneratorWorker } from "./worker";
