
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER} from '../config/config';

const params = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

const getConnection = () => {
  try {
    const sequelize =  new Sequelize( params.database, params.user, params.password, {
        host: params.host,
        dialect: "mysql",
      }
    );
    return sequelize;
  } catch (error) {
    console.error('Error connecting DB. Check credentials');
    throw error;
  }
};
  
const testConnection = async (sequelize: Sequelize) =>{
  try{
    await sequelize.authenticate();
    console.log('connection has been established');
  } catch(error) {
    console.error('unable to connect to the database:',error);
  }
  
}

const closeConnection = async (sequelize: Sequelize) =>{
  try{
    await sequelize.close();
  }catch(error) {
    console.error('Not able to close connection');
  }
}


export { getConnection ,testConnection, closeConnection};


