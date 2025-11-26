import { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoaderContext = createContext();
export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}

      {/* Global Loader UI */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999 }}
        open={loading}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </LoaderContext.Provider>
  );
};
