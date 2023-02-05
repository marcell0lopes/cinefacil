import { Obra, Genero } from "@/@types";
import { formatGeneros } from "@/utils/FormatGeneros";

import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [obra, setObra] = useState<Obra>("Anime");
  const [generos, setGeneros] = useState<Genero[]>(["Fantasia", "Ação"]);
  const [sugestao, setSugestao] = useState<String>("");

  useEffect(() => {
    console.log("Streamed response: ", sugestao);
  }, [sugestao]);

  const prompt = `Me indique de dois a cinco ${obra}s que contempla os gêneros: ${formatGeneros(
    generos
  )} e que se encaixe com a seguinte descrição: ${descricao}. Adicione uma breve descrição e um link confiável com mais informações referente a obra no final de cada sugestão seguido do termo "Saiba mais:"`;

  const generateSugestao = async (e: any) => {
    e.preventDefault();
    setSugestao("");
    setLoading(true);

    const response = await fetch("/api/generate-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("Edge function retornou");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Esse data é uma stream (readable stream)
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReadingStream } = await reader.read();
      done = doneReadingStream;
      const chunkValue = decoder.decode(value);
      setSugestao((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Header  -> Estrela no github */}

      <h2>
        Descubra o próximo filme que vai te emocionar ou a próxima série para
        maratonar
      </h2>
      <h1>CineFacil</h1>
      <p>Deixe uma descrição do que você gostaria de assitir</p>
      <label htmlFor="descricao" className="sr-only">
        Descrição
      </label>
      <textarea
        id="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      {/* criar regra pelo menos um genero */}
      {!loading && (
        <button onClick={(e) => generateSugestao(e)}>Procurar {obra}</button>
      )}
      {loading && <p>Carregando...</p>}
      {sugestao}
      {/* Footer  -> Social Links */}
    </>
  );
};

export default Home;
