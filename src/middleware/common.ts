import jwt from "jsonwebtoken";
import config from "../config";
import {Request} from "express";

    const getLoggedInUser = (req: Request) => {
        let token =  req.headers['authorization'];
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, (err: any, decoded: object) => {
            if (err) {
                console.log(err)
                return err
            }
            return  { fullName: decoded.name || '', profilePicture: decoded.picture || ''}
        });
    }


export default { getLoggedInUser }