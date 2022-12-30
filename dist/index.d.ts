export declare class TraceGenerator {
    private client;
    constructor();
    setup(): Promise<void>;
    generateTrace(code: string): Promise<any>;
}
