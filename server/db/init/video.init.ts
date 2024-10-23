import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';
import { Video } from '../models';

Video.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:`pas de titre vide !`},
            notNull:{msg:`pas de titre null !`}
        }
    },
    size:{
        type:DataTypes.INTEGER,
        validate:{
            isNumeric:{msg:`un entier comme taille !`}
        }
    },
    actorName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:`pas de nom vide !`},
            notNull:{msg:`pas de nom null !`}
        }
    },
    path:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:`pas de chemin vide !`},
            notNull:{msg:`pas de chemin null !`}
        }
    },
    type:{
        type:DataTypes.STRING,
        allowNull:true
    },
    deletedAt:DataTypes.DATE,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'video'
})

export {Video};