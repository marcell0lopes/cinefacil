// Vercel Edge Functions + Readable Streams

import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Não foi encontrada a variável de ambiente relacionada a chave de API OpenAI"
  );
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req?.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("Não foi enviado um prompt no request", {
      status: 400,
    });
  }

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
