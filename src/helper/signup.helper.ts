// import { Connect, Query } from '../db/connection';
import User from '../models/users.model';
import userController from "../controller/user.controller";


const signupHelper = async (name: string, email: string, gender: string, city: string) =>{

try{
    const user = await User.create(
      { name: name, email: email, gender: gender, city: city },
      { fields: ["name", "email", "gender", "city"] }
    );
    return user;
}catch(error){
    throw error;
}

}

export default signupHelper;