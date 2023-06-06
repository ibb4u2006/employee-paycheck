import axios, { AxiosHeaderValue, HeadersDefaults } from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = '/api';

interface AxiosDefaultHeaders extends HeadersDefaults {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
}

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as AxiosDefaultHeaders & {
  [key: string]: AxiosHeaderValue;
};

export default axiosClient;
