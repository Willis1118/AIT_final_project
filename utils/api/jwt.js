import util from 'util';
import { expressjwt } from 'express-jwt';

import { getServerRuntimeConfig } from '../getStaticPath';
import { getSession } from './get-session';

export function jwtMiddleware(req, res){
    const middleware = expressjwt({ 
        secret: getServerRuntimeConfig().secret, 
        algorithms: ['HS256'],
        getToken: async function fromNextSession(req, res){
            const session = await getSession(req, res);

            if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
                return req.headers.authorization.split(' ')[1];
            }

            return session.token ? session.token : null;
        }
     }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/register',
            '/api/user/auth',
        ]
    });

    return util.promisify(middleware)(req, res);
}