import { settings, minYear, maxYear, minNumber, maxNumber } from '../index';
import applyFilters from './apply-filters';
declare let createD3RangeSlider: (minYear: number, maxYear: number, id: string) => Record<string, Function>;

export let sliderYears: Record<string, Function>;
export let sliderNumber: Record<string, Function>;

function createSliders() {
  const sliders = document.querySelectorAll('.slider');
  if (sliders && sliders.length > 0) {
    return;
  }
  // слайдер - годы
  sliderYears = createD3RangeSlider(minYear, maxYear, '#slider-years');
  const beginYear = settings.minYear ? settings.minYear : minYear;
  const endYear = settings.maxYear ? settings.maxYear : maxYear;
  const sliderYearsBegin = document.querySelector('.slider-years-begin');
  const sliderYearsEnd = document.querySelector('.slider-years-end');

  // начальные значения
  sliderYears.range(beginYear, endYear);
  if (sliderYearsBegin) {
    sliderYearsBegin.innerHTML = String(beginYear);
  }
  if (sliderYearsEnd) {
    sliderYearsEnd.innerHTML = String(endYear);
  }
  // при изменении слайдера
  sliderYears.onChange(function (newRange: Record<string, string>) {
    if (sliderYearsBegin) {
      sliderYearsBegin.innerHTML = newRange.begin;
    }
    if (sliderYearsEnd) {
      sliderYearsEnd.innerHTML = newRange.end;
    }
    settings.minYear = Number(newRange.begin);
    settings.maxYear = Number(newRange.end);
    localStorage.setItem('settings', JSON.stringify(settings));
    applyFilters();
  });

  // слайдер - количество
  sliderNumber = createD3RangeSlider(minNumber, maxNumber, '#slider-number');
  const beginNumber = settings.minNumber ? settings.minNumber : minNumber;
  const endNumber = settings.maxNumber ? settings.maxNumber : maxNumber;
  const sliderNumberBegin = document.querySelector('.slider-number-begin');
  const sliderNumberEnd = document.querySelector('.slider-number-end');
  // начальные значения
  sliderNumber.range(beginNumber, endNumber);
  if (sliderNumberBegin) {
    sliderNumberBegin.innerHTML = String(beginNumber);
  }
  if (sliderNumberEnd) {
    sliderNumberEnd.innerHTML = String(endNumber);
  }
  // при изменении слайдера
  sliderNumber.onChange(function (newRange: Record<string, string>) {
    if (sliderNumberBegin) {
      sliderNumberBegin.innerHTML = newRange.begin;
    }
    if (sliderNumberEnd) {
      sliderNumberEnd.innerHTML = newRange.end;
    }
    settings.minNumber = Number(newRange.begin);
    settings.maxNumber = Number(newRange.end);
    localStorage.setItem('settings', JSON.stringify(settings));
    applyFilters();
  });
}

// function changeSlider(curSlider, name: string) {
//   const curSliderBegin = document.querySelector(`.slider-${name}-begin`);
//   const curSliderEnd = document.querySelector(`.slider-${name}-end`);
//   curSlider.onChange(function (newRange: Record<string, string>) {
//     if (curSliderBegin) {
//       curSliderBegin.innerHTML = newRange.begin;
//     }
//     if (curSliderEnd) {
//       curSliderEnd.innerHTML = newRange.end;
//     }
//     if (name === 'Number') {
//       settings.minNumber = Number(newRange.begin);
//       settings.maxNumber = Number(newRange.end);
//     } else {
//       settings.minYear = Number(newRange.begin);
//       settings.maxYear = Number(newRange.end);
//     }
//     localStorage.setItem('settings', JSON.stringify(settings));
//     applyFilters();
//   });
// }

export default createSliders;
// export { createSliders, changeSlider };
