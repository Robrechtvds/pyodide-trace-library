var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PyodideClient } from "pyodide-worker-runner";
import { makeChannel } from "sync-message";
export class TraceGenerator {
    constructor() {
        const channel = makeChannel();
        this.client = new PyodideClient(() => new Worker(new URL("./worker.js", import.meta.url)), channel);
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.call(this.client.workerProxy.launch);
        });
    }
    generateTrace(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.call(this.client.workerProxy.runCode, code);
        });
    }
}
