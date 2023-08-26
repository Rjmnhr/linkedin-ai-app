import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [dataResults, setDataResults] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const value = {
    dataResults,
    setDataResults,
    isSignIn,
    setIsSignIn,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useApplicationContext = () => {
  return useContext(MyContext);
};
