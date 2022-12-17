import { TypedArray, PyodideInterface } from "pyodide";
export declare function generateTrace(code: string, pyodide: PyodideInterface, archive: TypedArray | ArrayBuffer, format: string, init: Boolean): Promise<string>;
export declare class TraceGenerator {
    private pyodide;
    private pkg;
    constructor(pyodide: PyodideInterface, init: boolean, archive: TypedArray | ArrayBuffer);
    private initPyodide;
    generateTrace(code: string): Promise<string>;
}
