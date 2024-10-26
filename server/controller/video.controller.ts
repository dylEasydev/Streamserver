import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { videoService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname } from 'node:path';


export class VideoController extends BaseController{

    async streamVideo(req:Request , res:Response){
        if(req.params.id){
            try {
                const id = isNaN(parseInt(req.params.id ,10))?0:parseInt(req.params.id , 10);
                const videoFind = await videoService.findById(id);

                if(videoFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune vidéo d'identifiant ${req.params.id}`
                    )
                
                const range = req.headers.range;
                if(!range){
                    res.type(videoFind.type);
                    return createReadStream(videoFind.path).pipe(res);
                }
                const videostat = await stat(videoFind.path);
                const parts = range.replace('bytes=','').split('-');
                const start = parseInt(parts[0] as string ,10);
                const end = parts[1]? parseInt(parts[1] , 10 ): videostat.size -1;
                res.type(extname(videoFind.path));
                res.writeHead(CodeStatut.STREAM_STATUS,{
                    'content-range':`bytes ${start}-${end}/${videostat.size}`,
                    'accept-ranges':`bytes`,
                    'content-length':end-start+1
                });
                return createReadStream(videoFind.path , {start , end}).pipe(res); 
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

    async findByActorName (req:Request , res:Response){
        if(req.params.name){
            try {
                const limit = typeof req.query.limit === 'string'?parseInt(req.query.limit , 10):undefined;

                if(req.query.search){
                    const search = typeof req.query.search === 'string' ? req.query.search : '';
                    if(search.length < 2)
                        return statusResponse.sendResponseJson(
                            CodeStatut.CLIENT_STATUS,
                            res,
                            `Besion de minimun 2 carractères pour la recherche !`
                        );
                    
                    const tablevideo = await videoService.findByActorName(req.params.name, limit , search);
                    return statusResponse.sendResponseJson(
                        CodeStatut.VALID_STATUS,
                        res,
                        `${tablevideo.count} videos trouvé pour la recherche ${search} !`,
                        tablevideo.rows
                    );
                }

                const tablevideo = await videoService.findByActorName(req.params.name, limit);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tablevideo.count} videos trouvé !`,
                    tablevideo.rows
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

    async findAll(req:Request , res:Response){
        try {
            const limit = typeof req.query.limit === 'string'?parseInt(req.query.limit , 10):undefined;

            if(req.query.search){
                const search = typeof req.query.search === 'string' ? req.query.search : '';
                if(search.length < 2)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        `Besion de minimun 2 carractères pour la recherche !`
                    );
                
                const tablevideo = await videoService.findAll(limit , search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tablevideo.count} videos trouvé pour la recherche ${search} !`,
                    tablevideo.rows
                );
            }

            const tablevideo = await videoService.findAll(limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `${tablevideo.count} videos trouvé !`,
                tablevideo.rows
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