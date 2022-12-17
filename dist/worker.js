import * as Comlink from "comlink";
import { syncExpose } from "comsync";
import { pyodideExpose } from "pyodide-worker-runner";
// Expose classes and functions as usual with Comlink.
Comlink.expose({
    // Wrap individual functions with syncExpose.
    // This lets them receive an extra parameter 'syncExtras' at the beginning.
    // SyncClient.call sends through extra objects behind the scenes needed to construct syncExtras.
    // The remaining parameters after syncExtras are the arguments passed to SyncClient.call after the proxy method.
    doStuff: syncExpose((syncExtras, arg1, arg2) => {
        // syncExtras provides an improved interface for reading messages over raw sync-message.
        console.log("Running stuff");
        const message = syncExtras.readMessage();
        console.log(message);
        return arg1 + arg2;
    }),
    runCode: pyodideExpose((extras, buffer, pyodide) => {
        console.log("Running code in worker");
        if (extras.interruptBuffer) { // i.e. if SharedArrayBuffer is available so this could be sent by the client
            pyodide.setInterruptBuffer(extras.interruptBuffer);
        }
        console.log(extras);
        console.log(buffer);
        console.log(pyodide);
        return pyodide;
    }),
});
