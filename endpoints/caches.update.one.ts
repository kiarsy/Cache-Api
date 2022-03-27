import { KeyAlreadyExistedException, ValidationFailedException, OperationFailedException, KeyNotFoundException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"



class UpdateOneCachesEndpoint extends BaseEndpoint {

    constructor() {
        super('/caches/:key', 'PUT')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {

        var entity = undefined;
        try {
            entity = await cacheEntryModel.findOneAndUpdate(
                { key: params.key },
                { value: body.value, time: new Date().getTime() },
                { new: true });


        } catch (err) {
            if (err instanceof (Error)) {
                //THIS WILL CHECK IF DUPLICATED KEY EXCEPTION OCCUR,
                // KEY IS UNIQUE
                if (err.message.indexOf('E11000') >= 0) {
                    throw new KeyAlreadyExistedException();
                }
                else if (err.name == "ValidationError") {
                    //If any field missed from input
                    throw new ValidationFailedException();
                }
                //If any other error occur an insertFAildedException will returned
                console.log(err)
                throw new OperationFailedException()
            }
        }
        if (!entity) {
            throw new KeyNotFoundException();
        }
        response({
            data: { msg: "Entry successfully Updated" },
            statusCode: 200
        });
    }
}

export default new UpdateOneCachesEndpoint()