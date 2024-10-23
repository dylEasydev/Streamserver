import { Literal } from 'sequelize/types/utils';
import { Video , sequelizeConnect } from '../../db';
import { VideoServiceInterface } from './interface';
import { Op } from 'sequelize';

export const optionsSubrequestVideo : [Literal , string][] = [
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "liked" WHERE
                "nameTable" = 'video',
                "dataId" = "Video"."id"
            LIMIT 1
        `),`nbreLikes`
    ],
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "comment" WHERE
                "nameTable" = 'video',
                "dataId" = "Video"."id"
            LIMIT 1
        `),`nbreComments`
    ],
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "view" WHERE
                "nameTable" = 'video',
                "dataId" = "Video"."id"
            LIMIT 1
        `),`nbreViews`
    ]
];

class VideoService implements VideoServiceInterface{

    findById(id: number){
        return new Promise<Video|null>(async(resolve, reject) => {
            try {
                const dataFind = await sequelizeConnect.transaction(async t=>{
                    return await Video.findByPk(id,{
                        attributes:{
                            include:optionsSubrequestVideo
                        }
                    })
                })
                resolve(dataFind)
            } catch (error) {
                reject(error);
            }
        })
    }

    findByActorName(name: string, limit?: number, search?: string){
        return new Promise<{count:number , rows:Video[]}>(async(resolve, reject) => {
            try {
                const tableData = await sequelizeConnect.transaction(async t=>{
                    return Video.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {
                                    actorName:name
                                },
                                {
                                    title:{
                                        [Op.like] : {
                                            [Op.any]:search?search.split('').map(chaine=>`%${chaine}%`):['']
                                        }
                                    }
                                }
                            ]
                        },
                        attributes:{
                            include:optionsSubrequestVideo
                        },
                        limit,
                    });
                });
                resolve(tableData);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAll(limit?: number, search?: string){
        return new Promise<{count:number , rows:Video[]}>(async(resolve, reject) => {
            try {
                const tableData = await sequelizeConnect.transaction(async t=>{
                    return Video.findAndCountAll({
                        where:{
                            title:{
                                [Op.like] : {
                                    [Op.any]:search?search.split('').map(chaine=>`%${chaine}%`):['']
                                }
                            }
                        },
                        attributes:{
                            include:optionsSubrequestVideo
                        },
                        limit,
                    });
                });
                resolve(tableData);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new VideoService();