import { setToys } from '../index';

function calcSelected() {
  const counterOfSelected = setToys.reduce((acc, curr) => acc + Number(curr.isSelected), 0);
  const elSelected = document.querySelector('.counter-selected>span') as HTMLElement;
  if (elSelected) {
    elSelected.innerHTML = String(counterOfSelected);
  }
}

export { calcSelected };
