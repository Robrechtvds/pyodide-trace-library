import { PyodideInterface, PyProxy } from "pyodide";
import { PyodideExtras } from "pyodide-worker-runner";
export declare class PythonTraceGeneratorWorker {
    private pyodide;
    private pkg;
    private inputSt;
    /**
     * @return {any} Function to expose a method with Pyodide support
     */
    protected syncExpose(): any;
    constructor(pyodide?: PyodideInterface, proxy?: PyProxy);
    launch(): Promise<void>;
    private getPyodide;
    generateTraceCode(_syncExtras: PyodideExtras, code: string, clearInput?: boolean): Promise<string>;
    pushInput(input: string): void;
    popInput(): void;
    clearInput(): void;
}
