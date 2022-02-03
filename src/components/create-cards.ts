import { setToys } from '../index';
import Toy from '../components/classes/Toy';
import { calcSelected } from './calcSelected';
import { fillCard } from './fillCard';

async function createCards() {
  // Находим родительский элемент
  // и шаблон карточки
  const toysСards = document.querySelector('.toys-cards');
  const template = document.querySelector('.template .toy-card') as HTMLElement;

  if (!template) {
    return;
  }
  const promises = [];
  for (let i = 0; i < setToys.length; i++) {
    const curElement: Toy = setToys[i];
    // Клонируем новую карточку и заполняем ее
    const clone = template.cloneNode(true) as HTMLElement;
    clone.setAttribute('data-num', String(i));

    const img = clone.querySelector('.toy-card__img') as HTMLImageElement;
    const imgB = clone.querySelector('.toy-card__view-img') as HTMLImageElement;
    if (img && imgB) {
      promises.push(
        import(`../assets/toys/${i + 1}.png`).then((imageURL) => {
          img.src = imageURL.default;
          imgB.src = imageURL.default;
        }),
      );
      // прослушиватель на изображение
      const toyCardView = clone.querySelector('.toy-card__view');
      img.addEventListener('click', () => {
        toyCardView?.classList.add('up');
      });
      toyCardView?.addEventListener('click', () => {
        toyCardView.classList.remove('up');
      });
    }
    fillCard(curElement, clone);

    toysСards?.appendChild(clone);
    curElement.htmlEl = clone;
  }
  calcSelected();
  await Promise.all(promises);
}

export default createCards;
