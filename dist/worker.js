var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Comlink from "comlink";
import { pyodideExpose, loadPyodideAndPackage } from "pyodide-worker-runner";
const pythonPackageUrl = require("!!file-loader!./python.zip").default; //TODO: Does not load in properaly atm! Has to be dropped in manualy
class PythonWorker {
    /**
     * @return {any} Function to expose a method with Pyodide support
     */
    syncExpose() {
        return pyodideExpose;
    }
    constructor() {
        this.runCode = this.syncExpose()(this.runCode.bind(this));
        this.pyodide = {};
        this.pkg = {};
        this.inputSt = [];
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pyodide = yield this.loadPyodide();
            this.pkg = this.pyodide.pyimport("code_example");
            console.log("Pyodide has loaded with great success in the worker");
        });
    }
    loadPyodide() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield loadPyodideAndPackage({ url: pythonPackageUrl, format: ".zip" });
        });
    }
    runCode(_syncExtras, code, clearInput = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (clearInput)
                this.inputSt = [];
            let inputString;
            if (this.inputSt.length) {
                inputString = JSON.stringify(this.inputSt);
            }
            else {
                inputString = false;
            }
            return this.pkg.test_function(code, inputString);
        });
    }
    pushInput(input) {
        this.inputSt.push(input);
    }
    popInput() {
        this.inputSt.pop();
    }
}
let worker = new PythonWorker();
Comlink.expose(worker);
