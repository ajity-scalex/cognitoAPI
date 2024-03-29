import {Handler, Request} from 'express';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import {REGION} from '../config/config';

const identityServiceProvider = new CognitoIdentityServiceProvider({
    region: REGION
});

export interface IUser {
    id: string;
    email: string;
}

export interface IAuthenticatedRequest extends Request {
    user?: IUser;
}

const authMiddleware: Handler = async (req: IAuthenticatedRequest, res, next) =>{
    try{
        const token = req.headers['authorization']!;
        const rawUser = await identityServiceProvider.getUser({AccessToken: token}).promise();

        req.user = {
            id: rawUser.UserAttributes.find( (attr) => attr.Name == 'sub')?.Value!,
            email: rawUser.UserAttributes.find( (attr) => attr.Name === 'email')?.Value!,
        };
        next();
    }catch(err) {
        next(err);
    }
}

export default authMiddleware;