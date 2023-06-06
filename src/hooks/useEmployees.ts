import { getEmployees } from '@/api/employees';
import { GET_EMPLOYEES_LIST_QUERY } from '@/constants/queries';
import { EmployeeResponsePage, RequestParams } from '@/types/response';
import { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

export const useGetEployeesList = (params: RequestParams) => {
  return useQuery<AxiosResponse<EmployeeResponsePage>, AxiosError>(
    [GET_EMPLOYEES_LIST_QUERY],
    async () => getEmployees({ ...params })
  );
};
