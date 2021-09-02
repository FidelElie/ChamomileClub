// ! Next and React
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);
const configurations = {
  titleBase: "",
  titleSuffix: "",
  disableNavbar: false,
  disableFooter: false,
}

const AppProvider = props => {
  const { baseConfigurations, appMap, children } = props;
  const initalAppState = {...configurations, ...baseConfigurations}

  const router = useRouter();
  const [appOptions, setAppOptions] = useState(initalAppState);

  useEffect(() => {
    if (router.pathname in appMap) {
      setAppOptions({...appOptions, ...appMap[router.pathname]})
    } else {
      setAppOptions({...appOptions, ...configurations})
    }
  }, [router.pathname, appOptions, appMap]);

  return (
    <AppContext.Provider value={{...appOptions}}>
      { children }
    </AppContext.Provider>
  )
}

const useApp = () => useContext(AppContext);

AppProvider.propTypes = {
  appMap: PropTypes.object.isRequired,
  baseConfigurations: PropTypes.object,
  children: PropTypes.node.isRequired
}

AppProvider.defaultProps = {
  baseConfigurations: {}
}

export default AppProvider;
export { useApp };

