import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

interface HabitsList {
  date: Date;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({ date }: HabitsList) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox
            key={habit.id}
            title={habit.title}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            className="font-semibold text-xl group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
          />
        );
      })}
    </div>
  );
}
