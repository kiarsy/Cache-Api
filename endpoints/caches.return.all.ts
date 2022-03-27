import { OperationFailedException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"



class GetAllCachesEndpoint extends BaseEndpoint {

    constructor() {
        super('/caches', 'GET')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {

        var entries = undefined;
        try {
            entries = await cacheEntryModel.find().select({ "key": 1, "value": 1, "_id": 0 })
            response({ data: entries, statusCode: 200 });
        }
        catch (err) {
            console.log(err)
            throw new OperationFailedException()
        }
    }
}

export default new GetAllCachesEndpoint()