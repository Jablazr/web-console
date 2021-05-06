// helper functions
function setAttributes(element, attributes) {
    for (const attribute in attributes)
        element.setAttribute(attribute, attributes[attribute]);
}

function css(element, styles) {
    for (const style in styles)
        element.style[style] = styles[style];
}

// console settings
const PROMPT_STRING = "~$&emsp;"; //HTML formatting
const CONSOLE_HEIGHT = "20em";
const CONSOLE_MAX_WIDTH = "20em";
const CONSOLE_HOME_MSG = "Welcome to Web-Console v1.0\nBy jablazr on GitHub";


const consoleContainer = document.getElementById("js-console");

const _console = document.createElement("div");

const cmdPrompt = document.createElement("span");
const inputElement = document.createElement("span");
const outputElement = document.createElement("span");

_console.addEventListener("click", () => {
    inputElement.focus();
});

css(_console, {
    "border": "1px solid black",
    "padding": "1em",
    "margin": "auto",
    "font-family": "monospace",
    "font-style": "normal",

    "font-size": "1.5em",
    "max-width": CONSOLE_MAX_WIDTH,
    "line-height": "normal",
    "height": CONSOLE_HEIGHT,

    "overflow-y": "auto",
    "word-break": "break-word",
});

css(inputElement, {
    "outline": "none",
});

setAttributes(inputElement, {
    "contenteditable": true,
    "onmouseup": "saveSelection();",
    "onkeyup": "saveSelection();",
    "onfocus": "restoreSelection();",
    "oninput": "handleInputEvent(event);",
});

cmdPrompt.innerHTML = PROMPT_STRING;

let lastData = null;
function handleInputEvent(inputEvent) {
    // enter
    switch (inputEvent.inputType) {
        case "insertParagraph":
            handle(inputEvent.target.innerText);
            inputEvent.target.innerText = "";
            break;
        case "insertCompositionText": // chrome on android
            if (lastData === inputEvent.data) {
                handle(inputEvent.target.innerText);
                inputEvent.target.innerText = "";
            }
            break;
        case "insertText": // empty text insertion (insert a new line)
            if (!inputEvent.data) {
                handle(inputEvent.target.innerText);
                inputEvent.target.innerText = "";
            }
    }
    lastData = inputEvent.data;
};


_console.appendChild(outputElement);
_console.appendChild(cmdPrompt);
_console.appendChild(inputElement);

consoleContainer.appendChild(_console);


// fix cursor position when entering commands
// https://stackoverflow.com/a/3323835/13329178
let savedRange = null;
function saveSelection() {
    //non IE Browsers
    if (window.getSelection) {
        savedRange = window.getSelection().getRangeAt(0);
    }
    //IE 
    else if (document.selection) {
        savedRange = document.selection.createRange();
    }
}

function restoreSelection() {
    inputElement.focus();
    if (savedRange) {
        //non IE and there is already a selection
        if (window.getSelection) {
            let s = window.getSelection();
            if (s.rangeCount > 0)
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        //non IE and no selection
        else if (document.createRange) {
            window.getSelection().addRange(savedRange);
        }
        //IE
        else if (document.selection) {
            savedRange.select();
        }
    }
}

//console functions
function setOutput(output) {
    outputElement.innerText = output + "\n";
}

function appendOutput(output) {
    outputElement.innerText += output + "\n";
}

function clearOutput() {
    outputElement.innerText = "";
}

// handle commands
function handle(command) {
    // remove all newlines
    command = command.replace(/(\r\n|\n|\r)/gm, "");

    // show the last command
    appendOutput(cmdPrompt.innerText + command);

    switch (command) {
        case "":
            break;
        case "ping":
        case "ping!":
            appendOutput("pong!");
            break;
        case "clear":
        case "clr":
            clearOutput();
            break;
        default:
            appendOutput(`${command}: command not found`);
    }
}

// initialisation
setOutput(CONSOLE_HOME_MSG);
