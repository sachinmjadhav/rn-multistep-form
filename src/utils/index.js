const DELAY = 1000;

export const simulateAsyncCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), DELAY);
  });
};
