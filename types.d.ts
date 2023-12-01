declare namespace Express {
  export interface Request {
    id: string,
    iat: number,
    exp: number
  }
}