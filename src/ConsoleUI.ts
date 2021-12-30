import "./style.css";
import { css } from "./domUtils";
import { WebConsole } from "./console/WebConsole";
import { ConsoleLine } from "./console/ConsoleLine";

// console settings
const PROMPT_STRING = "~$&emsp;"; //HTML formatting
const CONSOLE_HOME_MSG = "Welcome to Web-Console v1.1\nBy jablazr on GitHub";

// container for the console
export class ConsoleUI {
  consoleContainer: HTMLElement;
  outputContainer: HTMLDivElement;
  inputContainer: HTMLDivElement;
  cmdPrompt: HTMLSpanElement;
  form: HTMLFormElement;
  input: HTMLInputElement;

  webConsole: WebConsole;

  constructor(parentElement: HTMLElement, maxLines: number) {
    this.consoleContainer = parentElement;
    this.outputContainer = document.createElement("div");
    this.inputContainer = document.createElement("div");
    this.cmdPrompt = document.createElement("span");
    this.form = document.createElement("form");
    this.input = document.createElement("input");

    this.consoleContainer.appendChild(this.outputContainer);
    this.consoleContainer.appendChild(this.inputContainer);
    this.inputContainer.appendChild(this.cmdPrompt);
    this.inputContainer.appendChild(this.form);
    this.form.appendChild(this.input);

    this.consoleContainer.classList.add("webConsole");
    this.inputContainer.classList.add("input");
    this.form.classList.add("form");
    this.input.classList.add("chatInput");

    this.cmdPrompt.innerHTML = PROMPT_STRING;

    this.form.onsubmit = (event) => {
      event.preventDefault();

      this.handle(this.input.value);

      this.input.value = "";

      // scroll to the bottom
      this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
    };

    // set focus on the input element when the console is clicked
    this.consoleContainer.addEventListener("click", () => {
      this.input.focus({
        preventScroll: true,
      });
    });

    this.webConsole = new WebConsole(maxLines);

    this.set({
      parts: [
        {
          text: CONSOLE_HOME_MSG,
          color: "blue",
        },
      ],
    });
  }

  set(...lines: ConsoleLine[]) {
    this.webConsole.set(...lines);

    const lineElements = createLineElements(...this.webConsole.lines);

    this.outputContainer.textContent = null;
    this.outputContainer.append(...lineElements);
  }

  append(...lines: ConsoleLine[]) {
    this.webConsole.append(...lines);

    const lineElements = createLineElements(...this.webConsole.lines);

    this.outputContainer.textContent = null;
    this.outputContainer.append(...lineElements);
  }

  clear() {
    this.webConsole.clear();

    this.outputContainer.textContent = null;
  }

  handle(input: string) {
    // remove all newlines
    input = input.replace(/(\r\n|\n|\r)/gm, "");

    // show the last command
    this.append({
      parts: [
        {
          text: this.cmdPrompt.innerText,
          color: "black",
        },
        {
          text: input,
          color: "grey",
        },
      ],
    });

    switch (input) {
      case "":
        break;

      case "ping":
      case "ping!":
        this.append({
          parts: [
            {
              text: "pong!",
              color: "green",
            },
          ],
        });

        break;

      case "clear":
      case "clr":
        this.clear();

        break;

      default:
        this.append({
          parts: [
            {
              text: input,
              color: "red",
            },
            {
              text: ": command not found!",
              color: "black",
            },
          ],
        });
    }
  }
}

function createLineElements(...lines: ConsoleLine[]) {
  const lineElements: HTMLDivElement[] = [];

  for (const line of lines) {
    const lineElement = document.createElement("div");

    for (const part of line.parts) {
      const span = document.createElement("span");

      span.innerText = part.text;
      css(span, {
        color: part.color,
      });

      lineElement.appendChild(span);
    }

    lineElements.push(lineElement);
  }

  return lineElements;
}
