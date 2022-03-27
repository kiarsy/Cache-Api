import { KeyNotFoundException, OperationFailedException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"



class GetOneCachesEndpoint extends BaseEndpoint {

    constructor() {
        super('/caches/:key', 'DELETE')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {
        try {
            var entity = await cacheEntryModel.findOneAndRemove({ "key": params.key })
        }
        catch (error) {
            console.log(error)
            throw new OperationFailedException()
        }
        if (!entity) {
            throw new KeyNotFoundException();
        }
        response({ data: { msg: "Entity were deleted." }, statusCode: 200 });
    }
}

export default new GetOneCachesEndpoint()