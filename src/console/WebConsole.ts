import { ConsoleLine } from "./ConsoleLine";

export class WebConsole {
  maxLines: number;

  lines: ConsoleLine[];

  constructor(maxLines: number) {
    this.maxLines = maxLines;

    this.lines = [];
  }

  set(...lines: ConsoleLine[]) {
    this.lines = lines.slice(-this.maxLines);
  }

  append(...lines: ConsoleLine[]) {
    this.lines.push(...lines);

    this.lines = this.lines.slice(-this.maxLines);
  }

  clear() {
    this.lines = [];
  }
}
