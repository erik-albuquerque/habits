interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label="Progresso de hábitos completados nesse dia."
      arial-aria-valuenow={props.progress}
      className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
    >
      <div
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{
          width: `${props.progress}%`,
        }}
      />
    </div>
  );
}
