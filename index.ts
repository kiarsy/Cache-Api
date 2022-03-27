

import { MongoDatabaseConnection } from './mongo/mongo';
import cacheEntryModel from './mongo/cacheEntryModel';
import { WebService } from './webService';
import * as config from './config.json';

import ReturnAllCachesEndpoint from './endpoints/caches.return.all'
import ReturnOneCachesEndpoint from './endpoints/caches.return.one'
import DeleteOneCachesEndpoint from './endpoints/caches.delete.one'
import DeleteAllCachesEndpoint from './endpoints/caches.delete.all'
import CreateOneCachesEndpoint from './endpoints/caches.create.one'
import UpdateOneCachesEndpoint from './endpoints/caches.Update.one'

var mongoConnection = new MongoDatabaseConnection();

const web = new WebService();
web.addEndPoint(ReturnAllCachesEndpoint);
web.addEndPoint(ReturnOneCachesEndpoint);
web.addEndPoint(DeleteOneCachesEndpoint);
web.addEndPoint(DeleteAllCachesEndpoint);
web.addEndPoint(CreateOneCachesEndpoint);
web.addEndPoint(UpdateOneCachesEndpoint);

mongoConnection.connect()
    .once("open", async function () {
        console.log("MONGO Connected Successfully.");
        await cacheEntryModel.initializing(config.maxCacheItem);
        web.startWebService(config.port)
    })
    .once("error", function (err) {
        console.log("MONGO Connection Error, Please fix this error and run again:", err);
    });
