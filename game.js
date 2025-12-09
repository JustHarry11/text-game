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

// --- GAME ENGINE ---
let current = "start";

function render() {
  const container = document.getElementById("game");
  const node = story[current];

  container.innerHTML = `<p>${node.text}</p>`;
}

function handleCommand() {
  const input = document.getElementById("input");
  const command = input.value.toLowerCase().trim();
  input.value = "";

  const node = story[current];

  if (node.commands[command]) {
    current = node.commands[command];
    render();
  } else {
    // Feedback for invalid command
    document.getElementById("game").innerHTML += `
      <p><em>I don't understand that command.</em></p>
    `;
  }
}

document.getElementById("submit").onclick = handleCommand;

// Allow pressing Enter to submit
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCommand();
});

render();
