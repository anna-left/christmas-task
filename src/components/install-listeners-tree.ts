import togglePlay from './toggle-play';
import { toggleSnow, stopSnow } from './create-snow';
import { createGarland, deleteGarland } from './create-garland';
import { settings } from '..';
import { changeTree, handleMenuSpruceClick } from './change-tree';
import { changeBackground, handleMenuBackgroundClick } from './change-background';
import { handleGarlandBtnsClick } from './handleGarlandBtnsClick';
import takeToys from './take-toys';

function installListenersTree() {
  const menuSound = document.querySelector('.menu-sound');
  menuSound?.addEventListener('click', () => {
    togglePlay();
  });
  const menuSnow = document.querySelector('.menu-snow');
  menuSnow?.addEventListener('click', () => {
    toggleSnow();
  });
  const menuReset = document.querySelector('.menu-reset');
  menuReset?.addEventListener('click', () => {
    settings.resetTree();
    changeTree(1);
    changeBackground(1);
    stopSnow();
    deleteGarland();
    const myPlayer = document.querySelector('#audio') as HTMLAudioElement;
    myPlayer.pause();
    const garlandSwitch = document.querySelector('.garland-switch') as HTMLElement;
    garlandSwitch.classList.add('garland-switch-on');
    localStorage.setItem('settings', JSON.stringify(settings));
  });

  document.querySelector('.menu-spruces')?.addEventListener('click', handleMenuSpruceClick);
  document.querySelector('.menu-backgrounds')?.addEventListener('click', handleMenuBackgroundClick);

  const treeReset = document.querySelector('.tree-reset');
  if (treeReset) {
    treeReset.addEventListener('click', () => {
      const treeToys = document.querySelectorAll('.tree-map .slot-img');
      if (treeToys && treeToys.length > 0) {
        for (let i = 0; i < treeToys.length; i++) {
          treeToys[i].remove();
        }
        takeToys();
      }
    });
  }
}

const garlandSwitch = document.querySelector('.garland-switch');
if (garlandSwitch) {
  garlandSwitch.addEventListener('click', (event) => {
    const eventTarget = event.target as HTMLElement;
    if (eventTarget.classList.contains('garland-switch-on')) {
      createGarland();
      garlandSwitch.classList.remove('garland-switch-on');
    } else {
      deleteGarland();
      garlandSwitch.classList.add('garland-switch-on');
    }
  });
}

document.querySelector('.garland-btns')?.addEventListener('click', handleGarlandBtnsClick);

export default installListenersTree;
