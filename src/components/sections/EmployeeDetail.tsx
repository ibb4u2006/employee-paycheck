import { useUpdateEmployeeDetail } from '@/hooks/useEmployees';
import { Benefit, EmployeeResponse } from '@/types/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Alert,
  Grid,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { array, number, object, string, TypeOf } from 'zod';
import InputDependents from '../common/InputDependents';
import { getDeductionPerBenefit } from '@/utils/paycheck';
import { formatToUSDCurrency } from '@/utils/format';

// ? Update employee Schema with Zod
const updateEmployeeSchema = object({
  name: string().min(1, { message: 'Name is required' }),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  phone: string().min(1, 'Phone is required'),
  address: string().min(1, 'Address is required'),
  bio: string().min(1, 'Bio is required'),
  age: number().refine((value) => !isNaN(value), 'Age is required'),
  gross: number().refine(
    (value) => !isNaN(value),
    'Gross paycheck is required'
  ),
  benefits: array(string()).min(1, 'Benefit is required'),
  dependents: array(string()),
});

// ? Infer the Schema to get the TS Type
export type UpdateRequest = TypeOf<typeof updateEmployeeSchema>;

type EmployeeDetailProps = {
  data: EmployeeResponse;
  onRefetch: () => void;
};

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ data, onRefetch }) => {
  // ? Default Values
  const defaultValues: EmployeeResponse = { ...data };

  const { mutateAsync, isLoading, error, isSuccess } = useUpdateEmployeeDetail(
    data.id
  );

  const [benefits, setBenefits] = useState<string[]>(data.benefits);

  const handleBenefitChange = (event: SelectChangeEvent<typeof benefits>) => {
    const {
      target: { value },
    } = event;
    setBenefits(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleDependentsChange = (dependents: string[]) => {
    setValue('dependents', dependents);
  };

  // ? The object returned from useForm Hook
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRequest>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmit: SubmitHandler<UpdateRequest> = async (values) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    setValue('benefits', benefits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [benefits]);

  return (
    <>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          textAlign: 'center',
          mb: '1.5rem',
        }}
      >
        Update {data.name} details
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: '1.5rem' }}>
          Failed to update employee details
        </Alert>
      )}

      {isSuccess && (
        <Alert severity="success" sx={{ mb: '1.5rem' }}>
          Employee details updated successfully
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                id="name"
                type="text"
                label="Name"
                error={!!errors.name?.message ?? false}
                {...register('name')}
              />
              {(!!errors.name?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.name?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type="text"
                label="Email"
                error={!!errors.email?.message ?? false}
                {...register('email')}
              />
              {(!!errors.email?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.email?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <OutlinedInput
                id="phone"
                type="tel"
                label="Phone"
                error={!!errors.phone?.message ?? false}
                {...register('phone')}
              />
              {(!!errors.phone?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.phone?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="address">Address</InputLabel>
              <OutlinedInput
                id="address"
                type="text"
                label="Address"
                error={!!errors.address?.message ?? false}
                {...register('address')}
              />
              {(!!errors.address?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.address?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="bio">Bio</InputLabel>
              <OutlinedInput
                id="bio"
                type="text"
                label="Bio"
                error={!!errors.bio?.message ?? false}
                {...register('bio')}
              />
              {(!!errors.bio?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.bio?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="age">Age</InputLabel>
              <OutlinedInput
                id="age"
                type="number"
                label="Age"
                error={!!errors.age?.message ?? false}
                {...register('age', { valueAsNumber: true })}
              />
              {(!!errors.age?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.age?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="gross">Gross paycheck</InputLabel>
              <OutlinedInput
                id="gross"
                type="number"
                label="Gross paycheck"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                error={!!errors.gross?.message ?? false}
                {...register('gross', { valueAsNumber: true })}
              />
              {(!!errors.gross?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.gross?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputLabel htmlFor="gross">Benefits</InputLabel>
              <Select
                labelId="Benefits"
                id="benefits"
                multiple
                value={benefits}
                input={<OutlinedInput label="Benefits" />}
                renderValue={(selected) => selected.join(', ')}
                {...(register('benefits'), { onChange: handleBenefitChange })}
              >
                {['healthcare', 'retirement', 'wellness'].map((benefit) => (
                  <MenuItem key={benefit} value={benefit}>
                    <Checkbox checked={benefits.indexOf(benefit) > -1} />
                    <ListItemText
                      primary={`${benefit} - ${formatToUSDCurrency(
                        getDeductionPerBenefit(benefit as Benefit)
                      )}`}
                    />
                  </MenuItem>
                ))}
              </Select>
              {(!!errors.benefits?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.benefits?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="dependents">Dependents</InputLabel>
            <FormControl
              variant="outlined"
              sx={{
                width: '100%',
                mb: '1.5rem',
              }}
            >
              <InputDependents
                data={getValues('dependents')}
                onAddDependents={handleDependentsChange}
              />
              {(!!errors.dependents?.message ?? false) && (
                <FormHelperText id="component-error-text" error>
                  {errors.dependents?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{
            py: '0.8rem',
          }}
        >
          Update employee details
        </LoadingButton>
      </form>
    </>
  );
};

export default EmployeeDetail;
