import express, {Request, Response, NextFunction} from 'express';
import createError, {HttpError} from 'http-errors';
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes/routes';
import { errorHandler } from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';
import path from 'path';
// import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
// import dotenv from 'dotenv';

// dotenv.config();

const PORT = 3000

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use(cookieParser());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Set templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

routes(app);


app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
  
    // render the error page
    const errorStatusCode = err.status ? err.status : 500
    res.status(errorStatusCode)
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(PORT, async () => {
    logger.info(`Server running on PORT: ${PORT}`)

    await connect();

});




// module.exports = app;
