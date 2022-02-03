import createSliders from './create-sliders';
import takeToys from './take-toys';
import { settings } from '../index';
import { createGarland } from './create-garland';

function navigation(): void {
  function navigationToPage(namePages: string) {
    const pages = ['main-page', 'toys-page', 'tree-page'];
    for (let i = 0; i < pages.length; i++) {
      const page = document.querySelector(`.${pages[i]}`);
      if (page) {
        if (page.classList.contains(namePages)) {
          page.classList.remove('hide');
        } else {
          page.classList.add('hide');
        }
      }
    }
  }
  document.querySelector('.switch-main')?.addEventListener('click', function () {
    navigationToPage('main-page');
  });
  document.querySelector('.switch-toys')?.addEventListener('click', function () {
    navigationToPage('toys-page');
    createSliders();
  });
  document.querySelector('.switch-tree')?.addEventListener('click', function () {
    // await takeToys();
    takeToys();
    navigationToPage('tree-page');
    if (settings.garland) {
      createGarland();
      const garlandSwitch = document.querySelector('.garland-switch') as HTMLElement;
      garlandSwitch.classList.remove('garland-switch-on');
    }
  });
  document.querySelector('.start-btn')?.addEventListener('click', function () {
    navigationToPage('toys-page');
    createSliders();
  });
}

export default navigation;
