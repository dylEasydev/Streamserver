import { AudioController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class AudioRouter extends BaseRouter<AudioController>{
    public initRoute(): void {
        this.routerServeur.get('/:name',this.controllerService.findByActorName);
        this.routerServeur.get('/',this.controllerService.findAll);
        this.routerServeur.get('/:id',auth.secureMiddleware,auth.verifPermToken('read:item'),this.controllerService.streamAudio);
    }
}

export default new AudioRouter(new AudioController()).routerServeur;