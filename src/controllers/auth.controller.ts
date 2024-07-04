import { Request, Response } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IsEmail, IsString, Length } from "class-validator";

export class SignupDto {
  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @IsString()
  @Length(8, 32)
  password: string;
}

export async function signup(req: Request, res: Response) {
  const { email, password } = <SignupDto>req.body;

  const exist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = await Promise.resolve(
    jwt.sign({ sub: user.id }, process.env.JWT_SECRET!)
  );

  res.json({
    message: "success",
    data: {
      token,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Credentials are invalid" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Credentials are invalid" });
  }

  const token = await Promise.resolve(
    jwt.sign({ sub: user.id }, process.env.JWT_SECRET!)
  );

  res.json({
    message: "success",
    data: {
      token,
    },
  });
}
