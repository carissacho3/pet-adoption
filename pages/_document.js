import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://kit.fontawesome.com/7f99a72c13.js"
          crossOrigin="anonymous"
          async
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}

