import { PyodideExtras } from "pyodide-worker-runner";
export declare class PythonWorker {
    private pyodide;
    private pkg;
    /**
     * @return {any} Function to expose a method with Pyodide support
     */
    protected syncExpose(): any;
    constructor();
    launch(): Promise<void>;
    private loadPyodide;
    runCode(_syncExtras: PyodideExtras, code: string, code2: string): Promise<any>;
}
