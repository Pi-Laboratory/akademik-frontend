import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useHistory, useLocation } from "react-router";

export const RootContext = createContext(null);

function navigationReducer(state, action) {
  let ret = { ...state };
  if (!ret[action.base]) {
    ret[action.base] = [];
  }
  return {
    ...ret,
    [action.base]: [
      ...ret[action.base],
      action.data
    ],
  }
}

export const RootProvider = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [items, dispatchItems] = useReducer(navigationReducer, {});
  const currentNav = useMemo(() => {
    // const current = navigation.find(item => {
    //   return (`${item.path}` === location.pathname);
    // });
    return null;
  }, [location, items]);

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
    for (const item of navigation) {
      __internal.dispatchNavigation({
        base: base,
        data: item
      });
    }
  }, []);
  return children;
}

export const useNav = (base) => {
  const { navigation } = useContext(RootContext);
  const items = useMemo(() => {
    let its = navigation.path[base] || [];
    its = its.map((itm) => {
      itm.path = itm.path.replace("/", base);
      return itm;
    });
    return its || null;
  }, [navigation.path]);
  return {
    items: items,
    go: navigation.go
  };
}