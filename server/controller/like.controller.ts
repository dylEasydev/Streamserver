import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Token } from '../db';
import { statusResponse , CodeStatut} from '../helper';
import { likeService } from '../db/service';

export class LikedController extends BaseController{

    async findAudio(req:Request , res:Response){
        try {
            const usertoken = req.body.token as Token;
            const limit = typeof req.query.limit === 'string'?parseInt(req.query.limit , 10):undefined;
            if(req.query.search){
                const search = typeof req.query.search === 'string' ? req.query.search : '';
                if(search.length < 2)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Besion de minimun 2 carractères pour la recherche !`
                    );
                
                const tbaleVideo = await likeService.findAllAudio(usertoken.userId,limit , search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tbaleVideo.count} Audios trouvé pour la recherche ${search} !`,
                    tbaleVideo.rows
                );
            }
            const tbaleVideo = await likeService.findAllAudio(usertoken.userId,limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `${tbaleVideo.count} Audios trouvé !`,
                tbaleVideo.rows
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayer plus tard `,
                error
            );
        }
    }

    async findVideo(req:Request , res:Response){
        try {
            const usertoken = req.body.token as Token;
            const limit = typeof req.query.limit === 'string'?parseInt(req.query.limit , 10):undefined;
            if(req.query.search){
                const search = typeof req.query.search === 'string' ? req.query.search : '';
                if(search.length < 2)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Besion de minimun 2 carractères pour la recherche !`
                    );
                
                const tbaleVideo = await likeService.findAllVideo(usertoken.userId,limit , search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tbaleVideo.count} videos trouvé pour la recherche ${search} !`,
                    tbaleVideo.rows
                );
            }
            const tbaleVideo = await likeService.findAllVideo(usertoken.userId,limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `${tbaleVideo.count} videos trouvé !`,
                tbaleVideo.rows
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur , réessayer plus tard `,
                error
            );
        }
    }
}