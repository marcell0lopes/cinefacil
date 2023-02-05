import { Obra, Genero } from "@/@types";
import Github from "@/components/Github";
import { SelectObra } from "@/components/SelectObra";
import { formatGeneros } from "@/utils/FormatGeneros";
import { generateSugestao } from "@/utils/GenerateSugestao";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [obra, setObra] = useState<Obra>("Filme");
  const [generos, setGeneros] = useState<Genero[]>(["Fantasia", "Ação"]);
  const [sugestao, setSugestao] = useState<String>("");

  const { handleSubmit } = useForm();

  useEffect(() => {
    console.log("Streamed response: ", sugestao);
  }, [sugestao]);

  const prompt = `Me indique uma ${obra} que contempla os gêneros: ${formatGeneros(
    generos
  )} e que se encaixe com a seguinte descrição: ${descricao}. Adicione uma breve descrição e um link confiável com mais informações referente a obra no final de cada sugestão seguido do termo "Saiba mais:"`;

  const onSubmit = (e: any) => {
    generateSugestao(e, prompt, { setLoading, setSugestao });
  };

  return (
    <main className="flex flex-col  max-w-md h-screen lg:max-w-2xl mx-auto text-center items-center justify-center">
      <a
        href="https://github.com/marcell0lopes/cinefacil"
        target="_blank"
        rel="noopener noreferrer"
        className="flex max-w-fitt items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5 hover:cursor-pointer"
      >
        <Github />
        <p>Veja no Github</p>
      </a>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-orange-500">
          Descubra o próximo filme que vai te emocionar ou a próxima série para
          maratonar
        </h2>
        <h1 className="sm:text-6xl text-4xl font-bold text-slate-900">
          CineFacil
        </h1>
        <p className="text-slate-700 mt-5">
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
          placeholder="ex.: Zumbis com motosserras, com produção recente e efeitos espeicias modernos."
          className="w-full rounded-md border-slate-300 border shadow-sm focus:border-slate-500 focus:ring-orange-500 my-3"
        />
        <SelectObra onValueChange={(value) => setObra(value)} />
        {/* criar regra pelo menos um genero */}
        {!loading && (
          <button
            className="bg-orange-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-orange-400 w-full"
            disabled={loading}
            type="submit"
          >
            Procurar {obra}
          </button>
        )}
        {loading && <p>Carregando...</p>}
        {sugestao}
      </form>
      {/* Footer  -> Social Links */}
    </main>
  );
};

export default Home;
