
import express, { Request, Response, NextFunction, Express } from 'express';
import bodyParser from 'body-parser'

export class WebService {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.get('/test', (req:Request, res:Response) => {
            res.send("hi")
        });
    }


    startWebService(port: Number = 3000) {
        this.app.listen(port, () => {
            console.log(`listening on ${port}.`);
        });
    }
}