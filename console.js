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


// this div contains the entire console
const consoleContainer = document.getElementById("js-console");

const _console = document.createElement("div");

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


const cmdPrompt = document.createElement("span");
const input = document.createElement("span");
const outputElement = document.createElement("span");

setAttributes(input, {
    "contenteditable": true,
    "onmouseup": "saveSelection();",
    "onkeyup": "saveSelection();",
    "onfocus": "restoreSelection();"
});

css(input, {
    "outline": "none",
});

_console.addEventListener("click", () => {
    input.focus();
});

cmdPrompt.innerHTML = PROMPT_STRING;

// console input
input.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.code === "Enter") {
        // don't actually create a new line
        event.preventDefault();

        handle(input.innerText);

        input.innerText = "";
    }
});

_console.appendChild(outputElement);
_console.appendChild(cmdPrompt);
_console.appendChild(input);

consoleContainer.appendChild(_console);


// fix cursor position when entering commands
// https://stackoverflow.com/a/3323835/13329178
let savedRange;
function saveSelection() {
    if (window.getSelection)//non IE Browsers
    {
        savedRange = window.getSelection().getRangeAt(0);
    }
    else if (document.selection)//IE
    {
        savedRange = document.selection.createRange();
    }
}

function restoreSelection() {
    input.focus();
    if (savedRange != null) {
        if (window.getSelection)//non IE and there is already a selection
        {
            let s = window.getSelection();
            if (s.rangeCount > 0)
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        else if (document.createRange)//non IE and no selection
        {
            window.getSelection().addRange(savedRange);
        }
        else if (document.selection)//IE
        {
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
    // show the last command
    appendOutput(cmdPrompt.innerText + input.innerText);

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
            appendOutput(`${input.innerText}: command not found`);
    }
}

// initial stuff
setOutput(CONSOLE_HOME_MSG);