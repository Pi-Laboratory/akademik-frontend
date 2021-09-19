import { createContext, useContext, useState } from "react"

const InjectContext = createContext();

const InjectProvider = ({ children, ...props }) => {
  const [state, setState] = useState(props.state || null);

  return (
    <InjectContext.Provider value={{
      state,
      setState,
    }}>
      {children}
    </InjectContext.Provider>
  )
}

export const useInject = () => {
  const inject = useContext(InjectContext);
  return inject;
}

export default InjectProvider;