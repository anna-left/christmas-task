import { setToys } from '../index';
import Toy from './classes/Toy';
import dragAndDrop from './drag-and-drop';

// async function takeToys() {
function takeToys() {
  const slotsParent = document.querySelector('.slots');
  const template = document.querySelector('.template-slot .slot') as HTMLElement;
  if (!slotsParent || !template) {
    return;
  }
  const promises = [];
  // удаляем существующие слоты
  let slots = slotsParent.querySelectorAll('.slot');
  if (slots) {
    for (let i = 0; i < slots.length; i++) {
      slots[i].remove();
    }
  }

  // функция создает новый слот
  function createSlot(curToy: Toy) {
    const clone = template.cloneNode(true) as HTMLElement;
    const count = clone.querySelector('.slot-count') as HTMLElement;
    clone.setAttribute('data-num', String(curToy.num));
    if (count) {
      count.innerHTML = String(curToy.count);
    }
    for (let i = 1; i <= Number(curToy.count); i++) {
      const img = document.createElement('img');
      img.classList.add('slot-img');
      img.setAttribute('draggable', 'true');
      img.setAttribute('data-img', `${String(curToy.num)}-${String(i)}`);
      img.setAttribute('data-num', `${String(curToy.num)}`);

      promises.push(
        import(`../assets/toys/${curToy.num}.png`).then((imageURL) => {
          img.src = imageURL.default;
        }),
      );
      clone.appendChild(img);
    }
    slotsParent?.appendChild(clone);
  }

  // помечаем игрушки для украшения, создаем слоты
  for (let i = 0; i < setToys.length; i++) {
    const curToy = setToys[i];
    if (curToy.isSelected) {
      curToy.isTaken = true;
      curToy.countTaken = curToy.count;
      createSlot(curToy);
    } else {
      curToy.isTaken = false;
      curToy.countTaken = 0;
    }
  }

  // если количество слотов = 0 (т.е. нет выбранных игрушек), берем первые 20 из коллекции
  slots = slotsParent.querySelectorAll('.slot');
  if (!slots.length) {
    for (let i = 0; i < 20; i++) {
      const curToy = setToys[i];
      curToy.isTaken = true;
      curToy.countTaken = curToy.count;
      createSlot(setToys[i]);
    }
  }
  dragAndDrop();
}

export default takeToys;
