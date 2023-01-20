import { Check } from "phosphor-react";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay) => {
          return <Checkbox key={weekDay} title={weekDay} />;
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
