import { settings, minYear, maxYear, minNumber, maxNumber } from '../index';
import applyFilters from './apply-filters';
import applySettings from './apply-settings';
import { sliderYears, sliderNumber } from './create-sliders';
import sortCards from './sort-cards';

function installListeners() {
  function installBtns(name: string) {
    const btns = document.querySelectorAll(`.filter-${name} button`);
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', (e) => {
        const curButton = e?.target as HTMLElement;
        const attr = curButton.getAttribute('data-filter') as string;
        if (curButton.classList.contains('active')) {
          // убрать фильтр
          curButton.classList.remove('active');
          settings.changeFilter(name, attr, false);
        } else {
          // добавить фильтр
          curButton.classList.add('active');
          settings.changeFilter(name, attr, true);
        }
        // применить фильтр
        applyFilters();
        // сохранить в локал сторадж
        localStorage.setItem('settings', JSON.stringify(settings));
      });
    }
  }
  installBtns('shape');
  installBtns('color');
  installBtns('size');
  // любимые
  const curElement = document.querySelector('.favorite-input-label') as HTMLLabelElement;
  curElement.addEventListener('click', () => {
    const favoriteInput = document.querySelector('.favorite-input') as HTMLInputElement;
    settings.onlyFavorites = !favoriteInput.checked;
    // применить фильтр
    applyFilters();
    // сохранить в локал сторадж
    localStorage.setItem('settings', JSON.stringify(settings));
  });
  // порядок сортировки
  const sortOrder = document.querySelector('.sorting-select');
  sortOrder?.addEventListener('change', function () {
    const options = sortOrder.getElementsByTagName('option');
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        settings.sortOrder = i;
        // отсортировать
        sortCards();
        // сохранить в локал сторадж
        localStorage.setItem('settings', JSON.stringify(settings));
        break;
      }
    }
  });
  // контекстный поиск
  const search = document.querySelector('.search') as HTMLInputElement;
  search?.addEventListener('change', () => {
    settings.search = search.value;
    // применить фильтр
    applyFilters();
  });

  // очистка контекстного поиска
  function onClear() {
    settings.search = search.value;
    applyFilters();
  }
  search?.addEventListener('click', () => {
    // добавим событие search, которое вызовет обработку очистки
    search.addEventListener('search', onClear);
    // ставим timeout на удаление того события, что мы добавили выше.
    // это нужно для того, чтобы обработчик onClear не сработал если мы просто так нажали на элемент
    setTimeout(() => search.removeEventListener('search', onClear));
  });

  // сброс настроек
  const reset = document.querySelector('.reset') as HTMLButtonElement;
  reset.addEventListener('click', () => {
    settings.reset();
    sliderYears.range(minYear, maxYear);
    sliderNumber.range(minNumber, maxNumber);
    applySettings();
    // применить фильтр
    applyFilters();
    // сохранить в локал сторадж
    localStorage.setItem('settings', JSON.stringify(settings));
  });
}

export default installListeners;
