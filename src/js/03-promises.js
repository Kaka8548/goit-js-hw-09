import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        return resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onFormElSubmit(event) {
  event.preventDefault();
  const { target } = event;
  const firstDelay = Number(target[0].value);
  const delayStep = Number(target[1].value);
  const amount = Number(target[2].value);
  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    let position = i;
    delay += delayStep;
    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

formEl.addEventListener('submit', onFormElSubmit);
