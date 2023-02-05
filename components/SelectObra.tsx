import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Obra } from "@/@types";
import clsx from "clsx";

const obras: Obra[] = ["Filme", "Série", "Anime", "Reality show"];

type Props = {
  onValueChange: (value: Obra) => void;
};
export const SelectObra = ({ onValueChange }: Props) => {
  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger
        aria-label="Tipo da obra"
        className={clsx(
          "inline-flex h-9 w-full items-center justify-between rounded-lg px-4 text-sm shadow-sm",
          "bg-slate-100  text-slate-800  hover:bg-slate-200 focus:shadow-lg focus:ring-orange-500"
        )}
      >
        <Select.Value placeholder="Filme" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-sm bg-slate-50 shadow-sm">
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-4">
            {obras.map((obra) => (
              <Select.Item
                className="font-sm hover:bg-slate-00 relative flex h-7 items-center rounded-sm py-4 px-2 text-sm hover:cursor-pointer"
                key={obra}
                value={obra}
              >
                <Select.ItemText>{obra}</Select.ItemText>
                <Select.ItemIndicator className="ml-4 text-orange-500">
                  <CheckIcon fontSize={36} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.SelectScrollDownButton>
            <ChevronDownIcon />
          </Select.SelectScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
