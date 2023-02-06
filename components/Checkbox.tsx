import { Genero } from "@/@types";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { CheckIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  label: Genero;
  generos: Genero[];
  setGeneros: Dispatch<SetStateAction<Genero[]>>;
};

export const Checkbox = ({ label, setGeneros, generos }: Props) => {
  const isChecked = generos.findIndex((item) => item === label) > -1;

  const handleChange = (checked: CheckboxPrimitive.CheckedState) => {
    if (checked) {
      setGeneros([...generos, label]);
    } else {
      const filteredList = generos.filter((item) => item !== label);
      setGeneros(filteredList);
    }
  };

  return (
    <form className="flex items-center">
      <CheckboxPrimitive.Root
        onCheckedChange={(checked) => handleChange(checked)}
        id={label}
        checked={isChecked}
        className={clsx(
          "flex h-5 w-5 items-center justify-center rounded-sm",
          isChecked ? "border-0 bg-slate-100" : "bg-slate-200"
        )}
      >
        <CheckboxPrimitive.Indicator className="border border-slate-500 bg-white">
          <CheckIcon className="h-4 w-4 self-center text-slate-500" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <LabelPrimitive.Label
        htmlFor={label}
        className="ml-3 select-none text-left text-sm text-slate-500"
      >
        {label}
      </LabelPrimitive.Label>
    </form>
  );
};
