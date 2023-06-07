import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageHeader from '@/components/layout/PageHeader';
import EmployeeDetail from '@/components/sections/EmployeeDetail';
import EmployeeDetailInfo from '@/components/sections/EmployeeDetailInfo';
import { PAGE_ROUTES } from '@/constants/routes';
import { useGetEmployeeDetail } from '@/hooks/useEmployees';
import { EmployeeResponse } from '@/types/response';
import { Container } from '@mui/material';
import { GetServerSideProps } from 'next';

type EmployeeDetailPageProps = {
  id: string;
};

const EmployeeDetailPage: React.FC<EmployeeDetailPageProps> = ({ id }) => {
  const { data, isLoading, refetch: refetchDetail } = useGetEmployeeDetail(id);
  const { name } = data?.data ?? {};
  return (
    <LoadingSpinner isLoading={isLoading}>
      <Container maxWidth="lg">
        <PageHeader backUrl={PAGE_ROUTES.employees()} pageTitle={name ?? ''} />
        <EmployeeDetailInfo data={data?.data as EmployeeResponse} />
        <EmployeeDetail
          data={data?.data as EmployeeResponse}
          onRefetch={refetchDetail}
        />
      </Container>
    </LoadingSpinner>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query?.id;

  return {
    props: {
      id,
    },
  };
};

export default EmployeeDetailPage;
