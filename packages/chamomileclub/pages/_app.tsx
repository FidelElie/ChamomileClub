import { ReactNode } from "react";
import type { AppProps } from "next/app"
import "./_app.css";

// ! Library
import ThemeProvider, { useTheme } from "../lib/providers/theme";

const TheChamomileClub = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ThemeProvider>
  )
}

const AppContainer = (props: { children: ReactNode }) => {
  const { children } = props;
  const theme = useTheme()[0];
  return (
    <div className={theme}>
      { children }
    </div>
  )
}

export default TheChamomileClub;
