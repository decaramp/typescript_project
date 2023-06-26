import jwt from 'jsonwebtoken';
import Author from "../models/author.model";
import { config  } from "../../config/config";
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
    id: string
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token
    if(req.cookies.token) {
    try {
            //Get token from cookie
            token = req.cookies.token;

            //verify token
            const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload
            // console.log({ _id })
            // console.log(typeof decoded.id)
            
        
            //Get author from token
            req.author = await Author.findById(decoded.id);
            // console.log(req.author)

            if (!req.author) {
                res.status(400).json({ message: 'Not authorized, invalid token' })
            } else {
                return next();
            }


        }   catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Not authorized, no token' });
            // throw new Error('Not authorized, invalid token')
        }
    }   else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token header
            token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload

            //Get author from token
            req.author = await Author.findById(decoded.id);

            if (!req.author) {
                res.status(400).json({ message: 'Not authorized, invalid token' })
            } else {
                return next();
            };

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Not authorized, no token' });
            // throw new Error('Not authorized, invalid token')
            };
        };

    if(!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    // throw new Error('Not authorized, no token');
    };
};