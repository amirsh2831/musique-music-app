"use client";

import React, { useState, useContext, createContext } from "react";

const PageContext = createContext(undefined);

export const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  const value = {
    page,
    setPage,
  };
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);
