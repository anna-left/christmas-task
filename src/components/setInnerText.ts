function setInnerText(curSelector: string, curValue: string, clone: HTMLElement) {
  const curElement = clone.querySelector(curSelector) as HTMLElement;
  if (curElement) {
    curElement.innerText = curValue;
  }
}

export { setInnerText };
