interface WeekDayProps {
  day: string;
}

export function WeekDay(props: WeekDayProps) {
  return (
    <div className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
      {props.day}
    </div>
  );
}
