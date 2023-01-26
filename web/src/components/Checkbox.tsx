import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckboxProps as RadixCheckboxProps } from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "phosphor-react";

interface CheckboxProps extends RadixCheckboxProps {
  title: string;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      {...props}
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-green-600 group-focus:ring-offset-2 group-focus:ring-offset-background group-disabled:bg-zinc-800">
        <RadixCheckbox.Indicator>
          <Check size={20} className="text-white" />
        </RadixCheckbox.Indicator>

        {!props.checked && props.disabled && (
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-zinc-600"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 014 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0120 12c0 4.42-3.58 8-8 8z"></path>
          </svg>
        )}
      </div>

      <span className={clsx("text-white leading-tight", props.className)}>
        {props.title}
      </span>
    </RadixCheckbox.Root>
  );
}
