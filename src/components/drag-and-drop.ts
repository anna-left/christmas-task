import { setToys } from '../index';

// dragStart: пользователь начинает перетаскивание элемента.
// dragEnter: перетаскиваемый элемент достигает конечного элемента.
// dragOver: курсор мыши наведен на элемент при перетаскивании.
// dragLeave: курсор мыши покидает пределы перетаскиваемого элемента.
// drag: курсор двигается при перетаскивании.
// drop: происходит drop элемента.
// dragEnd: пользователь отпускает курсор мыши в процессе перетаскивания.

function dragAndDrop() {
  const toys = document.querySelectorAll('.slots .slot-img');
  const slots = document.querySelectorAll('.slots .slot');
  const treeMap = document.querySelector('.tree-map area');

  if (!toys || !toys.length || !treeMap) {
    return;
  }

  // функция изменяет счетчик игрушек
  function changeCount(increment: number, slot: HTMLElement) {
    const slotCount = slot?.querySelector('.slot-count');
    if (slotCount) {
      slotCount.innerHTML = String(Number(slotCount.innerHTML) + increment);
    }
  }
  // функция возвращает игрушку в исходный слот
  function returnToSourceSlot(toy: HTMLElement, slotNum: number) {
    const sourceSlot = document.querySelector(`.slot[data-num="${String(slotNum)}"]`) as HTMLElement;
    if (!sourceSlot) {
      return;
    }
    let actionAllowed = true;
    if (setToys && setToys.length) {
      const requiredElement = setToys.find((elToy) => Number(elToy.num) === slotNum);
      if (requiredElement) {
        const maxCount = requiredElement.count;
        let curCount = 0;
        const slotCount = sourceSlot.querySelector('.slot-count');
        if (slotCount) {
          curCount = Number(slotCount.innerHTML);
        }
        if (curCount >= maxCount) {
          actionAllowed = false;
        }
      }
    }
    toy.parentNode?.removeChild(toy);
    if (actionAllowed) {
      changeCount(+1, sourceSlot);
      toy.style.left = '';
      toy.style.top = '';
      sourceSlot.appendChild(toy);
    }
  }
  // *********************************************************
  let isDroped = false;
  function dragStart(this: HTMLElement, event: Event) {
    const dragEvent = event as DragEvent;
    isDroped = false;
    // записываем в событие номер картинки и номер слота
    const dataImg = this.getAttribute('data-img');
    const dataNum = this.getAttribute('data-num');
    if (dataImg && dataNum) {
      dragEvent.dataTransfer?.setData('data-img', dataImg);
      dragEvent.dataTransfer?.setData('data-num', dataNum);
    }
    // записываем в событие положение курсора внутри игрушки
    const shiftX = dragEvent.clientX - this.getBoundingClientRect().left;
    const shiftY = dragEvent.clientY - this.getBoundingClientRect().top;
    if (shiftX && shiftY) {
      dragEvent.dataTransfer?.setData('shiftX', String(shiftX));
      dragEvent.dataTransfer?.setData('shiftY', String(shiftY));
    }
  }

  function dragEnd(this: HTMLElement) {
    if (!isDroped) {
      returnToSourceSlot(this, Number(this.getAttribute('data-num')));
    }
  }

  function dragLeave(this: HTMLElement, event: Event) {
    const dragEvent = event as DragEvent;
    if (!this.classList.contains('slot')) {
      const dataNum = dragEvent.dataTransfer?.getData('data-num') as string;
      if (dataNum) {
        const sourceSlot = document.querySelector(`.slot[data-num="${dataNum}"]`) as HTMLElement;
        if (sourceSlot) {
          sourceSlot.appendChild(this);
          changeCount(+1, sourceSlot);
        }
      }
    }
  }

  // Функция обрабатывает событие dragover, например, перемещение исходного элемента над целевым объектом.
  // Если происходит событие перетаскивания, функция извлекает номер перетаскиваемого элемента
  // из объекта DataTransfer.
  function dragOver(this: HTMLElement, event: Event) {
    const dragEvent = event as DragEvent;
    dragEvent.preventDefault();
  }
  // Если происходит событие перетаскивания, функция извлекает номер перетаскиваемого элемента
  // из объекта DataTransfer.
  function dragDrop(this: HTMLElement, event: Event) {
    const dragEvent = event as DragEvent;
    dragEvent.preventDefault();
    // получим сохраненный номер игрушки и найдем соответствующий элемент
    const dataImg = dragEvent.dataTransfer?.getData('data-img');
    const slotNum = Number(dragEvent.dataTransfer?.getData('data-num'));
    let draggedElement;
    if (dataImg) {
      draggedElement = document.querySelector(`.slot-img[data-img="${String(dataImg)}"]`) as HTMLElement;
    }

    if (!draggedElement) {
      return;
    }
    const treeContainer = document.querySelector('.tree-container') as HTMLElement;
    let indent = 0;
    let widthCont = 1;
    let hightCont = 1;
    if (treeContainer) {
      widthCont = treeContainer.offsetWidth;
      hightCont = treeContainer.offsetHeight;
      indent = (document.documentElement.clientWidth - widthCont) / 2;
    }

    let shiftX = 0;
    let shiftY = 0;
    if (dragEvent.dataTransfer) {
      shiftX = Number(dragEvent.dataTransfer?.getData('ShiftX'));
      shiftY = Number(dragEvent.dataTransfer?.getData('ShiftY'));
    }
    const xPixel = dragEvent.clientX - indent - shiftX;
    const yPixel = dragEvent.clientY - shiftY - draggedElement.offsetHeight;
    const xProc = (xPixel / widthCont) * 100;
    const yProc = (yPixel / hightCont) * 100;

    isDroped = true;
    // если игрушка осталась внутри своего родителя
    if (draggedElement.parentNode === this) {
      draggedElement.style.left = `${xProc}%`;
      draggedElement.style.top = `${yProc}%`;
    } else {
      // если событие "drop" запускается из другого целевого элемента,
      // отсоединяем от него перетаскиваемый элемент и добавляем ее к новому
      // родителю
      if (this.classList.contains('slot')) {
        returnToSourceSlot(draggedElement, slotNum);
      } else {
        if (draggedElement.parentElement) {
          changeCount(-1, draggedElement.parentElement);
          draggedElement.parentNode?.removeChild(draggedElement);
          this.appendChild(draggedElement);
          draggedElement.style.left = `${xProc}%`;
          draggedElement.style.top = `${yProc}%`;
        }
      }
    }
  }

  toys.forEach((toy) => {
    toy.addEventListener('dragstart', dragStart);
    toy.addEventListener('dragend', dragEnd);
  });

  treeMap.addEventListener('dragover', dragOver);
  treeMap.addEventListener('drop', dragDrop);
  treeMap.addEventListener('dragleave', dragLeave);

  slots.forEach((slot) => {
    slot.addEventListener('dragover', dragOver);
    slot.addEventListener('drop', dragDrop);
    slot.addEventListener('dragleave', dragLeave);
  });
}

export default dragAndDrop;
