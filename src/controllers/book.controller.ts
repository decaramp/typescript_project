import { Request, Response } from "express";
import logger from "../utils/logger";
import Book, { IBook } from "../models/book.model"
import Author, { IAuthor } from "../models/author.model";
import { Schema, model } from "mongoose"


// @description   Gets a book
// @route         GET /books/:id
// @access        Private
export const getBook = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        
        const book = await Book.findById(req.params.id);

        return res.status(200).json(book);
    } catch (error) {
        logger.info(error)
       return res.status(400).json(error);
    }
    
}


// @description   Gets all book
// @route         GET /books
// @access        Private 
export const  getAllBooks = async (req: Request, res:Response) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.status(400).json('Not authorized, no token');
        }
            
        const books = await Book.find();

        return res.status(200).json(books);

    } catch (error) {
        logger.info(error)
       return res.status(400).json(error);
    }
};

// @description   Create a book
// @route         POST /books/create
// @access        Private
export const createBook = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if(!token) {
        res.status(400).json('Not authorized, no token');
    }


    const book = await Book.create(req.body);
    console.log(book);
    return res.status(201).json(book)
    
    
    // .json({
    //     author: book.author,
    //     title: req.body.title,
    //     datePublished: req.body.datePublished,
    //     description: req.body.description,
    //     pageCount: req.body.pageCount,
    //     genre: req.body.genre,
    //     publisher: req.body.publisher,
    //     createdAt: book.createdAt,
    //     updatedAt: book.updatedAt,
    // });
};

// @description   Update a book
// @route         PUT /books/update/:id
// @access        Private
export const updateBook = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    const book = await Book.findById(req.params.id);
    if(!book) {
        res.status(400).json('Book not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    return res.status(200).json(updatedBook);
};

// @description   Delete a book
// @route         DELETE /books/delete/:id
// @access        Private
export const deleteBook = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    const book = await Book.findById(req.params.id);
    if(!book) {
        res.status(400).json('Book not found')
    }

    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({ id: req.params.id });
};