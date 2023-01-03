export declare class TraceGenerator {
    private client;
    constructor();
    setup(): Promise<void>;
    generateTrace(code: string, clearInput?: boolean): Promise<string>;
    pushInput(input: string): Promise<void>;
    popInput(): Promise<void>;
}
