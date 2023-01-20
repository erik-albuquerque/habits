import * as RadixCheckbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface CheckboxProps {
  title: string;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <RadixCheckbox.Root className="flex items-center gap-3 group">
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
        <RadixCheckbox.Indicator>
          <Check size={20} className="text-white" />
        </RadixCheckbox.Indicator>
      </div>

      <span className={clsx("text-white leading-tight", props.className)}>
        {props.title}
      </span>
    </RadixCheckbox.Root>
  );
}
