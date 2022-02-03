import { setToys, settings } from '../index';

function sortCards() {
  const parent = document.querySelector('.toys-cards');
  setToys
    .sort(function (elA, elB) {
      switch (settings.sortOrder) {
        case 1: {
          if (elA.name > elB.name) return -1;
          if (elA.name < elB.name) return 1;
          return 0;
          break;
        }
        case 2: {
          if (Number(elA.count) < Number(elB.count)) return -1;
          if (Number(elA.count) > Number(elB.count)) return 1;
          return 0;
          break;
        }
        case 3: {
          if (Number(elA.count) > Number(elB.count)) return -1;
          if (Number(elA.count) < Number(elB.count)) return 1;
          return 0;
          break;
        }
        default: {
          if (elA.name < elB.name) return -1;
          if (elA.name > elB.name) return 1;
          return 0;
          break;
        }
      }
    })
    .forEach(function (curEl) {
      parent?.appendChild(curEl.htmlEl);
    });
}

export default sortCards;
