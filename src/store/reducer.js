import { ADD_BASICS, ADD_HEALTH, CLEAR } from '../constants/actionTypes';

const initialState = {
  firstName: '',
  lastName: '',
  gender: null,
  dob: {
    date: '',
    month: '',
    year: '',
  },
  height: {
    feet: '',
    inches: '',
  },
  weight: '',
  tobacco: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BASICS:
      const { firstName, lastName, gender, date, month, year } = action.payload;
      return {
        ...state,
        firstName,
        lastName,
        gender,
        dob: {
          date,
          month,
          year,
        },
      };

    case ADD_HEALTH:
      const { heightFeet, heightInches, tobacco, weight } = action.payload;
      return {
        ...state,
        height: {
          feet: heightFeet,
          inches: heightInches,
        },
        weight,
        tobacco,
      };

    case CLEAR:
      return initialState;

    default:
      return state;
  }
};
