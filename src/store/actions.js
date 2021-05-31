import { ADD_BASICS, ADD_HEALTH, CLEAR } from '../constants/actionTypes';

export const addBasics = (data) => ({
  type: ADD_BASICS,
  payload: data,
});

export const addHealth = (data) => ({
  type: ADD_HEALTH,
  payload: data,
});

export const clearState = () => ({
  type: CLEAR,
});
