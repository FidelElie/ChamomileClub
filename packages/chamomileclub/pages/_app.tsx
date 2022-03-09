import type { AppProps } from "next/app"
import "./_app.css";

const TheChamomileClub = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}

export default TheChamomileClub;
