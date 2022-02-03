import { settings } from '../index';
import Toy from './classes/Toy';
import { TOYS_PROPERTIES } from './constans';

function isSuitable(curToy: Toy) {
  if (curToy.count < settings.minNumber || curToy.count > settings.maxNumber) {
    return false;
  }
  if (curToy.year < settings.minYear || curToy.year > settings.maxYear) {
    return false;
  }
  if (settings.onlyFavorites && !curToy.favorite) {
    return false;
  }
  for (let i = 0; i < TOYS_PROPERTIES.length; i++) {
    const curSett: string[] = settings[TOYS_PROPERTIES[i]];
    const curPropToy: string = curToy[TOYS_PROPERTIES[i]];
    if (curSett.length && curSett.indexOf(curPropToy) === -1) {
      return false;
    }
  }
  // контекстный поиск
  if (settings.search && !curToy.name.toUpperCase().includes(settings.search.toUpperCase())) {
    return false;
  }
  return true;
}

export { isSuitable };
