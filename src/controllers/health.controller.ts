import { Request, Response } from "express";

export async function health(req: Request, res: Response) {
  try {
    res.json({
      message: "success"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
