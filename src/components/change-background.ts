import { settings } from '..';

function changeBackground(number: number) {
  const treeContainer = document.querySelector('.tree-container') as HTMLImageElement;
  if (treeContainer) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const img = require(`../assets/bg/${number}.jpg`);
      treeContainer.style.backgroundImage = `url(${img})`;
      settings.background = number;
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (err) {
      // обработка ошибки
    }
  }
}

const handleMenuBackgroundClick = (event: Event) => {
  const target = event.target as HTMLElement;
  const menuBackgroundId = target?.getAttribute('data-menu-backgrounds');
  if (menuBackgroundId) {
    changeBackground(Number(menuBackgroundId));
  }
};

export { changeBackground, handleMenuBackgroundClick };
