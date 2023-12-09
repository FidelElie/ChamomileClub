import "./_app.css";

// ! Library
import ThemeProvider from "../lib/providers/Theme.provider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
