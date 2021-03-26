import React, { createContext, useState } from "react";

export const PlaceContext = createContext();

const PlaceProvider = ({ children }) => {
  const [currentPlace, setCurrentPlace] = useState("");

  return (
    <PlaceContext.Provider value={{ currentPlace, setCurrentPlace }}>
      {children}
    </PlaceContext.Provider>
  );
};

export default PlaceProvider;
