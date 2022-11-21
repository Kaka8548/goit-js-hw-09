import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// оголошення змінних

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
startBtnEl.disabled = true;
const daysTextEl = document.querySelector('[data-days]');
const hoursTextEl = document.querySelector('[data-hours]');
const minutesTextEl = document.querySelector('[data-minutes]');
const secondsTextEl = document.querySelector('[data-seconds]');
let timerId = null;

// конвертер

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

//нормалізую число у двозначне

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

// відлік часу

const onStartBtnElClick = date => {
  timerId = setInterval(
    () => {
      const timeDifferenceMs = date - new Date();

      if (timeDifferenceMs <= 0) {
        clearInterval(timerId);
        return;
      }
      const remainingTimeArr = convertMs(timeDifferenceMs);
      daysTextEl.innerHTML = addLeadingZero(remainingTimeArr.days);
      hoursTextEl.innerHTML = addLeadingZero(remainingTimeArr.hours);
      minutesTextEl.innerHTML = addLeadingZero(remainingTimeArr.minutes);
      secondsTextEl.innerHTML = addLeadingZero(remainingTimeArr.seconds);
    },
    1000,
    date
  );
};

// опції flatpickr

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtnEl.disabled = false;
    startBtnEl.addEventListener('click', onStartBtnElClick(selectedDates[0]));
  },
};

flatpickr(inputEl, options);
