import {Sequelize, DataTypes} from 'sequelize';
import {getConnection} from '../db/connection';
const sequelize: Sequelize = getConnection();

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull:false
    },
    city: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

// sequelize.close().catch(err =>{
//     console.error(err);
// })

export = User;

