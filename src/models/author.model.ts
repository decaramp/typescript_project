import { Schema, model } from "mongoose";

export interface IAuthor {
  // id: any;
  _id: Schema.Types.ObjectId,
  email: string;
  name: string;
  password: string;
  phone: string
  createdAt: Date;
  updatedAt: Date;
  // comparePassword(candidatePassword: string): Promise<boolean>;
}

const authorSchema = new Schema<IAuthor>(
  {
    // _id?: { type: Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Author = model<IAuthor>("Author", authorSchema);

export default Author;
