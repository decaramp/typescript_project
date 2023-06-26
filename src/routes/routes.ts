import { Express, Request, Response} from 'express';
import { registerAuthor, loginAuthor, logoutAuthor, getHomePage } from '../controllers/author.controller';
import { getBook, getAllBooks, createBook, updateBook, deleteBook } from '../controllers/book.controller';
import { validate, createAuthorSchema, loginAuthorSchema } from '../middleware/validateInput';
import { protect } from '../middleware/jwt.authorization';



function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    
    //author routes
    app.get('/logout', logoutAuthor);
    app.post('/register', validate(createAuthorSchema), registerAuthor);
    app.post('/login', validate(loginAuthorSchema), loginAuthor);
    app.get('/', getHomePage);

    //book routes 
    app.get('/books/:id', protect, getBook);
    app.get('/books', protect, getAllBooks);
    app.post('/books/create', protect, createBook);
    app.put('/books/update/:id', protect, updateBook);
    app.delete('/books/delete/:id', protect, deleteBook);
    
}

export default routes;

