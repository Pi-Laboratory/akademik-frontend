import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useHistory } from "react-router";

export const RootContext = createContext(null);

function navigationReducer(state, action) {
  let ret = { ...state };
  if (!ret[action.base]) {
    ret[action.base] = [];
  }
  return {
    ...ret,
    [action.base]: action.data,
  }
}

export const RootProvider = ({ children }) => {
  const history = useHistory();
  const [items, dispatchItems] = useReducer(navigationReducer, {});
  const currentNav = null;

  const navGoTo = useCallback((path) => {
    history.push(path);
  }, [history]);

  const nav = {
    path: items,
    current: currentNav,
    go: navGoTo
  }
  const __internal = {
    dispatchNavigation: dispatchItems
  };
  return (
    <RootContext.Provider value={{
      navigation: nav,
      __internal: __internal
    }}>
      {children}
    </RootContext.Provider>
  )
}

export const useRoot = () => {
  const root = useContext(RootContext);
  return root;
}

export const Navigation = ({ base, navigation, children }) => {
  const root = useRoot();
  const { __internal } = root;
  useEffect(() => {
    __internal.dispatchNavigation({
      base: base,
      data: navigation
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return children;
}

export const useNav = (base) => {
  const { navigation } = useContext(RootContext);
  const items = useMemo(() => {
    let its = navigation.path[base] || [];
    its = its.map((itm) => {
      if (itm.path.indexOf(base) === 0) return itm;
      let path = base;

      if (base.slice(-1) !== "/")
        path = path.concat("/");

      itm.path = itm.path.replace("/", path);
      return itm;
    });
    return its || null;
  }, [navigation.path, base]);

  return {
    items: items,
    go: navigation.go
  };
}