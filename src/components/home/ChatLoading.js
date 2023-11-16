import { Skeleton, Stack } from "@mui/material";

export const ChatLoading = () => {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
      <Skeleton animation="wave" variant="rounded" height="3rem" width="90%" />
    </Stack>
  );
};
