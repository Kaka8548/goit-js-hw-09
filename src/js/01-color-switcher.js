const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let timerId = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBgColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const onStartBtnClick = () => {
  startBtnEl.disabled = true;
  changeBgColor();
  timerId = setInterval(() => {
    changeBgColor();
  }, 1000);
};

const onStopBtnClick = () => {
  clearInterval(timerId);
  startBtnEl.disabled = false;
};

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);
