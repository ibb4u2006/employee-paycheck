export const PAGE_ROUTES = {
  employees: () => `/employees`,
  employeeDetail: (id: string) => `/employees/${id}`,
};

export const API_ROUTES = {
  getEmployeesList: () => `/employees/search`,
  getEmployeeDetail: (id: string) => `/employees/${id}`,
};
