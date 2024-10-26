import { VideoController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class VideoRouter extends BaseRouter<VideoController>{
    public initRoute(): void {
        this.routerServeur.get('/:name',this.controllerService.findByActorName);
        this.routerServeur.get('/',this.controllerService.findAll);
        this.routerServeur.get('/:id',auth.secureMiddleware,auth.verifPermToken('read:item'),this.controllerService.streamVideo);
    }
}

export default new VideoRouter(new VideoController()).routerServeur;