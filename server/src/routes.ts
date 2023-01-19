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

    const parsedDate = dayjs(date).startOf("day");
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

      const day = await prisma.day.findFirst({
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

  app.patch("/habits/:id/toggle", async (request, response) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    try {
      let day = await prisma.day.findUnique({
        where: {
          date: today,
        },
      });

      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      });

      if (dayHabit) {
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });
      } else {
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        });
      }

      response.status(204).send();
    } catch (error) {
      console.error(error);

      response.status(400).send({ error: "Error on complete day!" });

      throw new Error("Error on complete day!");
    }
  });

  app.get("/summary", async (_, response) => {
    try {
      const summary = await prisma.$queryRaw`
        SELECT
          D.id,
          D.date,
          (
            SELECT 
              cast(count(*) as float)
            FROM day_habits DH
            WHERE DH.day_id = D.id
          ) as completed,
          (
            SELECT 
              cast(count(*) as float)
            FROM habit_week_days HWD
            JOIN habits H
              ON H.id = HWD.habit_id
            WHERE
              HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
              AND H.created_at <= D.date
          ) as amount
        FROM days D
    `;

      response.status(200).send({ summary });
    } catch (error) {
      console.error(error);

      response.status(400).send({ error: "Error on get summary!" });

      throw new Error("Error on get summary!");
    }
  });
}
