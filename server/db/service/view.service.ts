import { Audio, View, sequelizeConnect, Video } from '../../db';
import { ViewServiceInterface } from './interface';
import { Op } from 'sequelize';
import { optionsSubrequestAudio } from './audio.service';
import { optionsSubrequestVideo } from './video.service';

class ViewService implements ViewServiceInterface{

    findAllAudio(userId: number, limit?: number, search?: string){
        return new Promise<{count:number , rows:Audio[]}>(async(resolve, reject) => {
            try {
                const tabIds = await sequelizeConnect.transaction(async t=>{
                    const tabLikes = await View.findAll({
                        where:{
                            userId,
                            nameTable:Audio.tableName
                        },
                    });
                    return tabLikes.map(like=>{return like.dataId ;})
                })

                const tabAudio = await sequelizeConnect.transaction(async t=>{
                    return await Audio.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {
                                    title:{
                                        [Op.like] : {
                                            [Op.any]:search?search.split('').map(chaine=>`%${chaine}%`):['']
                                        }
                                    }
                                },
                                {
                                    id:{
                                        [Op.in]:tabIds
                                    }
                                }
                            ]
                        },
                        limit,
                        attributes:{
                            include:optionsSubrequestAudio
                        }
                    });
                });
                resolve(tabAudio);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllVideo(userId: number, limit?: number, search?: string){
        return new Promise<{count:number , rows:Video[]}>(async(resolve, reject) => {
            try {
                const tabIds = await sequelizeConnect.transaction(async t=>{
                    const tabLikes = await View.findAll({
                        where:{
                            userId,
                            nameTable:Video.tableName
                        },
                    });
                    return tabLikes.map(like=>{return like.dataId ;})
                })

                const tabVideo = await sequelizeConnect.transaction(async t=>{
                    return await Video.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {
                                    title:{
                                        [Op.like] : {
                                            [Op.any]:search?search.split('').map(chaine=>`%${chaine}%`):['']
                                        }
                                    }
                                },
                                {
                                    id:{
                                        [Op.in]:tabIds
                                    }
                                }
                            ]
                        },
                        limit,
                        attributes:{
                            include:optionsSubrequestVideo
                        }
                    });
                });
                resolve(tabVideo);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new ViewService();