import { View } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

const validName = ['audio' , 'video'];

View.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{msg:`Besion d'un entier pour user-id !`}
        }
    },
    dataId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{msg:`Besion d'un entier pour data-id !`}
        }
    },
    pertinance:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{msg:`Besion d'un entier pour la pertinance !`}
        }
    },
    nameTable:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
           notEmpty:{msg:`pas de chaine vide !`},
           notNull:{msg:`pas de chaine null !`},
           isIn:{args:[validName] , msg:`les nom de table valide ${validName}`}
        }
    },
    deletedAt:DataTypes.DATE,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    timestamps:true,
    paranoid:true,
    tableName:'view'
})

export { View };