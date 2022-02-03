import { settings, colorsGarland } from '../index';

function deleteGarland() {
  document.querySelector('.garland')?.remove();
  settings.garland = false;
  localStorage.setItem('settings', JSON.stringify(settings));
}

function createGarland() {
  deleteGarland();
  const garland = document.createElement('div');
  garland.classList.add('garland');
  document.querySelector('.tree-container')?.appendChild(garland);
  const treeContainer = document.querySelector('.tree-container') as HTMLElement;
  const treeImg = document.querySelector('.tree-img') as HTMLElement;
  if (!garland || !treeContainer || !treeImg) {
    return;
  }
  const marginGarland = Math.max((treeContainer.offsetHeight - treeImg.offsetHeight) * 0.86, 0);
  garland.style.marginTop = String(marginGarland) + 'px';

  const settingGarland = [
    [5, 65, 12, 60, 120],
    [7, 60, 10, 85, 170],
    [8, 60, 8, 115, 230],
    [11, 60, 6, 150, 300],
    [18, 55, 4, 190, 380],
    [21, 55, 3.5, 232.5, 465],
    [24, 58, 3, 277.5, 555],
    [28, 58, 2.5, 325, 650],
  ];

  const clientWidth = document.documentElement.clientWidth;
  let koef = 1;
  if (clientWidth < 1040) {
    koef = 0.9 - (1040 - clientWidth) * 0.0005;
  }
  for (let i = 0; i < settingGarland.length; i++) {
    const curSetting = settingGarland[i];
    const garlandUl = document.createElement('ul');
    garlandUl.classList.add('garland-ul');
    garlandUl.style.width = String(curSetting[4] * koef) + 'px';
    garlandUl.style.height = String(curSetting[4] * koef) + 'px';
    garland.appendChild(garlandUl);

    for (let j = 0; j < curSetting[0]; j++) {
      const garlandLi = document.createElement('li') as HTMLElement;
      garlandLi.classList.add('garland-li');
      garlandLi.classList.add(colorsGarland[settings.colorGarland]);
      garlandLi.style.transform = `rotate(${curSetting[1] + curSetting[2] * j}deg) translate(${
        curSetting[3] * koef
      }px) rotate(${-curSetting[1] - curSetting[2] * j}deg)`;
      garlandUl.appendChild(garlandLi);
    }
  }
  settings.garland = true;
  localStorage.setItem('settings', JSON.stringify(settings));
}

export { createGarland, deleteGarland };
