import { LikedController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class LikedRouter extends BaseRouter<LikedController>{
    public initRoute(): void {
        this.routerServeur.get('/audio',auth.secureMiddleware ,this.controllerService.findAudio);
        this.routerServeur.get('/video',auth.secureMiddleware ,this.controllerService.findVideo);
    }
}

export default new LikedRouter(new LikedController()).routerServeur;