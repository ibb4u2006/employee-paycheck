import path from 'path';
import { readFile, writeFile } from 'node:fs/promises';
import { EmployeeResponse } from '@/types/response';

const employeeFilePath = path.join(
  process.cwd(),
  'src/constants/mocked-api/employee.json'
);

export const getData = async () => {
  const jsonData = await readFile(employeeFilePath, { encoding: 'utf8' });
  return JSON.parse(jsonData);
};

export const saveData = async (data: EmployeeResponse[]) => {
  await writeFile(employeeFilePath, JSON.stringify(data));
};
