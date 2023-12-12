let currentPokemonID = null;

document.addEventListener("DOMContentLoaded", () => {
  const MAX_POKEMON = 151;
  const pokemonID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > MAX_POKEMON) {
    return (window.location.href = "./pokedex.hmtl");
  }

  currentPokemonID = id;
  loadPokemon(id);
});

async function loadPokemon(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);

    const abilitiesWrapper = document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail-move"
    );
    abilitiesWrapper.innerHTML = "";

    if (currentPokemonID) === id {
        displayPokemonDetails(pokemon);
            const flavorText = getEnglishFlavorText(pokemonSpecies);
            document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText
        
            const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel)=>
                document.querySelector(sel);
            );
            leftArrow.removeEventListener("click", navigatePokemon);
            rightArrow.removeEventListener("click", navigatePokemon);

            if (id !== 1){
                leftArrow.addEventListener("click", ()=> {
                    navigatePokemon (id - 1);
                })
            if (id !== 151){
                rightArrow.addEventListener("click", ()=> {
                    navigatePokemon (id + 1);
                });
            }

        window.history.pushState({}, "", `./poke-detail.html?id=${id}`);    
    }

    return true;
  } catch (error) {
    console.error("An error occured while detching Pokemon data:", error);
    return false;
  }
}

async function navigatePokemon(id){
    currentPokemonID = id;
    await loadPokemon(id);
}

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    dark: "#EE99AC",
}; 

function setElementStyles(elements, cssProperty, value){
    elements.forEach((element) =>{
        element.style[cssProperty] = value
    });
}

function rgbaFromHex(hexcolor){
    return [
        parseInt(hexcolor.slice(1,3), 16),
        parseInt(hexcolor.slice(3,5), 16),
        parseInt(hexcolor.slice(5,7), 16),
    ].join(", "); 
    
}

function setTypeBackgroundColor(pokemon) {
    const mainType = pokemon.types[0].type.name;
    const color = typeColors[mainType];

    if (!color){
        console.warn(`Color not defined for type: ${mainType}`);
        return;
    }
    const
}