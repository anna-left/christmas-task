class Toy {
  num: number;

  name: string;

  count: number;

  year: number;

  shape: string;

  color: string;

  size: string;

  favorite: boolean;

  isActive: boolean;

  htmlEl: HTMLElement;

  isSelected: boolean;

  isTaken: boolean;

  countTaken: number;

  constructor(
    num: number,
    name: string,
    count: number,
    year: number,
    shape: string,
    color: string,
    size: string,
    favorite: boolean,
    isActive: boolean,
    htmlEl: HTMLElement,
    isSelected = false,
    isTaken = false,
    countTaken = 0,
  ) {
    this.num = num;
    this.name = name;
    this.count = count;
    this.year = year;
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.favorite = favorite;
    this.isActive = isActive;
    this.htmlEl = htmlEl;
    this.isSelected = isSelected;
    this.isTaken = isTaken;
    this.countTaken = countTaken;
  }
}

export default Toy;
