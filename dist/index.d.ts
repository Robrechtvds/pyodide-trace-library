import { TypedArray, PyodideInterface } from "pyodide";
export declare function generateTrace(code: string, pyodide: PyodideInterface, archive: TypedArray | ArrayBuffer, format: string): Promise<any>;
