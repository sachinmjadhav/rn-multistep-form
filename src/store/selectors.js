export const getBasicsData = (state) => ({
  firstName: state?.firstName,
  lastName: state?.lastName,
  gender: state?.gender,
  date: state?.dob?.date,
  month: state?.dob?.month,
  year: state?.dob?.year,
});

export const getHealthData = (state) => ({
  heightFeet: state?.height?.feet,
  heightInches: state?.height?.inches,
  weight: state?.weight,
  tobacco: state?.tobacco,
});

export const getAllData = (state) => ({ ...state });
