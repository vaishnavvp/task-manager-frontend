import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../context/ThemeContext";

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();

  return (
    <Tooltip title="Toggle light/dark mode">
      <IconButton color="inherit" onClick={toggleMode}>
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
