import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = ({
  children,
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <>{children}</>;
};

export default LoadingSpinner;
