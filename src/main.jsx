import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeModeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeModeProvider>
  <AuthProvider>
    <LoaderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoaderProvider>
  </AuthProvider>
</ThemeModeProvider>

);
