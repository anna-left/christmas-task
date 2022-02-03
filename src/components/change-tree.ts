import { settings } from '..';

function changeTree(number: number) {
  const mainTree = document.querySelector('.tree-img') as HTMLImageElement;
  if (mainTree) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const imageSrc = require(`../assets/tree/${number}.png`);
      mainTree.src = imageSrc;
      settings.tree = number;
      localStorage.setItem('settings', JSON.stringify(settings));
    } catch (err) {
      // обработка ошибки
    }
  }
}

const handleMenuSpruceClick = (event: Event) => {
  const target = event.target as HTMLElement;
  const menuSpruceId = target?.getAttribute('data-menu-spruce');
  if (menuSpruceId) {
    changeTree(Number(menuSpruceId));
  }
};

export { changeTree, handleMenuSpruceClick };
