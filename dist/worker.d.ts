export {};
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
