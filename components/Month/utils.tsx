export const getNumberOfWeeks = (startDay: number, numberOfDays: number) =>
  Math.ceil((startDay + numberOfDays) / 7);

export const getEndDay = (startDay: number, numberOfDays: number) =>
  (numberOfDays + startDay - 1) % 7;
