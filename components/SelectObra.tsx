import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Obra } from "@/@types";

const obras: Obra[] = ["Filme", "Série", "Anime", "Reality show"];

type Props = {
  onValueChange: (value: Obra) => void;
};
export const SelectObra = ({ onValueChange }: Props) => {
  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger
        aria-label="Tipo da obra"
        className="w-full inline-flex items-center justify-between rounded-lg px-4 text-sm h-9 shadow-sm bg-slate-100 hover:bg-slate-200 text-slate-800 focus:shadow-lg focus:ring-orange-500"
      >
        <Select.Value placeholder="Filme" />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-slate-100 rounded-sm shadow-sm">
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-4">
            {obras.map((obra) => (
              <Select.Item
                className="font-sm rounded-sm flex items-center h-7 py-4 px-2 relative"
                key={obra}
                value={obra}
              >
                <Select.ItemText>{obra}</Select.ItemText>
                <Select.ItemIndicator className="">
                  <CheckIcon />
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
