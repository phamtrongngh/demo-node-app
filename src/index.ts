import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import errorHandlerMiddleware from "./middlewares/error.middleware";
import { db } from "./db";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandlerMiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.on("close", () => {
  db.$disconnect();
});
