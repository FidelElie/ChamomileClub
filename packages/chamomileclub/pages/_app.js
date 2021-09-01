import './_app.css';

// ! Library
import ThemeProvider, { useTheme } from '../lib/providers/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ThemeProvider>
  )
}

const AppContainer = props => {
  const { children } = props;
  const theme = useTheme()[0];
  return (
    <div className={theme}>
      { children }
    </div>
  )
}

export default MyApp;
