import { Grid, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const PageHeader = ({
  pageTitle,
  adornment,
  backUrl,
}: {
  pageTitle: string;
  backUrl?: string;
  adornment?: React.ReactNode;
}) => {
  return (
    <Grid container alignItems="start" gap={5}>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginTop={'3rem'}
        marginBottom={'2rem'}
      >
        <Box display="flex" alignItems="center" gap={5}>
          {backUrl && (
            <Link href={backUrl}>
              <Button>Back</Button>
            </Link>
          )}
          <Typography
            variant="h5"
            component="h1"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
        {adornment}
      </Box>
    </Grid>
  );
};

export default PageHeader;
