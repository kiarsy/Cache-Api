import { OperationFailedException, KeyAlreadyExistedException, ValidationFailedException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"


class CreateOneCachesEndpoint extends BaseEndpoint {

    constructor() {
        super('/caches/', 'POST')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {

        try {
            await cacheEntryModel.insertOne(body.key, body.value, 0)
            response({
                data: { msg: "Entry successfully Added" },
                statusCode: 201
            });

        } catch (err) {
            if (err instanceof (Error)) {
                // THIS WILL CHECK IF DUPLICATED KEY EXCEPTION OCCUR,
                // KEY IS UNIQUE
                if (err.message.indexOf('E11000') >= 0) {
                    throw new KeyAlreadyExistedException();
                }
                else if (err.name == "ValidationError") {
                    // If any field missed from input
                    throw new ValidationFailedException();
                }
                // If any other error occur an insertFAildedException will returned
                console.log(err)
                throw new OperationFailedException()
            }
        }
    }
}

export default new CreateOneCachesEndpoint()