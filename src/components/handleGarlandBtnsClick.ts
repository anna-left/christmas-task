import { settings } from '..';
import { createGarland } from './create-garland';

function handleGarlandBtnsClick(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.classList.contains('color-btn')) {
    return;
  }
  document.querySelector('.garland-switch')?.classList.remove('garland-switch-on');
  const colorBtns = document.querySelectorAll('.color-btn');
  for (let j = 0; j < colorBtns.length; j++) {
    if (colorBtns[j] === target) {
      colorBtns[j].classList.add('color-btn__active');
      settings.colorGarland = j;
      localStorage.setItem('settings', JSON.stringify(settings));
      createGarland();
    } else {
      colorBtns[j].classList.remove('color-btn__active');
    }
  }
}

export { handleGarlandBtnsClick };
