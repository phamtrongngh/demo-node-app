import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Claim {
  sub: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = <Claim>jwt.verify(token, process.env.JWT_SECRET!);

    req.user = { id: parseInt(payload.sub) };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
