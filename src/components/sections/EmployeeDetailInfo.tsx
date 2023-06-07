import { EmployeeResponse } from '@/types/response';
import { formatToUSDCurrency } from '@/utils/format';
import { getDeductionPerBenefit } from '@/utils/paycheck';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';

type EmployeeDetailInfoProps = {
  data: EmployeeResponse;
};

const EmployeeDetailInfo: React.FC<EmployeeDetailInfoProps> = ({ data }) => {
  const deduction = useMemo(() => {
    return data.benefits.reduce((prev, cur) => {
      return getDeductionPerBenefit(cur) + prev;
    }, 0);
  }, [data.benefits]);

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
          {formatToUSDCurrency(data.gross)}
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
          {formatToUSDCurrency(deduction)}
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
          {formatToUSDCurrency(data.gross - deduction)}
        </Typography>
      </Box>
    </>
  );
};

export default EmployeeDetailInfo;
