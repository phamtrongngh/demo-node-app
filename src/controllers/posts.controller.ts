import { Request, Response } from "express";
import { db } from "../db";
import { IsNotEmpty, Length } from "class-validator";

export class createPostDto {
  @Length(1, 255)
  @IsNotEmpty()
  title: string;
  content: string;
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, content } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    res.json({
      message: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
    });

    res.json({
      message: "success",
      data: {
        posts,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
