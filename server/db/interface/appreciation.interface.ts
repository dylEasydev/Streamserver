import { 
    CreationOptional, Model 
} from 'sequelize';
import { ItemInterface, User } from '.';

export interface Appreciationinterface extends Model {
    id:CreationOptional<number>;

    userId:User['id'];
    dataId:ItemInterface['id'];
    nameTable:string;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}