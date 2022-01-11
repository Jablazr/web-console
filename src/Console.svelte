<script lang="ts">
  import { onMount } from "svelte";
  import { ConsoleLine } from "./console/ConsoleLine";
  import { WebConsole } from "./console/WebConsole";
  import { css } from "./domUtils";

  const PROMPT_STRING = "~$&emsp;"; //HTML formatting
  const CONSOLE_HOME_MSG = "Welcome to Web-Console v1.1\nBy jablazr on GitHub";
  const webConsole = new WebConsole(50);

  let form: HTMLFormElement;
  let input: HTMLInputElement;
  let consoleContainer: HTMLDivElement;
  let outputContainer: HTMLDivElement;
  let cmdPrompt: HTMLSpanElement;

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

  const append = (...lines: ConsoleLine[]) => {
    webConsole.append(...lines);

    const lineElements = createLineElements(...webConsole.lines);

    outputContainer.textContent = null;
    outputContainer.append(...lineElements);
  };

  const clear = () => {
    webConsole.clear();

    outputContainer.textContent = null;
  };

  const set = (...lines: ConsoleLine[]) => {
    webConsole.set(...lines);

    const lineElements = createLineElements(...webConsole.lines);

    outputContainer.textContent = null;
    outputContainer.append(...lineElements);
  };

  const handle = (input: string) => {
    // remove all newlines
    input = input.replace(/(\r\n|\n|\r)/gm, "");

    // show the last command
    append({
      parts: [
        {
          text: cmdPrompt.innerText,
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
        append({
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
        clear();

        break;

      default:
        append({
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
  };

  onMount(() => {
    form.onsubmit = (event) => {
      event.preventDefault();

      handle(input.value);

      input.value = "";

      // scroll to the bottom
      consoleContainer.scrollTop = consoleContainer.scrollHeight;
    };

    consoleContainer.addEventListener("click", () => {
      input.focus({
        preventScroll: true,
      });
    });

    set({
      parts: [
        {
          text: CONSOLE_HOME_MSG,
          color: "blue",
        },
      ],
    });

    append({
      parts: [
        {
          text: "Using Svelte!",
          color: "orange",
        },
      ],
    });
  });
</script>

<div bind:this={consoleContainer} class="webConsole">
  <div bind:this={outputContainer} />

  <div class="input">
    <span bind:this={cmdPrompt}>{@html PROMPT_STRING}</span>
    <form bind:this={form} class="form">
      <input bind:this={input} class="chatInput" type="text" />
    </form>
  </div>
</div>

<style>
  .webConsole {
    border: 1px solid black;
    padding: 1em;
    margin: auto;
    font-family: monospace;
    font-style: normal;

    font-size: 1.5em;
    max-width: 20em;
    line-height: normal;
    height: 20em;

    overflow-y: auto;
    word-break: break-word;
  }

  .webConsole .input {
    display: flex;
  }

  .webConsole .input .form {
    flex: 1;
  }

  .chatInput {
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    font: inherit;
  }
</style>
