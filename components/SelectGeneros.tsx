import * as Collapsible from "@radix-ui/react-collapsible";
import { Genero } from "@/@types";
import { Dispatch, SetStateAction, useState } from "react";
import { Checkbox } from "./Checkbox";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";

const generos: Genero[] = [
  "Aventura",
  "Ação",
  "Comédia",
  "Comédia romantica",
  "Documentário",
  "Drama",
  "Espionagem",
  "Fantasia",
  "Faroeste",
  "Ficção científica",
  "Guerra",
  "Mistério",
  "Musical",
  "Policial",
  "Romance",
  "Suspense",
  "Terror",
  "Thriller",
];

type Props = {
  generos: Genero[];
  setGeneros: Dispatch<SetStateAction<Genero[]>>;
};

export function SelectGeneros(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const title =
    props.generos.length > 0
      ? props.generos.toString().replaceAll(",", ", ")
      : "Clique para selecionar o(s) gênero(s)";

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger
        className={clsx(
          "group mb-4 flex w-full items-center  gap-2 rounded-md px-4 py-2 font-medium",
          "bg-slate-900 text-white/90"
        )}
      >
        {isOpen ? <EyeClosedIcon /> : <EyeOpenIcon />}
        <p className="ml-6 text-sm">{title}</p>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className="grid grid-cols-2  gap-4 sm:grid-cols-3">
          {generos.map((genero) => (
            <Checkbox label={genero} key={genero} {...props} />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
