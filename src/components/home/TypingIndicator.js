import { Skeleton, Stack } from "@mui/material";

export const TypingIndicator = () => {
  return (
    <Stack
      spacing={0.5}
      marginLeft="1.5rem"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      padding={1}
    >
      <Skeleton variant="circular" height={15} width={15} />
      <Skeleton variant="circular" height={15} width={15} />
      <Skeleton variant="circular" height={15} width={15} />
    </Stack>
  );
};
