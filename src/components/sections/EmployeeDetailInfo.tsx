import { EmployeeResponse } from '@/types/response';
import { getDeductionPerBenefit } from '@/utils/paycheck';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

type EmployeeDetailInfoProps = {
  data: EmployeeResponse;
};

const EmployeeDetailInfo: React.FC<EmployeeDetailInfoProps> = ({ data }) => {
  const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const deduction = useMemo(() => {
    return data.benefits.reduce((prev, cur) => {
      return getDeductionPerBenefit(cur) + prev;
    }, 0);
  }, []);

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography component="h3" fontWeight="bold">
          Paycheck Gross Amount:{' '}
        </Typography>
        <Typography component="p" fontWeight="medium">
          {usd.format(data.gross)}
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography component="h3" fontWeight="bold">
          Total Benefit Deduction from Paycheck:{' '}
        </Typography>
        <Typography component="p" fontWeight="medium">
          {usd.format(deduction)}
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography component="h3" fontWeight="bold">
          Total Net after Benefit Deduction:{' '}
        </Typography>
        <Typography component="p" fontWeight="medium">
          {usd.format(data.gross - deduction)}
        </Typography>
      </Box>
    </>
  );
};

export default EmployeeDetailInfo;
