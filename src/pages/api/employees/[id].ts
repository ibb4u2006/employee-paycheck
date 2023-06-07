import { EmployeeResponse } from '@/types/response';
import { getData, saveData } from '@/utils/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    // Validate ID
    if (!id) {
      throw new Error('Invalid ID');
    }

    // Read the existing data from the JSON file
    let data: EmployeeResponse[] = await getData();

    if (req.method === 'PUT') {
      const { body } = req;

      // Find the employee detail index by ID
      const dataIndex = data.findIndex((obj) => obj.id === id);

      // Employee detail not found
      if (dataIndex === -1) {
        throw new Error('Employee detail not found');
      }

      // Update employee detail
      data[dataIndex] = { ...data[dataIndex], ...body };

      await saveData(data);

      return res
        .status(200)
        .json({ message: 'Employee detail updated successfully' });
    }

    // Get the employee details by ID
    const employee = data.find((obj) => obj.id === id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    res.status(200).json(employee);
    // TODO: Implement error type
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
