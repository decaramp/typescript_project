import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV !== 'production') {

        res.json({
            message: err.message,
            stack: err.stack,
    });
    // render the error page
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.render('error');

    }
}