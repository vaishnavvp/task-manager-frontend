import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const fetchTask = async () => {
    // fetch list and find by id
    const { data } = await API.get("/tasks", { params: { page: 1, limit: 100 } });
    const task = data.tasks.find((t) => t._id === id);
    if (task) {
      setForm({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    }
  };

  useEffect(() => {
    if (isEdit) fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await API.put(`/tasks/${id}`, form);
    } else {
      await API.post("/tasks", form);
    }
    navigate("/");
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        {isEdit ? "Edit Task" : "Add Task"}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="title"
              label="Title"
              required
              fullWidth
              value={form.title}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              select
              name="status"
              label="Status"
              fullWidth
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskForm;
