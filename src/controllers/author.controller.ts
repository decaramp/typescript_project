import { Request, Response } from "express";
import logger from "../utils/logger";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { config  } from "../../config/config";
import Author, { IAuthor } from "../models/author.model"


//@desc     Get Homepage
//@route    GET '/' 
//@access   Public
export const getHomePage = async (req: Request, res: Response) => {
  try {
    return res.render('homepage', { title: 'Home', token: '' });
  } catch (error) {
    console.log(error);
  }
}


//@desc     Register new author
//@route    POST /authors/register
//@access   Public
export const registerAuthor = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body

    //Check if author exist
    const authorExists = await Author.findOne({ email });

    if(authorExists) {
      res.status(400)
      throw new Error('A user already exists with same email')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create an author
    const author: IAuthor = await Author.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    if(author) {
      return res.status(201).json({
        _id: author._id,
        name: author.name,
        email: author.email,
        phone: author.phone
      });
    } else {
      res.status(400).json('Invalid user data');
    }

  } catch (error) {
    logger.info(error);
    res.status(400);
    throw new Error("Invalid user data");
  }
};

//@desc     Login author
//@route    POST /authors/login
//@access   Public
export const loginAuthor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check for author's email
    const author = await Author.findOne({ email });

    if(author && (await bcrypt.compare(password, author.password))) {

      // Store token in cookie
      const accessToken = generateAccessToken(author.id)
      res.cookie("token", accessToken);

      return res.status(200).json({
        _id: author._id,
        name: author.name,
        email: author.email,
        phone: author.phone,
        token: accessToken
      });                          
    } else {
      return res.status(400).json('Invalid email or password');
    }

  } catch (error) {
    logger.info(error);
    res.status(400);
    throw new Error("Invalid email or password");
  }
};


export const logoutAuthor = async (req: Request, res: Response) => {
  res.cookie('token', '')
  res.status(200).redirect('/authors/login');
}

//Generate a token
const generateAccessToken = (id: string) => {
  const JWT_SECRET = config.JWT_SECRET;
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: '30d'
  })
  
}




