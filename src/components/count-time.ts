import { CALCULATED_VALUES_FOR_DATE } from './constans';

function countTime() {
  const today = new Date();
  const currentYear = today.getFullYear();

  const endTime = new Date(`December 31 ${currentYear} 23:59:59`);
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const startTime = new Date();
    const diff = endTime.valueOf() - startTime.valueOf();
    const days = Math.floor(diff / CALCULATED_VALUES_FOR_DATE.days);
    const hours = Math.floor(diff / CALCULATED_VALUES_FOR_DATE.hours) % CALCULATED_VALUES_FOR_DATE.numberHoursInDay;
    const minutes =
      Math.floor(diff / CALCULATED_VALUES_FOR_DATE.minutes) % CALCULATED_VALUES_FOR_DATE.numberMinutesInHour;
    const seconds =
      Math.floor(diff / CALCULATED_VALUES_FOR_DATE.seconds) % CALCULATED_VALUES_FOR_DATE.numberSecondsInMinute;
    if (daysEl) {
      daysEl.innerHTML = String(days);
    }
    if (hoursEl) {
      hoursEl.innerHTML = String(hours < 10 ? '0' + hours : hours);
    }
    if (minutesEl) {
      minutesEl.innerHTML = String(minutes < 10 ? '0' + minutes : minutes);
    }
    if (secondsEl) {
      secondsEl.innerHTML = String(seconds < 10 ? '0' + seconds : seconds);
    }
  }

  setInterval(updateCountdown, 1000);
}

export default countTime;
