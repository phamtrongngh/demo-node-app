import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // const alice = await db.user.upsert({
  //   where: { email: "alice@gmail.com" },
  //   update: {},
  //   create: {
  //     email: "alice@gmail.com",
  //     password: "alice123",
  //     posts: {
  //       create: [
  //         {
  //           title: "Hello, I am Alice",
  //           content: "This is my first post",
  //         },
  //         {
  //           title: "I'm sick of this",
  //           content: "I'm going to quit my job",
  //         },
  //       ],
  //     },
  //   },
  // });

  // const bob = await db.user.upsert({
  //   where: { email: "bob@gmail.com" },
  //   update: {},
  //   create: {
  //     email: "bob@gmail.com",
  //     password: "bob123",
  //     posts: {
  //       create: [
  //         {
  //           title: "Hello, I am Bob",
  //           content: "This is my first post",
  //         },
  //         {
  //           title: "I'm happy",
  //           content: "I got a new job",
  //         },
  //       ],
  //     },
  //   },
  // });

  // console.log({ alice, bob });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
  });
