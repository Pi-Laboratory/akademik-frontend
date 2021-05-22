import { createContext, useCallback, useContext, useMemo } from "react";
import { useHistory, useLocation } from "react-router";

export const RootContext = createContext(null);

export const RootProvider = ({ children, navigation }) => {
  const history = useHistory();
  const location = useLocation();
  const currentNav = useMemo(() => {
    const current = navigation.find(item => {
      return (`${item.path}` === location.pathname);
    });
    return current;
  }, [location, navigation]);

  const navGoTo = useCallback((path) => {
    history.push(path);
  }, [history]);

  const nav = {
    items: navigation,
    current: currentNav,
    go: navGoTo
  }
  return (
    <RootContext.Provider value={{
      navigation: nav
    }}>
      {children}
    </RootContext.Provider>
  )
}

export const useNav = () => {
  const root = useContext(RootContext);
  return root.navigation;
}