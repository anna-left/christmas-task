import { ToysProperties } from './types';

const numberHoursInDay = 24;
const numberMinutesInHour = 60;
const numberSecondsInMinute = 60;
const seconds = 1000;
const minutes = 1000 * numberMinutesInHour;
const hours = 1000 * numberMinutesInHour * numberSecondsInMinute;
const days = 1000 * numberMinutesInHour * numberSecondsInMinute * numberHoursInDay;
const CALCULATED_VALUES_FOR_DATE = {
  days: days,
  hours: hours,
  minutes: minutes,
  seconds: seconds,
  numberHoursInDay: numberHoursInDay,
  numberMinutesInHour: numberMinutesInHour,
  numberSecondsInMinute: numberSecondsInMinute,
};

const TOYS_PROPERTIES: Array<ToysProperties> = ['shape', 'color', 'size'];

export { CALCULATED_VALUES_FOR_DATE, TOYS_PROPERTIES };
