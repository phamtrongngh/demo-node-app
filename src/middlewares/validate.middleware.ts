import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";

export default function validateMiddleware(cls: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors = await validate(plainToInstance(cls, req.body));
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints!)[0];

      res.status(400).json({
        message,
      });
    } else {
      next();
    }
  };
}
