import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const port = 3333;

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/habits", async () => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app
  .listen({
    port,
  })
  .then(() => console.log(`HTTP Server running on port ${port}!`));
