
export function errorHandler(err, res){
    console.log("error", err);
    // 400 level error
    if(typeof err === 'string'){
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err, errorCode: statusCode });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token', errorCode: 401});
    }

    // default to 500 server error
    console.error(err);
    return res.status(500).json({ message: err.message });
}