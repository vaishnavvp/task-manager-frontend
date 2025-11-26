import { Paper, Skeleton, Stack } from "@mui/material";

const TaskSkeleton = ({ rows = 5 }) => {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {[...Array(rows)].map((_, i) => (
        <Stack
          key={i}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ py: 1 }}
        >
          <Skeleton variant="text" width="20%" height={28} />
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="rectangular" width="10%" height={28} />
          <Skeleton variant="text" width="20%" height={28} />
          <Skeleton variant="rectangular" width={30} height={30} />
        </Stack>
      ))}
    </Paper>
  );
};

export default TaskSkeleton;
