// src/components/TaskTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created Date</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task._id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>
              <Chip
                label={task.status}
                color={task.status === "Completed" ? "success" : "warning"}
                size="small"
              />
            </TableCell>
            <TableCell>{formatDate(task.createdAt)}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(task)} size="small">
                <Edit fontSize="small" />
              </IconButton>
              {isAdmin && (
                <IconButton
                  onClick={() => onDelete(task)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
