"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceGenerator = exports.generateTrace = void 0;
const pyodide_worker_runner_1 = require("pyodide-worker-runner");
function generateTrace(code, pyodide, archive, format, init) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only initialize the PyodideInterface if it has not been done
        if (init) {
            (0, pyodide_worker_runner_1.initPyodide)(pyodide);
        }
        pyodide.unpackArchive(archive, format);
        let pkg = pyodide.pyimport("code_example");
        return pkg.test_function(code);
    });
}
exports.generateTrace = generateTrace;
class TraceGenerator {
    constructor(pyodide, init, archive) {
        this.pyodide = pyodide;
        this.pyodide.unpackArchive(archive, "zip");
        this.pkg = this.pyodide.pyimport("code_example");
        if (init) {
            this.initPyodide();
        }
    }
    initPyodide() {
        (0, pyodide_worker_runner_1.initPyodide)(this.pyodide);
    }
    generateTrace(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pkg.test_function(code);
        });
    }
}
exports.TraceGenerator = TraceGenerator;
