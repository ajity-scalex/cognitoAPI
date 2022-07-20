import express from 'express';
import { IAuthenticatedRequest } from '../middleware/auth.middleware';
import cognitoUserPoolHelper from '../helper/cognito.user.pool.helper';
import signupHelper from '../helper/signup.helper'
import { Connect, Query } from '../db/connection';


interface IUserController {
    signUp: express.Handler,
    signIn: express.Handler,
    confirmSignUp: express.Handler,
    getProfile: express.Handler,
    getAll: express.Handler
}

const userController: IUserController = {
    signUp: async (req, res) =>{
        try {
            const { name, email, gender, city, password } = req.body;
            const userData = await signupHelper(name, email, gender, city);
            // console.log(userData);
            const result = await cognitoUserPoolHelper.signUp(name, email, gender, city, password);

            res.json({ message: `${result} is created.`, payLoad: userData});
          } catch (err:any) {
            res.status(500).json({ message: err.message });
          }
    },
    confirmSignUp: async (req, res) =>{
        try {
            const { email, code } = req.body;
            const result = await cognitoUserPoolHelper.confirmSignUp(email, code );
            res.json({ message: result });
          } catch (err: any) {
            res.status(500).json({ message: err.message });
          }
    },
    signIn: async (req, res) =>{
        try {
            const { email, password } = req.body;
            const result = await cognitoUserPoolHelper.signIn(email, password );
            // console.log(result.accessToken);
            res.json(result);
          }
          catch (err: any) {
            if(err.code == 'UserNotConfirmedException'){
              const {email} = req.body;
              cognitoUserPoolHelper.resendCode(email);
              res.status(500).json({message: 'User not confirmed. New code sent on email', })
            }
            else
            res.status(500).json({ message: err.message });
          }
    },
    getProfile: (req: IAuthenticatedRequest, res) =>{
        res.json(req.user);
    },

    getAll: async (req, res) =>{
      let query = "select * FROM Users";
      Connect()
      .then(connection => {
        Query(connection, query)
        .then(results =>{
            return res.status(200).json({
              results
            });
        })
        .catch(error =>{
          console.log(error);
          return res.status(500).json({
            message: error.message,
            error
          });
        })
        .finally(()=>{
          connection.end();
        })
      })
      .catch(error =>{
        console.log(error);
        return res.status(500).json({
          message: error.message,
          error
        });
      })
    }

};

export default userController;