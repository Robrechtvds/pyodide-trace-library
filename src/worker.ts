import * as Comlink from "comlink";
import { PyodideInterface, PyProxy } from "pyodide";
import { pyodideExpose, PyodideExtras, loadPyodideAndPackage } from "pyodide-worker-runner";

const pythonPackageUrl = require("!!file-loader!./python.zip").default; //TODO: Does not load in properaly atm! Has to be dropped in manualy

export class PythonTraceGeneratorWorker {
    private pyodide: PyodideInterface;
    private pkg: PyProxy;
    private inputSt: string[];

    /**
     * @return {any} Function to expose a method with Pyodide support
     */
     protected syncExpose(): any {
        return pyodideExpose;
    }

    constructor(other: string, pyodide?: PyodideInterface, proxy?: PyProxy, f?: () => PyodideInterface) {

        this.generateTraceCode = this.syncExpose()(this.generateTraceCode.bind(this));

        if (pyodide !== undefined && proxy !== undefined) {
            console.log(pyodide.version);
            console.log(other);
            this.pyodide = pyodide;
            this.pkg = proxy;
            console.log("Pyodide has loaded with great success in the worker");
        } else {
            this.pyodide = {} as PyodideInterface;
            this.pkg = {} as PyProxy;
        }
        if (f !== undefined) {
            console.log(f().version);
            console.log("Was here");
        }
        this.inputSt = [];
    }

    public async launch(): Promise<void> {
        this.pyodide = await this.getPyodide();
        this.pkg = this.pyodide.pyimport("code_example");
        console.log("Pyodide has loaded with great success in the worker");
    }

    private async getPyodide(): Promise<PyodideInterface> {
        return await loadPyodideAndPackage({ url: pythonPackageUrl, format: ".zip" });
    }

    public async generateTraceCode(_syncExtras: PyodideExtras, code: string, clearInput: boolean = false): Promise<string> {
        if (clearInput) this.inputSt = [];

        let inputString;
        if (this.inputSt.length) {
            inputString = JSON.stringify(this.inputSt);
        } else {
            inputString = false;
        }
        return this.pkg.test_function(code, inputString);
    }

    public pushInput(input: string): void {
        this.inputSt.push(input);
      }
    
    public popInput(): void {
        this.inputSt.pop();
    }
}

let worker = new PythonTraceGeneratorWorker();
Comlink.expose(worker);