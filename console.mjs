// helper functions
function setAttributes(element, attributes) {
    for (const attribute in attributes) element.setAttribute(attribute, attributes[attribute]);
}

function css(element, styles) {
    for (const style in styles) element.style[style] = styles[style];
}

// console settings
const PROMPT_STRING = "~$&emsp;"; //HTML formatting
const CONSOLE_HEIGHT = "20em";
const CONSOLE_MAX_WIDTH = "20em";
const CONSOLE_HOME_MSG = "Welcome to Web-Console v1.1\nBy jablazr on GitHub";

// container for the console
export class Console {
    constructor() {
        this.consoleContainer = document.getElementById("js-console");
        css(this.consoleContainer, {
            border: "1px solid black",
            padding: "1em",
            margin: "auto",
            "font-family": "monospace",
            "font-style": "normal",

            "font-size": "1.5em",
            "max-width": CONSOLE_MAX_WIDTH,
            "line-height": "normal",
            height: CONSOLE_HEIGHT,

            "overflow-y": "auto",
            "word-break": "break-word"
        });

        // contains all the lines (divs) of every output and stacks them
        this.outputContainer = document.createElement("div");
        this.consoleContainer.appendChild(this.outputContainer);

        // input part
        this.inputContainer = document.createElement("div");
        css(this.inputContainer, {
            display: "flex"
        });

        // prompt before the text input
        this.cmdPrompt = document.createElement("span");
        this.cmdPrompt.innerHTML = PROMPT_STRING;
        this.inputContainer.appendChild(this.cmdPrompt);

        // using a form to use the onsubmit as an enter detector
        this.form = document.createElement("form");
        css(this.form, {
            flex: "1"
        });
        this.form.onsubmit = (event) => {
            event.preventDefault();

            //console.log(input.value);
            this.handle(this.input.value);

            this.input.value = null;

            // scroll to the bottom
            this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
        };
        this.inputContainer.appendChild(this.form);

        // input element with the text input
        this.input = document.createElement("input");
        css(this.input, {
            width: "100%",
            border: "none",
            outline: "none",
            padding: 0,
            margin: 0,
            font: "inherit"
        });
        this.form.appendChild(this.input);

        // set focus on the input element when the console is clicked
        this.consoleContainer.addEventListener("click", () => {
            this.input.focus();
        });

        this.consoleContainer.appendChild(this.inputContainer);

        this.setOutput([new OutputPiece(CONSOLE_HOME_MSG, "Blue")]);
    }

    // console functions
    setOutput(output) {
        this.outputContainer.textContent = null;

        const outputElement = createOutputElement(output);
        this.outputContainer.appendChild(outputElement);
    }

    appendOutput(output) {
        const outputElement = createOutputElement(output);
        this.outputContainer.appendChild(outputElement);
    }

    clearOutput() {
        this.outputContainer.textContent = null;
    }

    handle(command) {
        // remove all newlines
        command = command.replace(/(\r\n|\n|\r)/gm, "");

        // show the last command
        this.appendOutput([new OutputPiece(this.cmdPrompt.innerText), new OutputPiece(command, "grey")]);

        switch (command) {
            case "":
                break;
            case "ping":
            case "ping!":
                this.appendOutput([new OutputPiece("pong!", "green")]);
                break;
            case "clear":
            case "clr":
                this.clearOutput();
                break;
            default:
                this.appendOutput([new OutputPiece(command, "red"), new OutputPiece(": command not found")]);
        }
    }
}

export class OutputPiece {
    constructor(text, color = "black") {
        this.text = text;
        this.color = color;
    }
}

function createOutputElement(output) {
    const outputElement = document.createElement("div");

    for (const piece of output) {
        const span = document.createElement("span");
        span.innerText = piece.text;
        css(span, {
            color: piece.color
        });
        outputElement.appendChild(span);
    }

    return outputElement;
}
