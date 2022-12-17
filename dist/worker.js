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
import { pyodideExpose } from "pyodide-worker-runner";
class PythonWorker {
    //private pyodide: PyodideInterface;
    /**
     * @return {any} Function to expose a method with Pyodide support
     */
    syncExpose() {
        return pyodideExpose;
    }
    constructor() {
        //this.pyodide = pyodide;
    }
    runCode(extras, code) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(extras);
            console.log(code);
        });
    }
}
// Expose classes and functions as usual with Comlink.
Comlink.expose(new PythonWorker());
/**
   {
 // Wrap individual functions with syncExpose.
 // This lets them receive an extra parameter 'syncExtras' at the beginning.
 // SyncClient.call sends through extra objects behind the scenes needed to construct syncExtras.
 // The remaining parameters after syncExtras are the arguments passed to SyncClient.call after the proxy method.

 runCode: pyodideExpose((extras, code, pyodide) => {
   console.log("Running code in worker");
   if (extras.interruptBuffer) {  // i.e. if SharedArrayBuffer is available so this could be sent by the client
       //pyodide.setInterruptBuffer(extras.interruptBuffer);
   }
   return 3;//pkg.test_function(code);
 }),
});
*/ 
