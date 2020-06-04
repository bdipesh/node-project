import jwt from 'jsonwebtoken';
import config from '../config';

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'You do not have permission.'
        });
    }
    if (token.startsWith('Bearer')) {
        token = token.slice(7, token.length);
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
    if (token) {
    }
};
export default verifyToken;