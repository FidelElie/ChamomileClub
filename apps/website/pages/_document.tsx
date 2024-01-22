import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

import { DARK_CLASS, THEME_STORAGE_KEY } from "../lib/providers/Theme.provider";

const Document = () => (
  <Html>
    <Head>
      <Script
        id="theme-handler"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            `const storageValue = JSON.parse(localStorage['${THEME_STORAGE_KEY}']);`,
            `const useSetDarkTheme = storageValue === "${DARK_CLASS}";`,
            `console.log(useSetDarkTheme);`,
            `document.documentElement.classList.toggle('${DARK_CLASS}', useSetDarkTheme);`,
          ].join(""),
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
