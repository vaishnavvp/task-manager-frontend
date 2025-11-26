import { useState } from "react";
import {
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../context/ThemeContext";

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();

  const [toast, setToast] = useState({
    open: false,
    message: "",
  });

  const handleToggle = () => {
    const newMode = theme.palette.mode === "dark" ? "light" : "dark";

    toggleMode();

    setToast({
      open: true,
      message:
        newMode === "dark"
          ? "Dark mode activated"
          : "Light mode activated",
    });
  };

  return (
    <>
      <Tooltip title="Toggle light/dark mode">
        <IconButton color="inherit" onClick={handleToggle}>
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={1200}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThemeToggle;
