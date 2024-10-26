import { ViewController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class ViewRouter extends BaseRouter<ViewController>{
    public initRoute(): void {
        this.routerServeur.get('/audio',auth.secureMiddleware ,this.controllerService.findAudio);
        this.routerServeur.get('/video',auth.secureMiddleware ,this.controllerService.findVideo);
    }
}

export default new ViewRouter(new ViewController()).routerServeur;