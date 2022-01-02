import { useContext, createContext } from "react";
import { useState } from "react/cjs/react.development";

const PageContext = createContext(null);

export const PageProvider = ({ children, defaultValue = null }) => {
  const [state, setState] = useState(defaultValue);
  return (
    <PageContext.Provider value={[state, setState]}>
      {children}
    </PageContext.Provider>
  )
}

export const usePage = () => {
  const page = useContext(PageContext);
  return page;
}