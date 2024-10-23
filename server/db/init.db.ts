import { 
    Audio , Comment , sequelizeConnect , Video ,
    Liked, View
} from '.'

export function initdb(){
    return new Promise<void>(async (resolve, reject) => {
        const test = process.env.NODE_ENV === 'developemnent'
        try {
            
            await sequelizeConnect.authenticate();
            await Audio.sync({alter:test});
            await Video.sync({alter:test});
            await Comment.sync({alter:test});
            await Liked.sync({alter:test});
            await View.sync({alter:test});
            await sequelizeConnect.sync({alter:test});

            resolve();
        } catch (error) {
            reject(error)
        }
    })
}