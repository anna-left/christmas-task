import {
  minYear as minYearGl,
  maxYear as maxYearGl,
  minNumber as minNumberGl,
  maxNumber as maxNumberGl,
} from '..//../index';

class Settings {
  shape: Array<string>;

  color: Array<string>;

  size: Array<string>;

  onlyFavorites: boolean;

  minNumber: number;

  maxNumber: number;

  minYear: number;

  maxYear: number;

  sortOrder: number;

  search: string;

  selected: Array<string>;

  background: number;

  tree: number;

  music: boolean;

  snow: boolean;

  colorGarland: number;

  garland: boolean;

  constructor(
    shape: Array<string>,
    color: Array<string>,
    size: Array<string>,
    onlyFavorites: boolean,
    minNumber: number,
    maxNumber: number,
    minYear: number,
    maxYear: number,
    sortOrder: number,
    search: string,
    selected: Array<string>,
    background: number,
    tree: number,
    music: boolean,
    snow: boolean,
    colorGarland: number,
    garland: boolean,
  ) {
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.onlyFavorites = onlyFavorites;
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
    this.minYear = minYear;
    this.maxYear = maxYear;
    this.sortOrder = sortOrder;
    this.search = search;
    this.selected = selected;
    this.background = background;
    this.tree = tree;
    this.music = music;
    this.snow = snow;
    this.colorGarland = colorGarland;
    this.garland = garland;
  }

  #toggleFilter(arr: Array<string>, value: string, isActive: boolean): void {
    const ind = arr.indexOf(value);
    if (ind === -1 && isActive) {
      arr.push(value);
    } else if (ind !== -1 && !isActive) {
      arr.splice(ind, 1);
    }
  }

  changeFilter(name: string, value: string, isActive: boolean) {
    switch (name) {
      case 'shape': {
        this.#toggleFilter(this.shape, value, isActive);
        break;
      }
      case 'color': {
        this.#toggleFilter(this.color, value, isActive);
        break;
      }
      case 'size': {
        this.#toggleFilter(this.size, value, isActive);
        break;
      }
      default: {
        break;
      }
    }
  }

  reset() {
    this.shape = [];
    this.color = [];
    this.size = [];
    this.onlyFavorites = false;
    this.minNumber = minNumberGl;
    this.maxNumber = maxNumberGl;
    this.minYear = minYearGl;
    this.maxYear = maxYearGl;
    this.search = '';
    this.selected = [];
  }

  resetTree() {
    this.background = 0;
    this.tree = 0;
    this.music = false;
    this.snow = false;
    this.colorGarland = 0;
    this.garland = false;
  }
}

export default Settings;
