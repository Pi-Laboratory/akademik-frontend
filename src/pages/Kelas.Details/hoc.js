import { createContext, useContext } from "react"

const TradeContext = createContext();

const TradeProvider = ({ children, value }) => {
  return (
    <TradeContext.Provider value={value}>
      {children}
    </TradeContext.Provider>
  )
}

export const useTrade = () => {
  const trade = useContext(TradeContext);
  return trade;
}

export default TradeProvider;