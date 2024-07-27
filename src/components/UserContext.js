import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{ email, setEmail, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
