import './styles/normalize.css';
import './styles/style.css';

import Toy from './components/classes/Toy';
import createCards from './components/create-cards';
import createSettings from './components/create-settings';
import installListeners from './components/install-listeners';
import applySettings from './components/apply-settings';
import applyFilters from './components/apply-filters';
import sortCards from './components/sort-cards';
import navigation from './components/navigation';
import installListenersTree from './components/install-listeners-tree';
import countTime from './components/count-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const setToys: Array<Toy> = require('./assets/data.json');
const minYear = Number(setToys.reduce((acc, curr) => (Number(acc.year) < Number(curr.year) ? acc : curr)).year);
const maxYear = Number(setToys.reduce((acc, curr) => (Number(acc.year) > Number(curr.year) ? acc : curr)).year);
const minNumber = Number(setToys.reduce((acc, curr) => (Number(acc.count) < Number(curr.count) ? acc : curr)).count);
const maxNumber = Number(setToys.reduce((acc, curr) => (Number(acc.count) > Number(curr.count) ? acc : curr)).count);
const settings = createSettings();
const intervalsSnowFlake: Array<number> = [];
const colorsGarland = ['multicolor', 'red', 'yellow', 'green', 'blue'];
let playMusic: boolean = settings.music;

window.addEventListener('DOMContentLoaded', async () => {
  await createCards();
  applySettings();
  installListeners();
  applyFilters();
  sortCards();
  navigation();
  installListenersTree();
  countTime();
});

document.body.addEventListener('click', () => {
  if (playMusic) {
    const myPlayer = document.querySelector('#audio') as HTMLAudioElement;
    myPlayer.play();
    playMusic = false;
  }
});

export { setToys, minYear, maxYear, minNumber, maxNumber, settings, intervalsSnowFlake, colorsGarland };

console.log(`
\u{1F384} 200 / 200  Выполнены все пункты ТЗ.
\u{2705} 1.	Вёрстка страниц приложения и навигация между ними +30
\u{2705} 2.	Меню с настройками +50
\u{2705} 3.	Гирлянда +40
\u{2705} 4.	Игрушки в избранном +80
\u{2705} 5.	Дополнительный функционал на выбор +20
        Таймер обратного отсчета на главной странице. 
        Возможность просмотра увеличенного изображения игрушки на странице «игрушки».
        Кнопка для удаления игрушек с елки на странице  «елка».
`);
