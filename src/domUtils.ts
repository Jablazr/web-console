export function setAttributes(
  element: HTMLElement,
  attributes: { [attribute: string]: string }
) {
  for (const attribute in attributes)
    element.setAttribute(attribute, attributes[attribute]);
}

export function css(
  element: HTMLElement,
  styles: {
    [style: string]: string | number;
  }
) {
  for (const style in styles) {
    (<any>element.style)[style] = styles[style];
  }
}
