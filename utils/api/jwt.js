import util from 'util';
import { expressjwt } from 'express-jwt';

import { getServerRuntimeConfig } from '../../components/getStaticPath';

export function jwtMiddleware(req, res){
    const middleware = expressjwt({ secret: getServerRuntimeConfig().secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/auth',
        ]
    });

    return util.promisify(middleware)(req, res);
}