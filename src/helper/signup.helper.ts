import { Connect, Query } from '../db/connection';


const signupHelper =  (name: string, email: string, gender: string, city: string) =>{
    return new Promise( (resolve, reject) =>{
        let query = `insert into Users(username, email, gender, city) values('${name}', '${email}', '${gender}', '${city}');`;  
        Connect()
          .then(connection => {
            Query(connection, query)
            .then(results =>{
                resolve ({db:results, name, email, gender, city});
            })
            .catch(error =>{
                reject(error);
            })
            .finally(()=>{
              connection.end();
            })
          })
          .catch(error =>{
            reject(error);
          })
    })

}

export default signupHelper;