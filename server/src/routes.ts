import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request, response) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    try {
      const habit = await prisma.habit.create({
        data: {
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return {
                week_day: weekDay,
              };
            }),
          },
        },
      });

      response.status(201).send({ habit });
    } catch (error) {
      console.error(error);

      response.status(400).send({ error: "Error on create a new habit!" });

      throw new Error("Error on create a new habit!");
    }
  });

  app.get("/day", async (request, response) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date);

    const weekDay = parsedDate.get("day");

    try {
      const possibleHabits = await prisma.habit.findMany({
        where: {
          created_at: {
            lte: date,
          },
          weekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });

      const day = await prisma.day.findUnique({
        where: {
          date: parsedDate.toDate(),
        },
        include: {
          dayHabits: true,
        },
      });

      const completedHabits = day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      });

      response.status(200).send({ possibleHabits, completedHabits });
    } catch (error) {
      console.error(error);

      response.status(400).send({ error: "Error on get day info!" });

      throw new Error("Error on get day info!");
    }
  });
}
