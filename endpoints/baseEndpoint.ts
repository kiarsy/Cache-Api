
type DataType = {
    data: any,
    statusCode: number
}

export abstract class BaseEndpoint {
    private path: string;
    private verb: string;

    getPath(): string {
        return this.path;
    }

    getVerb(): string {
        return this.verb;
    }


    constructor(path: string, verb: string) {
        this.path = path;
        this.verb = verb

    }

    abstract endpointFunction(params: any, body: any, response: (result: DataType) => void): Promise<void>;
}