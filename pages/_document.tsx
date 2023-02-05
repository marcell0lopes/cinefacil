import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Descubra o próximo filme que vai te emocionar ou a próxima série para maratonar"
        />
        <meta
          property="og:description"
          content="Descubra o próximo filme que vai te emocionar ou a próxima série para maratonar"
        />
        <meta property="og:title" content="CineFacil" />
        <meta name="twitter:title" content="CineFacil" />
        <meta
          name="twitter:description"
          content="Descubra o próximo filme que vai te emocionar ou a próxima série para maratonar"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
