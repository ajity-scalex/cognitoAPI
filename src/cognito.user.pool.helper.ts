import 'cross-fetch/polyfill';
import { USER_POOL_ID, CLIENT_ID } from './config';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

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
    
    public signUp(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {

            const attributeList: CognitoUserAttribute[] = [
                new CognitoUserAttribute({
                    Name: 'email',
                    Value: email
                })
            ];

            this.userPool.signUp(email, password, attributeList, [], (err, result) => {
                if(err) {
                    return reject(err);
                }
                console.log(result);
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

    public signIn( email: string, password: string ) : Promise<IUserToken> {
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
                  resolve({
                    accessToken: session.getAccessToken().getJwtToken(),
                    refreshToken: session.getRefreshToken().getToken(),
                  });
                },

                onFailure: (err) => {
                  reject(err);
                },
              });
            });
          }
    
}
export default new CognitoUserPoolHelper();
