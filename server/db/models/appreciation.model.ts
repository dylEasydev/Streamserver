import { 
    CreationOptional, Model 
} from 'sequelize';
import { Item } from './item.model';
import { Appreciationinterface,User } from '../interface';

export abstract class Appreciation extends Model implements Appreciationinterface{
    declare id:CreationOptional<number>;

    declare userId:User['id'];
    declare dataId:Item['id'];
    declare nameTable:string;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}