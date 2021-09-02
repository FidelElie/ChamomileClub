import './_app.css';

// ! Library
import AppProvider from '../lib/providers/app';
import ThemeProvider, { useTheme } from '../lib/providers/theme';

// ! Components
import AppLayout from '../components/core/App';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider
      baseConfigurations={{ titleBase: "The Chamomile Club" }}
      appMap={{
        "/": { titleSuffix: "Introducing London Hold'Em" },
        "/hands": { titleSuffix: "The Hands" },
        "/rules": { titleSuffix: "The Rules"},
        "/founders": { titleSuffix: "Meet The Founders"},
        "/team": { titleSuffix: "The Team" },
        "/jobs": { titleSuffix: "The Jobs" }
      }}
    >
      <ThemeProvider>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ThemeProvider>
    </AppProvider>
  )
}

const AppContainer = props => {
  const { children } = props;
  const theme = useTheme()[0];
  return (
    <div className={theme}>
      <AppLayout>
        { children }
      </AppLayout>
    </div>
  )
}

export default MyApp;
