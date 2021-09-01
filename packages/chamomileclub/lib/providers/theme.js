// ! Next and React
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("light");

const ThemeProvider = props => {
  const { supportedThemes, children } = props;

  const [theme, setTheme] = useState(supportedThemes[0]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme)
    } else {
      window.localStorage.setItem("theme", supportedThemes[0]);
    }
  }, [supportedThemes]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      { children }
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext);

ThemeProvider.propTypes = {
  supportedThemes: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
}

ThemeProvider.defaultProps = {
  supportedThemes: ["light", "dark"]
}

export default ThemeProvider;
export { useTheme };

