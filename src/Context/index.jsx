import React, { createContext, useState } from 'react';

const initialState = {
  auth: false,
  setAuth: (v) => v,
};

export const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState.auth);

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
