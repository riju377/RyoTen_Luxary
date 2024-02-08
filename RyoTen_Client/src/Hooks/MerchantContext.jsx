import React from 'react';

const MerchantContext = React.createContext();

export const MerchantProvider = ({ children }) => {
  const [merchant, setMerchant] = React.useState("Grant PLC");

  return (
    <MerchantContext.Provider value={{ merchant, setMerchant }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => React.useContext(MerchantContext);
