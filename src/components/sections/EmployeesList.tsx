import { PAGE_ROUTES } from '@/constants/routes';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetEmployeesList } from '@/hooks/useEmployees';
import { EmployeeResponse } from '@/types/response';
import { Search } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, ChangeEvent, useEffect } from 'react';

interface CellType {
  row: EmployeeResponse;
}

type Column = {
  flex: number;
  field: string;
  headerName: string;
  renderCell: (row: CellType) => JSX.Element;
};

export const columns = [
  {
    flex: 1,
    field: 'name',
    headerName: 'Employee name',
    renderCell: ({ row }: CellType) => {
      return (
        <Link href={PAGE_ROUTES.employeeDetail(row.id)}>
          <Typography noWrap sx={{ textDecoration: 'none' }}>
            {row?.name}
          </Typography>
        </Link>
      );
    },
  },
  {
    flex: 1,
    field: 'company',
    headerName: 'Company',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ textDecoration: 'none' }}>
          {row?.company}
        </Typography>
      );
    },
  },
  {
    flex: 2,
    field: 'dependents',
    headerName: 'Dependents',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ textDecoration: 'none' }}>
          {row?.dependents.join(', ')}
        </Typography>
      );
    },
  },
] as Column[];

const EmployeesList = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>();

  const debouncedString = useDebounce(search, 500);

  const {
    data: employeesResponse,
    isLoading: isLoadingEmployees,
    refetch: refetchEmployees,
    error: employeesError,
  } = useGetEmployeesList({ page, limit: pageSize, search: debouncedString });

  const { data } = employeesResponse ?? {};

  const employeesData = data?.results ?? [];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    refetchEmployees();
  }, [page, debouncedString, pageSize]);

  return (
    <Container maxWidth="lg">
      <Grid item xs={12}>
        {employeesError && (
          <Alert
            severity="error"
            sx={{
              marginBottom: '1.5rem',
            }}
          >
            {employeesError?.message}
          </Alert>
        )}
        <Box width="100%" maxWidth={300} marginLeft="auto">
          <TextField
            type="search"
            label="Search employees by name"
            fullWidth
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
            rows={employeesData}
            getRowId={(row) => row.id}
            columns={columns}
            loading={isLoadingEmployees}
            rowCount={data?.totalElements ?? 0}
            page={page - 1}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50]}
            filterMode="server"
            sx={{
              '& .MuiDataGrid-columnHeaders': { borderRadius: 0 },
              padding: '1rem',
            }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            onPageChange={(newPage: number) => setPage(newPage + 1)}
            paginationMode="server"
          />
        </Card>
      </Grid>
    </Container>
  );
};

export default EmployeesList;
