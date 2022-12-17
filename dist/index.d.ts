import { TypedArray, PyodideInterface } from "pyodide";
export declare class TraceGenerator {
    private pyodide;
    private pkg;
    constructor(pyodide: PyodideInterface, init: boolean, archive: TypedArray | ArrayBuffer);
    private initPyodide;
    generateTrace(code: string): Promise<string>;
}
export declare class TraceGeneratorV2 {
    private client;
    private pyodide;
    private pkg;
    constructor(pyodide: PyodideInterface, init: boolean, archive: TypedArray | ArrayBuffer);
    generateTrace(): Promise<any>;
}
