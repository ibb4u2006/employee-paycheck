import { API_ROUTES } from '@/constants/routes';
import axiosClient from './axios';
import { AxiosResponse } from 'axios';
import {
  EmployeeResponse,
  EmployeeResponsePage,
  RequestParams,
} from '@/types/response';
import { UpdateRequest } from '@/components/sections/EmployeeDetail';

export const getEmployees = async (
  params: RequestParams
): Promise<AxiosResponse<EmployeeResponsePage>> => {
  return await axiosClient.get(API_ROUTES.getEmployeesList(), { params });
};

export const getEmployeeDetail = async (
  id: string
): Promise<AxiosResponse<EmployeeResponse>> => {
  return await axiosClient.get(API_ROUTES.getEmployeeDetail(id));
};

export const updateEmployeeDetail = async (
  id: string,
  data: UpdateRequest
): Promise<AxiosResponse<UpdateRequest>> => {
  return await axiosClient.put(API_ROUTES.getEmployeeDetail(id), data);
};
