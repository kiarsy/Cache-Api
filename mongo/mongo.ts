import events from 'events';
import mongoose from 'mongoose';

export class MongoDatabaseConnection {
    private username = undefined;
    private password = undefined;
    private server = "localhost";
    private port = 27017;
    private dbname = "cache";

    constructor() {
    }

    connect() {
        var uri = undefined;
        if (this.username) {
            uri = `mongodb://${this.username}:${this.password}@${this.server}:${this.port}/${this.dbname}`;
        }
        else {
            uri = `mongodb://${this.server}:${this.port}/${this.dbname}`;
        }

        mongoose.connect(uri);
        const connection: events.EventEmitter = mongoose.connection;
        return connection;
    }

}