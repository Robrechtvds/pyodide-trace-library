import * as Comlink from "comlink";
import { PyodideInterface, PyProxy } from "pyodide";
import { pyodideExpose, PyodideExtras, loadPyodideAndPackage } from "pyodide-worker-runner";

const pythonPackageUrl = require("!!file-loader!./python.zip").default; //TODO: Does not load in properaly atm! Has to be dropped in manualy

export class PythonWorker {
    private pyodide: PyodideInterface;
    private pkg: PyProxy;

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
    }

    public async launch() {
        this.pyodide = await this.loadPyodide();
        this.pkg = this.pyodide.pyimport("code_example");
        console.log("Pyodide has loaded with great success in the worker");
    }

    private async loadPyodide() {
        return await loadPyodideAndPackage({ url: pythonPackageUrl, format: ".zip" });
    }

    public async runCode(_syncExtras: PyodideExtras, code: string, code2: string) {
        return this.pkg.test_function(code);
    }
}

let worker = new PythonWorker();
worker.launch().then(() => {
    Comlink.expose(worker);
})