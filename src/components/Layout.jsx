import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Snackbar, Alert, Typography, Box } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setToastOpen(true);

    // Redirect after short delay
    setTimeout(() => {
      navigate("/signin");
    }, 1200);
  };

  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>
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

      {/* Success Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={1200}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Logged out successfully!
        </Alert>
      </Snackbar>

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
