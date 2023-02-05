import { Dispatch, SetStateAction } from "react";

type Actions = {
  setSugestao: Dispatch<SetStateAction<String>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const generateSugestao = async (
  e: any,
  prompt: string,
  actions: Actions
) => {
  e.preventDefault();
  actions.setSugestao("");
  actions.setLoading(true);

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
    actions.setSugestao((prev) => prev + chunkValue);
  }

  actions.setLoading(false);
};
