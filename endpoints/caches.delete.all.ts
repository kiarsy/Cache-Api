import { OperationFailedException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"



class GetOneCachesEndpoint extends BaseEndpoint {

    constructor() {
        super('/caches/', 'DELETE')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {

        try {
            await cacheEntryModel.deleteMany({});
            response({ data: { msg: "All entries were deleted" }, statusCode: 200 });
        }
        catch (err) {
            console.log(err)
            throw new OperationFailedException()
        }
    }
}

export default new GetOneCachesEndpoint()