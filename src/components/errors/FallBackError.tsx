import { Container, Box, Typography, Button } from '@mui/material';

type FallBackErrorProps = {
  onAction: () => void;
};

const FallBackError: React.FC<FallBackErrorProps> = ({ onAction }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" component="h1">
          Oops, there is an error!
        </Typography>
        <Button onClick={onAction}>Try again?</Button>
      </Box>
    </Container>
  );
};

export default FallBackError;
