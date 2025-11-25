// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskTable from "../components/TaskTable";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });
  const [confirmTask, setConfirmTask] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async (page = 1) => {
    const { data } = await API.get("/tasks", { params: { page, limit: 5 } });
    setTasks(data.tasks);
    setPageInfo({ page: data.page, totalPages: data.totalPages });
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  const handlePageChange = (_, value) => {
    fetchTasks(value);
  };

  const handleEdit = (task) => {
    navigate(`/tasks/${task._id}`);
  };

  const handleDelete = (task) => {
    setConfirmTask(task);
  };

  const confirmDelete = async () => {
    if (!confirmTask) return;
    await API.delete(`/tasks/${confirmTask._id}`);
    setConfirmTask(null);
    fetchTasks(pageInfo.page);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/tasks/new")}
        >
          Add Task
        </Button>
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </Paper>

      <Stack direction="row" justifyContent="center">
        <Pagination
          count={pageInfo.totalPages}
          page={pageInfo.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>

      <Dialog open={!!confirmTask} onClose={() => setConfirmTask(null)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete &quot;{confirmTask?.title}&quot;?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmTask(null)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
