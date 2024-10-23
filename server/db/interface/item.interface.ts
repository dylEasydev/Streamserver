import { 
    CreationOptional,
    Model 
} from 'sequelize';

export interface ItemInterface extends Model{
    id:CreationOptional<number>;

    title:string;
    type:CreationOptional<string>;
    size:number;
    actorName:string;
    path:string;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}