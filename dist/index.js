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
exports.generateTrace = void 0;
const pyodide_1 = require("pyodide");
const fs_1 = require("fs");
function run_python_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        let pyodide = yield (0, pyodide_1.loadPyodide)();
        //let zipResponse = await fetch("./assets/python.zip");
        let data = (0, fs_1.readFileSync)('src/assets/python.zip');
        // Slice (copy) its segment of the underlying ArrayBuffer
        let ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        pyodide.unpackArchive(ab, "zip");
        let pkg = pyodide.pyimport("code_example");
        return pkg.test_function(code);
    });
}
function generateTrace(code) {
    console.log("Running code");
    return run_python_code(code);
}
exports.generateTrace = generateTrace;
let data = (0, fs_1.readFileSync)('src/assets/python.zip');
console.log(data);
