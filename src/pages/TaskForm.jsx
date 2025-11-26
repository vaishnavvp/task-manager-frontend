import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ----------- Fetch Task for Edit Mode -----------
  const fetchTask = async () => {
    setFetching(true);
    try {
      const { data } = await API.get("/tasks", { params: { page: 1, limit: 100 } });
      const task = data.tasks.find((t) => t._id === id);
      if (task) {
        setForm({
          title: task.title,
          description: task.description || "",
          status: task.status,
        });
      }
    } catch (err) {
      setError("Failed to load task details");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchTask();
  }, [id]);

  // ----------- Submit Form -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEdit) {
        await API.put(`/tasks/${id}`, form);
      } else {
        await API.post("/tasks", form);
      }

      setSuccess(true); // Show success toast

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        {isEdit ? "Edit Task" : "Add Task"}
      </Typography>

      {/* Error Toast */}
      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Toast */}
      <Snackbar
        open={success}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {isEdit ? "Task Updated!" : "Task Created!"}
        </Alert>
      </Snackbar>

      <Paper sx={{ p: 3 }}>
        {fetching ? (
          // ---------- Skeleton Loader While Fetching ----------
          <Stack spacing={2}>
            <CircularProgress size={36} sx={{ mx: "auto", my: 4 }} />
            <Typography align="center">Loading task...</Typography>
          </Stack>
        ) : (
          // ---------- Form ----------
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Title"
                required
                fullWidth
                value={form.title}
                onChange={handleChange}
                disabled={loading}
              />

              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                minRows={3}
                value={form.description}
                onChange={handleChange}
                disabled={loading}
              />

              <TextField
                select
                name="status"
                label="Status"
                fullWidth
                value={form.status}
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>
                  Cancel
                </Button>

                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? (
                    <CircularProgress size={22} sx={{ color: "white" }} />
                  ) : isEdit ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TaskForm;
