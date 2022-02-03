import Settings from './classes/Settings';
import { minYear, maxYear, minNumber, maxNumber } from '../index';

function createSettings() {
  const lsSettings = localStorage.getItem('settings');
  if (!lsSettings) {
    // если настроек не было - создаем
    return new Settings(
      [],
      [],
      [],
      false,
      minNumber,
      maxNumber,
      minYear,
      maxYear,
      0,
      '',
      [],
      0,
      0,
      false,
      false,
      0,
      false,
    );
  }

  const objSettings = JSON.parse(lsSettings) as Settings;
  return new Settings(
    objSettings.shape,
    objSettings.color,
    objSettings.size,
    objSettings.onlyFavorites,
    objSettings.minNumber,
    objSettings.maxNumber,
    objSettings.minYear,
    objSettings.maxYear,
    objSettings.sortOrder,
    '',
    objSettings.selected,
    objSettings.background,
    objSettings.tree,
    objSettings.music,
    objSettings.snow,
    objSettings.colorGarland,
    objSettings.garland,
  );
}
export default createSettings;
