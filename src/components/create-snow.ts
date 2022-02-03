import { intervalsSnowFlake, settings } from '../index';

function createSnow() {
  function createSnowFlake() {
    const treeContainer = document.querySelector('.tree-container') as HTMLElement;
    if (!treeContainer) {
      return;
    }
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('fas');
    snowFlake.classList.add('fa-snowflake');
    snowFlake.style.left = Math.random() * window.innerWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowFlake.style.opacity = String(Math.random());
    snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowFlake.innerText = '❄';
    snowFlake.style.fontStyle = 'normal';
    treeContainer.appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  const newInterval = setInterval(createSnowFlake, 30);
  intervalsSnowFlake.push(Number(newInterval));
  settings.snow = true;
  localStorage.setItem('settings', JSON.stringify(settings));
}

function stopSnow() {
  for (let i = 0; i < intervalsSnowFlake.length; i++) {
    clearInterval(intervalsSnowFlake[i]);
  }
  intervalsSnowFlake.splice(0, intervalsSnowFlake.length);
  const snowFlakes = document.querySelectorAll('.tree-container i');
  if (snowFlakes?.length > 0) {
    for (let i = 0; i < snowFlakes.length; i++) {
      snowFlakes[i].remove();
    }
  }
  settings.snow = false;
  localStorage.setItem('settings', JSON.stringify(settings));
}

function toggleSnow() {
  if (intervalsSnowFlake?.length > 0) {
    stopSnow();
  } else {
    createSnow();
  }
}

export { createSnow, stopSnow, toggleSnow };
