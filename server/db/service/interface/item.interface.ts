import { ItemInterface } from '../../interface';

export interface ItemServiceInterface {

    findById(id:number):Promise<ItemInterface|null>;
    findByActorName(name:string , limit?:number , search?:string):Promise<{count:number , rows:ItemInterface[]}>;
    findAll( limit?:number , search?:string):Promise<{count:number , rows:ItemInterface[]}>;

}