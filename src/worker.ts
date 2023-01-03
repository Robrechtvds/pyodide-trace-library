import * as Comlink from "comlink";
import { PyodideInterface, PyProxy } from "pyodide";
import { pyodideExpose, PyodideExtras, loadPyodideAndPackage } from "pyodide-worker-runner";

const pythonPackageUrl = require("!!file-loader!./python.zip").default; //TODO: Does not load in properaly atm! Has to be dropped in manualy

class PythonWorker {
    private pyodide: PyodideInterface;
    private pkg: PyProxy;
    private inputSt: string[];

    /**
     * @return {any} Function to expose a method with Pyodide support
     */
     protected syncExpose(): any {
        return pyodideExpose;
    }

    constructor() {
        this.runCode = this.syncExpose()(this.runCode.bind(this));
        this.pyodide = {} as PyodideInterface;
        this.pkg = {} as PyProxy;
        this.inputSt = [];
    }

    public async launch(): Promise<void> {
        this.pyodide = await this.loadPyodide();
        this.pkg = this.pyodide.pyimport("code_example");
        console.log("Pyodide has loaded with great success in the worker");
    }

    private async loadPyodide() {
        return await loadPyodideAndPackage({ url: pythonPackageUrl, format: ".zip" });
    }

    public async runCode(_syncExtras: PyodideExtras, code: string, clearInput: boolean = false): Promise<string> {
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

let worker = new PythonWorker();
Comlink.expose(worker);