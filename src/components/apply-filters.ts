import { setToys } from '../index';
import { isSuitable } from './isSuitable';
import showMessage from './show-message';

function applyFilters() {
  for (let i = 0; i < setToys.length; i++) {
    const curToy = setToys[i];
    const curElem = curToy.htmlEl;
    if (isSuitable(curToy)) {
      curToy.isActive = true;
      curElem?.classList.remove('hide');
    } else {
      curToy.isActive = false;
      curElem?.classList.add('hide');
    }
  }
  const counterOfActive = setToys.reduce((acc, curr) => acc + Number(curr.isActive), 0);
  if (!counterOfActive) {
    showMessage('Извините, совпадений не обнаружено!');
  } else {
    document.querySelector('.message')?.classList.add('hide');
    const toysCards = document.querySelector('.toys-cards');
    if (counterOfActive <= 4) {
      toysCards?.classList.add('toys-cards__narrow');
    } else {
      toysCards?.classList.remove('toys-cards__narrow');
    }
  }
}

export default applyFilters;
