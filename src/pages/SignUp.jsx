import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/signup", form);
      login(data);

      setSuccess(true);

      // Navigate after short delay
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* Error toast */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        {/*Success toast */}
        <Snackbar
          open={success}
          autoHideDuration={1200}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Signup successful!
          </Alert>
        </Snackbar>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="name"
            required
            fullWidth
            label="Full Name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            name="email"
            required
            fullWidth
            label="Email Address"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            name="password"
            required
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            select
            name="role"
            label="Role"
            margin="normal"
            fullWidth
            value={form.role}
            onChange={handleChange}
            disabled={loading}
          >
            <MenuItem value="user">Normal User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <MuiLink
                component={Link}
                to="/signin"
                variant="body2"
                sx={{ pointerEvents: loading ? "none" : "auto" }}
              >
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
