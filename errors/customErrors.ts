import { BaseError } from "./baseError";

export class OperationFailedException extends BaseError {
    constructor() {
        super(500, 1001, "There was an error during the operation. Please try again later");
    }
}

export class KeyAlreadyExistedException extends BaseError {
    constructor() {
        super(409, 1002, "The key is already existed");
    }
}

export class KeyNotFoundException extends BaseError {
    constructor() {
        super(404, 1003, "Requested Key Not Found");
    }
}

export class ValidationFailedException extends BaseError {
    constructor() {
        super(400, 1004, "Please enter all the fields");
    }
}