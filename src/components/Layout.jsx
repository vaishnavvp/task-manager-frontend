// src/components/Layout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Task Manager
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ThemeToggle />
            {user && (
              <>
                <Typography variant="body2">
                  {user.name} ({user.role})
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
