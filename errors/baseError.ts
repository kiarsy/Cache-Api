
export class BaseError extends Error {
    private errorCode: number;
    private httpCode: number;
    private errorDescripton: string;


    constructor(httpCode: number = 500, errorCode: number, errorDescripton: string) {
        super();
        this.httpCode = httpCode;
        this.errorCode = errorCode;
        this.errorDescripton = errorDescripton;
    }

    makeResponse(): { httpCode: number; error: any } {
        return {
            httpCode: this.httpCode,
            error: {
                code: this.errorCode,
                description: this.errorDescripton
            }
        }
    }
}