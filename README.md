# [CineFacil.com](https://cinefacil.vercel.app/)

Esse projeto gera sugestões de Filmes, Séries, Animes ou Reality Shows com bases nos inputs do usuário utilizan Inteligência Artificial.

https://user-images.githubusercontent.com/93684818/216857521-9344b6ff-8507-4420-a068-c0e70ba7e81c.mp4

## Como funciona

Esse projeto utiliza [OpenAI GPT-3 API](https://openai.com/api), especificamente o modelo `text-davinci-003` e [Vercel Edge functions](https://vercel.com/features/edge-functions) com streaming de dados (também deixei a rota `/api/generate` com uma requisição normal, sem streaming, caso queiram comparar os arquivos). A aplicação constrói o prompt de acordo com os inputs do usuário e manda a requisição. 

## Rodando Localmente

Clone o repositório, crie uma conta na [OpenAI](https://beta.openai.com/account/api-keys) e registre uma chave de API.
Depois crie um arquivo chamado `.env.local` e adicione: 

```env

  OPENAI_API_KEY=SUA_CHAVE

```

Então rode a aplicação na porta 3000 por padrão utilizando 

```bash
npm run dev
```
