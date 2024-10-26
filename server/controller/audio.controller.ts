import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { audioService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname } from 'node:path';


export class AudioController extends BaseController{

    async streamAudio(req:Request , res:Response){
        if(req.params.id){
            try {
                const id = isNaN(parseInt(req.params.id ,10))?0:parseInt(req.params.id , 10);
                const audioFind = await audioService.findById(id);

                if(audioFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune vidéo d'identifiant ${req.params.id}`
                    )
                
                const range = req.headers.range;
                if(!range){
                    res.type(audioFind.type);
                    return createReadStream(audioFind.path).pipe(res);
                }
                const audioStat = await stat(audioFind.path);
                const parts = range.replace('bytes=','').split('-');
                const start = parseInt(parts[0] as string ,10);
                const end = parts[1]? parseInt(parts[1] , 10 ): audioStat.size -1;
                res.type(extname(audioFind.path));
                res.writeHead(CodeStatut.STREAM_STATUS,{
                    'content-range':`bytes ${start}-${end}/${audioStat.size}`,
                    'accept-ranges':`bytes`,
                    'content-length':end-start+1
                });
                return createReadStream(audioFind.path , {start , end}).pipe(res); 
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
                    
                    const tableAudio = await audioService.findByActorName(req.params.name, limit , search);
                    return statusResponse.sendResponseJson(
                        CodeStatut.VALID_STATUS,
                        res,
                        `${tableAudio.count} Audios trouvé pour la recherche ${search} !`,
                        tableAudio.rows
                    );
                }

                const tableAudio = await audioService.findByActorName(req.params.name, limit);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tableAudio.count} Audios trouvé !`,
                    tableAudio.rows
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
                
                const tableAudio = await audioService.findAll(limit , search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `${tableAudio.count} Audios trouvé pour la recherche ${search} !`,
                    tableAudio.rows
                );
            }

            const tableAudio = await audioService.findAll(limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `${tableAudio.count} Audios trouvé !`,
                tableAudio.rows
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