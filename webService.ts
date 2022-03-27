
import express, { Request, Response, NextFunction, Express } from 'express';
import bodyParser from 'body-parser'
import { BaseEndpoint } from './endpoints/baseEndpoint';

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

    addEndPoint(endpoint: BaseEndpoint) {
        console.log(endpoint.getVerb() + "   on   " + endpoint.getPath(), "Added.");

        //ADD ENDPOINT TO EXPRESS
        this.app.all(endpoint.getPath(), function (req: Request, res: Response, next: NextFunction) {

            if (req.method == endpoint.getVerb()) {
                //EXECUTE ENDPOINT
                endpoint.endpointFunction(req.params, req.body, (result) => {
                    res.status(result.statusCode).json(result.data);
                })
                return;
            }
            //IF VERB IS NOT EQUAL TO ENDPOINT THEN GO TO NEXT
            next();
        });
    }


    startWebService(port: Number = 3000) {
        this.app.listen(port, () => {
            console.log(`listening on ${port}.`);
        });
    }
}