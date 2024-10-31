// Get HTML elements for displaying Pokémon data
const pokemonID = document.getElementById("pokemon-id"); // Element to show Pokémon ID
const pokemonName = document.getElementById("pokemon-name"); // Element to display Pokémon name
const spriteContainer = document.getElementById("sprite-container"); // Container for Pokémon sprite image
const types = document.getElementById("types"); // Element to display Pokémon types
const height = document.getElementById("height"); // Element to show Pokémon height
const weight = document.getElementById("weight"); // Element to show Pokémon weight
const hp = document.getElementById("hp"); // Element for Pokémon HP stat
const attack = document.getElementById("attack"); // Element for Pokémon attack stat
const defense = document.getElementById("defense"); // Element for Pokémon defense stat
const specialAttack = document.getElementById("special-attack"); // Element for Pokémon special attack stat
const specialDefense = document.getElementById("special-defense"); // Element for Pokémon special defense stat
const speed = document.getElementById("speed"); // Element for Pokémon speed stat
const searchForm = document.getElementById("search-form"); // Form for Pokémon search
const searchInput = document.getElementById("search-input"); // Input field for Pokémon search (name or ID)

// Function to fetch and display Pokémon data based on user input
const getPokemon = async () => {
  try {
    // Get Pokémon name or ID from the input, making it lowercase for consistency
    const pokemonNameOrId = searchInput.value.toLowerCase();

    // Fetch Pokémon data from the API
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    const data = await response.json();

    // Display Pokémon name and ID
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;

    // Display weight and height
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Display Pokémon sprite image
    spriteContainer.innerHTML = `
        <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
      `;

    // Display Pokémon stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Display Pokémon types, each as a styled span element
    types.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join("");
  } catch (err) {
    // If Pokémon is not found, reset display and show an alert
    resetDisplay();
    alert("Pokémon not found");
    console.log(`Pokémon not found: ${err}`);
  }
};

// Function to reset the display if no Pokémon is found or on a new search
const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove(); // Remove any existing sprite image

  // Clear all Pokémon data fields
  pokemonName.textContent = "";
  pokemonID.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

// Event listener for the search form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting in the traditional way
  getPokemon(); // Fetch and display Pokémon data
});
