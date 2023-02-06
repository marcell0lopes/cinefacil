import { Obra, Genero } from "@/@types";
import Github from "@/components/Github";
import ResizablePanel from "@/components/ResizablePanel";
import { SelectGeneros } from "@/components/SelectGeneros";
import { SelectObra } from "@/components/SelectObra";
import { formatGeneros } from "@/utils/FormatGeneros";
import { generateSugestao } from "@/utils/GenerateSugestao";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [obra, setObra] = useState<Obra>("Filme");
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [sugestao, setSugestao] = useState<String>("");

  const { handleSubmit } = useForm();

  const prompt = `Me indique uma ${obra} que contempla os gêneros: ${formatGeneros(
    generos
  )} e que se encaixe com a seguinte descrição: ${descricao}. Adicione uma breve descrição da obra seguido de um "#".`;

  const onSubmit = (e: any) => {
    generateSugestao(e, prompt, { setLoading, setSugestao });
  };

  return (
    <AnimatePresence>
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-2 pb-8 text-center lg:max-w-2xl">
        <a
          href="https://github.com/marcell0lopes/cinefacil"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "mb-5 flex max-w-fit items-center justify-center space-x-2 rounded-full  px-4 py-2 text-sm text-gray-600 shadow-md",
            "border border-gray-300 bg-white",
            "transition-colors hover:cursor-pointer hover:bg-gray-100"
          )}
        >
          <Github />
          <p>Veja no Github</p>
        </a>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-sm text-orange-500">
            Descubra o próximo filme que vai te emocionar ou a próxima série
            para maratonar
          </h2>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-6xl">
            CineFacil
          </h1>
          <p className="text-sm text-slate-700">
            Deixe uma descrição do que você gostaria de assitir
          </p>
          <label htmlFor="descricao" className="sr-only">
            Descrição
          </label>
          <textarea
            id="descricao"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="ex.: Zumbis com motosserras, com produção recente e efeitos especiais modernos."
            className="w-full rounded-md border border-slate-300 p-4 shadow-sm focus:border-slate-500 focus:ring-orange-500"
          />
          <SelectObra onValueChange={(value) => setObra(value)} />
          <SelectGeneros generos={generos} setGeneros={setGeneros} />

          <button
            className={clsx(
              "w-full rounded-xl px-4 py-2 font-medium text-white hover:bg-orange-400 sm:mt-10",
              loading ? "bg-orange-300" : "bg-orange-500"
            )}
            disabled={loading}
            type="submit"
          >
            {loading ? "Carregando..." : `Procurar ${obra}`}
          </button>

          {sugestao && <ResizablePanel>{sugestao}</ResizablePanel>}
        </form>
      </main>
      <footer className="mt-10 flex w-full  flex-row items-center justify-between bg-slate-100 p-8 text-slate-700">
        <p>
          Feito por{" "}
          <a
            href="https://www.linkedin.com/in/marcellolopes30/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marcello Lopes
          </a>
        </p>
        <div className="[&_a]:hover text flex gap-4">
          <a
            href="https://github.com/marcell0lopes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/marcellolopes30/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogoIcon className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/marcellofront"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogoIcon className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </AnimatePresence>
  );
};

export default Home;
