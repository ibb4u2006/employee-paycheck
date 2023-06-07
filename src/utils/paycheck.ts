import { swithObjectValues } from './data';

export const getDeductionPerBenefit = (
  benefit: 'healthcare' | 'retirement' | 'wellness'
) => {
  return swithObjectValues(benefit, {
    healthcare: 150,
    retirement: 500,
    wellness: 40,
  });
};
