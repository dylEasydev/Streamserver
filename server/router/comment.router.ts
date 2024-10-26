import { CommentController } from '../controller';
import { auth } from '../middleware';
import { BaseRouter } from './base.router';

class CommentRouter extends BaseRouter<CommentController>{
    public initRoute(): void {
        this.routerServeur.get('/audio',auth.secureMiddleware ,this.controllerService.findAudio);
        this.routerServeur.get('/video',auth.secureMiddleware ,this.controllerService.findVideo);
    }
}

export default new CommentRouter(new CommentController()).routerServeur;