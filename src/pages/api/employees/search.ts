// pages/api/search.ts

import { EmployeeResponse, EmployeeResponsePage } from '@/types/response';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { readFile } from 'node:fs/promises';

const employeeFilePath = path.join(
  process.cwd(),
  'src/constants/mocked-api/employee.json'
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get mock data from local storage or initialize it
    // Read the existing data from the JSON file
    const jsonData = await readFile(employeeFilePath, { encoding: 'utf8' });
    let data: EmployeeResponse[] = JSON.parse(jsonData);

    // Get pagination parameters from query string
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || null;

    // Validate pagination parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new Error('Invalid pagination parameters');
    }

    // Calculate start and end index based on pagination parameters
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filter data by search query value
    const filteredData = !!search
      ? data.filter((obj) =>
          obj.name.toLowerCase().includes(search.toString().toLowerCase())
        )
      : data;

    // Get results for the current page
    const results = filteredData.slice(startIndex, endIndex);

    // Calculate total pages
    const totalElements = filteredData.length;

    // Prepare response
    const response: EmployeeResponsePage = {
      results,
      page,
      totalElements,
    };

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
