import { VideoInterface , AudioInterface } from '../../interface';

export interface AppreciationServiceInterface {

    findAllAudio(userId:number , limit?:number , search?:string):Promise<{count:number;rows:AudioInterface[];}>;
    findAllVideo(userId:number , limit?:number , search?:string):Promise<{count:number;rows:VideoInterface[];}>;
    
}