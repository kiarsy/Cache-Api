import { BaseError } from "./baseError";

export class OperationFailedException extends BaseError {
    constructor() {
        super(500, 1001, "There was an error during the operation. Please try again later");
    }
}
