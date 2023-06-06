export type EmployeeResponsePage = {
  results: EmployeeResponse[];
  page: number | null;
  totalElements: number | null;
};

export type EmployeeResponse = {
  id: string;
  gross: number;
  benefits: Benefit[];
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  joined: string;
  dependents: Dependent[];
};

export type Benefit = {
  id: number;
  name: 'healthcare' | 'retirement' | 'wellness';
  cost: number;
};

export type Dependent = {
  id: number;
  name: string;
};

export type RequestParams = {
  page: number;
  limit: number;
  search?: string;
};
