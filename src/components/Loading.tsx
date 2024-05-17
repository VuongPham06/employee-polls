import { Backdrop, CircularProgress } from '@mui/material';

export const Loading = (props: { loading: boolean }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.loading}>
      <CircularProgress color="inherit" data-testid="loading" />
    </Backdrop>
  );
};
