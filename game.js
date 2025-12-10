// --- GAME ELEMENTS ---
const screen = document.getElementById("screen");
const input = document.getElementById("input");
const submit = document.getElementById("submit");

// --- STORY DATA ---
const story = {
  start: {
    text: "You wake up in a dark forest. Paths lead north and east.",
    commands: {
      "go north": "cabin",
      "north": "cabin",
      "go east": "river",
      "east": "river"
    }
  },

  cabin: {
    text: "You find a small cabin. The door is slightly open.",
    commands: {
      "enter cabin": "insideCabin",
      "enter": "insideCabin",
      "go back": "start",
      "back": "start"
    }
  },

  insideCabin: {
    text: "Inside the cabin is a lantern on a table.",
    commands: {
      "take lantern": "lanternTaken",
      "leave": "cabin",
      "leave cabin": "cabin"
    }
  },

  lanternTaken: {
    text: "You take the lantern. The room grows darker.",
    commands: {
      "leave": "cabin"
    }
  },

  river: {
    text: "A fast river blocks your path.",
    commands: {
      "cross river": "gameOver",
      "cross": "gameOver",
      "go back": "start",
      "back": "start"
    }
  },

  gameOver: {
    text: "The current sweeps you away. Game over!",
    commands: {
      "restart": "start"
    }
  }
};

// --- GAME STATE ---
let current = "start";

// --- TYPING EFFECT ---
function typeText(element, text, index = 0) {
  if (index < text.length) {
    element.innerHTML += text[index];
    element.scrollTop = element.scrollHeight; // auto-scroll
    setTimeout(() => typeText(element, text, index + 1), 18);
  }
}

// --- RENDER FUNCTION ---
function render() {
  const node = story[current];
  screen.innerHTML += "\n"; // spacing between scenes
  typeText(screen, node.text + "\n");
}

// --- HANDLE COMMAND ---
function handleCommand() {
  const command = input.value.toLowerCase().trim();
  input.value = "";

  // Echo the command to the screen
  screen.innerHTML += `> ${command}\n`;
  screen.scrollTop = screen.scrollHeight;

  const node = story[current];

  if (node.commands[command]) {
    current = node.commands[command];
    render();
  } else {
    typeText(screen, "I don't understand that command.\n");
  }
}

// --- EVENT LISTENERS ---
submit.addEventListener("click", handleCommand);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCommand();
});

// --- START GAME ---
render();
