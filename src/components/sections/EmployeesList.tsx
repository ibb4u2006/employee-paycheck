import { Search } from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, ChangeEvent } from 'react';

const TABLE_DATA = [...Array(50)].map((_, index) => ({
  id: index,
  title: `Title ${index}`,
}));

interface CellType {
  //   TODO: Implement type
  row: any;
}

type Column = {
  field: string;
  headerName: string;
  renderCell: ({ row }: CellType) => JSX.Element;
};

export const columns = [
  {
    field: 'employeeId',
    headerName: 'Employee Id',
    renderCell: ({ row }: CellType) => {
      const postId = row?.id;

      return (
        <Typography noWrap sx={{ textDecoration: 'none' }}>
          {postId}
        </Typography>
      );
    },
  },
  {
    flex: 1,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      const postTitle = row?.title;
      const postId = row?.id;
      return (
        <Link href={``}>
          <Typography noWrap sx={{ textDecoration: 'none' }}>
            {postTitle}
          </Typography>
        </Link>
      );
    },
  },
] as Column[];

const EmployeesList = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Grid item xs={12}>
        <Box display="flex" width="100%" justifyContent="end">
          <TextField
            type="search"
            label="Search Employees"
            sx={{
              marginBottom: '1.5rem',
            }}
            InputProps={{
              endAdornment: <Search />,
            }}
            onChange={handleSearch}
          />
        </Box>
        <Card>
          <DataGrid
            autoHeight
            rows={TABLE_DATA}
            getRowId={(row) => row.id}
            columns={columns}
            loading={false}
            rowCount={10}
            page={0}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            // filterMode="server"
            sx={{
              '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
              padding: '1rem',
            }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            onPageChange={(newPage: number) => setPage(newPage + 1)}
            // paginationMode="server"
          />
        </Card>
      </Grid>
    </Container>
  );
};

export default EmployeesList;
