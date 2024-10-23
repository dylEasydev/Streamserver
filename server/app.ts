import express,{Application} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import bridge from 'http2-express-bridge';

class ExpressApp{
    public expressServer: Application;

    constructor(){
        this.expressServer = bridge(express);
        this.expressServer.enable('trust proxy');
        this.configServer();
    }

    private configServer(){
        this.expressServer.use(bodyParser.json())
                          .use(bodyParser.urlencoded({extended:true}))
                          .use(cors())
                          .use('*',(req,res)=>{
                                res.redirect('/docs');
                          })
    }
}

export default new ExpressApp().expressServer