import {
  getEmployeeDetail,
  getEmployees,
  updateEmployeeDetail,
} from '@/api/employees';
import { UpdateRequest } from '@/components/sections/EmployeeDetail';
import {
  GET_EMPLOYEES_LIST_QUERY,
  GET_EMPLOYEE_DETAIL_QUERY,
} from '@/constants/queries';
import {
  EmployeeResponse,
  EmployeeResponsePage,
  RequestParams,
} from '@/types/response';
import { AxiosResponse, AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useGetEmployeesList = (params: RequestParams) => {
  return useQuery<AxiosResponse<EmployeeResponsePage>, AxiosError>(
    [GET_EMPLOYEES_LIST_QUERY],
    async () => await getEmployees({ ...params })
  );
};

export const useGetEmployeeDetail = (id: string) => {
  return useQuery<AxiosResponse<EmployeeResponse>, AxiosError>(
    [GET_EMPLOYEE_DETAIL_QUERY],
    async () => await getEmployeeDetail(id)
  );
};

export const useUpdateEmployeeDetail = (id: string) => {
  return useMutation(
    [GET_EMPLOYEE_DETAIL_QUERY],
    async (data: UpdateRequest) => await updateEmployeeDetail(id, data)
  );
};
