import { Literal } from 'sequelize/types/utils';
import { Audio , sequelizeConnect } from '../../db';
import { AudioServiceInterface } from './interface';
import { Op } from 'sequelize';

export const optionsSubrequestAudio : [Literal , string][] = [
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "liked" WHERE
                "nameTable" = 'audio',
                "dataId" = "Audio"."id"
            LIMIT 1
        `),`nbreLikes`
    ],
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "comment" WHERE
                "nameTable" = 'audio',
                "dataId" = "Audio"."id"
            LIMIT 1
        `),`nbreComments`
    ],
    [
        sequelizeConnect.literal(`
            SELECT COUNT(*) FROM "view" WHERE
                "nameTable" = 'audio',
                "dataId" = "Audio"."id"
            LIMIT 1
        `),`nbreViews`
    ]
];

class AudioService implements AudioServiceInterface{

    findById(id: number){
        return new Promise<Audio|null>(async(resolve, reject) => {
            try {
                const dataFind = await sequelizeConnect.transaction(async t=>{
                    return await Audio.findByPk(id,{
                        attributes:{
                            include:optionsSubrequestAudio
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
        return new Promise<{count:number , rows:Audio[]}>(async(resolve, reject) => {
            try {
                const tableData = await sequelizeConnect.transaction(async t=>{
                    return Audio.findAndCountAll({
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
                            include:optionsSubrequestAudio
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
        return new Promise<{count:number , rows:Audio[]}>(async(resolve, reject) => {
            try {
                const tableData = await sequelizeConnect.transaction(async t=>{
                    return Audio.findAndCountAll({
                        where:{
                            title:{
                                [Op.like] : {
                                    [Op.any]:search?search.split('').map(chaine=>`%${chaine}%`):['']
                                }
                            }
                        },
                        attributes:{
                            include:optionsSubrequestAudio
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

export default new AudioService();