import { setToys, settings } from '../index';
import Toy from '../components/classes/Toy';
import { setInnerText } from './setInnerText';
import showMessage from './show-message';
import { calcSelected } from './calcSelected';

function fillCard(curElement: Toy, clone: HTMLElement) {
  setInnerText('.toy-card__title', curElement.name, clone);
  setInnerText('.count>span', String(curElement.count), clone);
  setInnerText('.year>span', String(curElement.year), clone);
  setInnerText('.shape>span', String(curElement.shape), clone);
  setInnerText('.color>span', String(curElement.color), clone);
  setInnerText('.size>span', String(curElement.size), clone);
  if (curElement.favorite) {
    const isFavourite = clone.querySelector('.isFavourite') as HTMLImageElement;
    if (isFavourite) {
      isFavourite.classList.add('isFavourite_yes');
    }
  }
  // прослушиватель на кнопку выбора
  const btn = clone.querySelector('.toy-card__btn');
  // восстанавливаем значение isSelected (полученное из localStorage)
  const selectedLocalStorage = settings.selected;
  if (selectedLocalStorage) {
    curElement.isSelected = selectedLocalStorage.includes(String(curElement.num));
  } else {
    curElement.isSelected = false;
  }
  if (btn) {
    if (curElement.isSelected) {
      btn.querySelector('.toy-card__bow')?.classList.remove('hide');
    }
    btn.addEventListener('click', (e: Event) => {
      const curBtn = e.currentTarget as HTMLElement;
      // подсчитаем количество выбранных элементов
      const counterOfSelected = setToys.reduce((acc, curr) => acc + Number(curr.isSelected), 0);
      if (curElement.isSelected) {
        curElement.isSelected = false;
        curBtn.querySelector('.toy-card__bow')?.classList.add('hide');
        document.querySelector('.message')?.classList.add('hide');
      } else {
        if (counterOfSelected < 20) {
          curElement.isSelected = true;
          curBtn.querySelector('.toy-card__bow')?.classList.remove('hide');
          document.querySelector('.message')?.classList.add('hide');
        } else {
          showMessage('Извините, все слоты заполнены!');
        }
      }
      calcSelected();

      const arrSelected: Array<string> = setToys.filter((el) => el.isSelected).map((el) => String(el.num));
      settings.selected = arrSelected;
      localStorage.setItem('settings', JSON.stringify(settings));
    });
  }
}

export { fillCard };
