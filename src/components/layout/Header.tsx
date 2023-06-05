import { Container, Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          Employees Benefit App
        </Typography>
        <Box maxWidth="sm">By Ibrahim Bello</Box>
      </Box>
    </Container>
  );
};

export default Header;
