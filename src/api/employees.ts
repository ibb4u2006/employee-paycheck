import { API_ROUTES } from '@/constants/routes';
import axiosClient from './axios';
import { AxiosResponse } from 'axios';
import { EmployeeResponsePage, RequestParams } from '@/types/response';

export const getEmployees = async (
  params: RequestParams
): Promise<AxiosResponse<EmployeeResponsePage>> => {
  return await axiosClient.get(API_ROUTES.getEmployeesList(), { params });
};
