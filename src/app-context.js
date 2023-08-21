import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [dataResults, setDataResults] = useState(null);

  const value = {
    dataResults,
    setDataResults,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
