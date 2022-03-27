import { KeyNotFoundException, OperationFailedException } from "../errors/customErrors";
import cacheEntryModel from "../mongo/cacheEntryModel";
import { BaseEndpoint } from "./baseEndpoint"

import {makeDummyString} from '../utilities'

import CreateOneCachesEndpoint from './caches.create.one'

class GetOneCachesEndpoint extends BaseEndpoint {
    constructor() {
        super('/caches/:key', 'GET')
    }

    async endpointFunction(params: any, body: any, response: (result: { data: any; statusCode: number; }) => void): Promise<void> {

        var entry = undefined;
        try {
            entry = await cacheEntryModel.findOne({ "key": params.key });

        }
        catch (error) {
            console.log(error)
            throw new OperationFailedException()
        }
        if (!entry) {
            console.log("Cache Miss")
            var value = makeDummyString();

            CreateOneCachesEndpoint.endpointFunction(params, { key: params.key, value: value }, (result) => {
                if (result.statusCode == 201) {
                    response({ data: { key: params.key, value: value }, statusCode: 200 });
                }
            })
            // throw new KeyNotFoundException()
            return;
        }
        console.log("Cache Hit")
        // entry.time = new Date().getTime();
        // await entry.save();

        response({ data: { key: params.key, value: entry.getValue() }, statusCode: 200 });


    }

}

export default new GetOneCachesEndpoint()