import 'cross-fetch/polyfill';
import { USER_POOL_ID, CLIENT_ID, REGION } from '../config/config';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import signupHelper from './signup.helper';

export interface IUserToken {
    accessToken: string;
    refreshToken: string;
}

class CognitoUserPoolHelper {
    public userPool: CognitoUserPool;

    constructor() {
      this.userPool = new CognitoUserPool({
        UserPoolId: USER_POOL_ID,
        ClientId: CLIENT_ID
      });  
    }
    
    public signUp(name: string, email: string, gender: string, city: string, password: string): Promise<string> {
        return new Promise( (resolve, reject) => {
          const datanName = {
            Name: 'name',
            Value: name
          }
          const dataEmail = {
            Name: 'email',
            Value: email
          }
          const dataGender = {
            Name: 'gender',
            Value: gender
          }
          const dataCity = {
            Name: 'custom:city',
            Value: city
          }
          const attributeEmail = new CognitoUserAttribute(dataEmail);
          const attributeGender = new CognitoUserAttribute(dataGender);
          const attributeCity = new CognitoUserAttribute(dataCity);
          const attributeName = new CognitoUserAttribute(datanName);

          
            const attributeList: CognitoUserAttribute[] = [attributeEmail,attributeCity,attributeGender, attributeName];

            this.userPool.signUp(email, password, attributeList, [], (err, result) => {
                if(err) {
                    return reject(err);
                }
                resolve(result?.user.getUsername() || '');
            })
        })
    }


    public confirmSignUp(email:string, code:string): Promise<String> {
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.userPool
            });

            cognitoUser.confirmRegistration(code, true, (err, result) => {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            })
        })
    }

    public signIn( email: string, password: string ) : Promise<IUserToken>{
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
              Username: email,
              Pool: this.userPool,
            });

            const authenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password,
              });
              cognitoUser.authenticateUser(authenticationDetails, {
     
                onSuccess: (session) => { 
                    console.log(session);                    
                    resolve({
                    accessToken: session.getAccessToken().getJwtToken(),
                    refreshToken: session.getRefreshToken().getToken(),
                  });
                },

                onFailure: (err) => {
                  // console.log(err);
                  reject(err);
                },
              });
            });
          }

    public resendCode(email: string) {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });
      cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
    }
    
}
export default new CognitoUserPoolHelper();
