console.log("test")



import { MongoDatabaseConnection } from './mongo/mongo';
import cacheEntryModel from './mongo/cacheEntryModel';
var mongoConnection = new MongoDatabaseConnection();


mongoConnection.connect()
    .once("open", async function () {
        console.log("MONGO Connected Successfully.");
    })
    .once("error", function (err) {
        console.log("MONGO Connection Error, Please fix this error and run again:", err);
    });
