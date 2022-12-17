var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initPyodide, PyodideClient } from "pyodide-worker-runner";
import { makeChannel } from "sync-message";
export class TraceGenerator {
    constructor(pyodide, init, archive) {
        this.pyodide = pyodide;
        this.pyodide.unpackArchive(archive, "zip");
        this.pkg = this.pyodide.pyimport("code_example");
        if (init) {
            this.initPyodide();
        }
    }
    initPyodide() {
        initPyodide(this.pyodide);
    }
    generateTrace(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pkg.test_function(code);
        });
    }
}
export class TraceGeneratorV2 {
    constructor() {
        const channel = makeChannel();
        this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
    }
    doStuff() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Start to do stuff");
            const res = this.client.call(this.client.workerProxy.doStuff, 1, 2);
            return res;
        });
    }
    generateTrace() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Running tracegen");
            const res = this.client.call(this.client.workerProxy.runCode, "print('hello world')", "code");
            return res;
        });
    }
}
