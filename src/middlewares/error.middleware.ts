import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error, please try again later" });
  }
};

export default errorHandlerMiddleware;
