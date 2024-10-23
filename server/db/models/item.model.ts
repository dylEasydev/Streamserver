import { 
    CreationOptional,
    Model 
} from 'sequelize';
import { ItemInterface } from '../interface';

export abstract class Item extends Model implements ItemInterface{
    declare id:CreationOptional<number>;

    declare title:string;
    declare type:CreationOptional<string>;
    declare size:number;
    declare actorName:string;
    declare path:string;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}