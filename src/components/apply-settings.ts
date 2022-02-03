import { settings } from '../index';
import { changeTree } from './change-tree';
import { changeBackground } from './change-background';
import { createSnow } from './create-snow';
import { createGarland } from './create-garland';
import { TOYS_PROPERTIES } from './constans';

function applySettings() {
  // фильтры
  for (let i = 0; i < TOYS_PROPERTIES.length; i++) {
    const curProp: string[] = settings[TOYS_PROPERTIES[i]];
    const buttons = document.querySelectorAll(`.filter-${TOYS_PROPERTIES[i]} button`);
    for (let j = 0; j < buttons.length; j++) {
      const curButton = buttons[j];
      const attr = curButton.getAttribute('data-filter') as string;
      if (curProp.indexOf(attr) !== -1) {
        curButton.classList.add('active');
      } else {
        curButton.classList.remove('active');
      }
    }
  }
  // любимые
  const favoriteInput = document.querySelector('.favorite-input') as HTMLInputElement;
  favoriteInput.checked = settings.onlyFavorites;
  // порядок сортировки
  const options = document.querySelector('.sorting-select')?.getElementsByTagName('option');
  if (options) {
    const optionSort = options[settings.sortOrder];
    if (optionSort) {
      optionSort.selected = true;
    }
  }
  // поиск
  const search = document.querySelector('.search') as HTMLInputElement;
  if (search) {
    search.value = settings.search;
  }

  // настройки елки
  changeTree(settings.tree);
  changeBackground(settings.background);
  if (settings.snow) {
    createSnow();
  }
  const colorBtns = document.querySelectorAll('.color-btn');
  for (let i = 0; i < colorBtns.length; i++) {
    if (settings.colorGarland === i) {
      colorBtns[i].classList.add('color-btn__active');
    } else {
      colorBtns[i].classList.remove('color-btn__active');
    }
  }
  if (settings.garland) {
    createGarland();
    const garlandSwitch = document.querySelector('.garland-switch') as HTMLElement;
    garlandSwitch.classList.remove('garland-switch-on');
  }
}

export default applySettings;
