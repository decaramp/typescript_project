import { Schema, model } from "mongoose";
import { IAuthor } from "./author.model";

export interface IBook {
  author: IAuthor["_id"];
  title: String,
  datePublished: Date,
  description: String,
  pageCount: Number,
  genre: String
  publisher: String
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema(
  {
    // author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: { type: String, required: true },
    datePublished: { type: Date, required: true },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
