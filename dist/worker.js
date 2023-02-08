import * as Comlink from "comlink";
import { PythonTraceGeneratorWorker } from "./TraceGeneratorWorker";
let worker = new PythonTraceGeneratorWorker();
Comlink.expose(worker);
