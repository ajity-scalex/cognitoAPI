
import mysql from 'mysql2';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER} from '../config/config';

const params = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

const Connect = async () => {
  return new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });
};

const Query = async (connection: mysql.Connection, query: string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
};

export { Connect, Query};


