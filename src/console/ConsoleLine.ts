import { ColoredText } from "./ColoredText";

export class ConsoleLine {
  parts: ColoredText[];

  constructor(...parts: ColoredText[]) {
    this.parts = parts;
  }
}
