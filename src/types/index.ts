import { Document } from "mongoose";

//Extiende de document, porque lo que genera user con mongoose es un documento, y sino los metodos como save, tiran error.
export interface user extends Document {
  username : string,
  email : string,
  password : string,
  createdAt() : Date,
  updatedAt() : Date
}

export interface payload {
  id : string,
  iat : number,
  exp : number
}

export interface product extends Document {
  _id ?: object | string,
  nombre : string;
  precio : number;
  descripcion : string;
  categoria : string;
  stock : number;
}