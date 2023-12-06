const pokeApi = {};

pokeApi.getPokemoDetailById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((response) => response.json());
};

const id = new URLSearchParams(window.location.search).get("id");
const pokemon = new Pokemon();
pokeApi.getPokemoDetailById(id).then((pokemonReq) => {
  // convertPokeApiDetailToPokemon(pokemon);
  console.log(pokemonReq.stats);

  pokemonReq.stats.map((stat) => {
    pokemon.stats.push({
      value: stat.base_stat,
      name: stat.stat.name,
    });
  });
  pokemon.photo = pokemonReq.sprites.other.dream_world.front_default;
  pokemon.number = pokemonReq.id;
  pokemon.name = pokemonReq.name;

  convertStatsToList(pokemon.stats);

  document.querySelector("img").src = pokemon.photo;
  document.getElementById("name").innerText = pokemon.name;
  document.getElementById("number").innerText = "#" + pokemon.number;
});

// function convertPokeApiDetailToPokemon(pokeDetail) {
//   const pokemon = new Pokemon();
//   pokemon.number = pokeDetail.id;
//   pokemon.name = pokeDetail.name;
// }

console.log(pokemon);

convertStatsToList = (stats) => {
  const list = document.getElementById("stats");
  const listValues = document.getElementById("listValues");

  stats.map((stat) => {
    const li = document.createElement("li");
    li.innerText = `${stat.name}`;
    list.appendChild(li);

    const liValue = document.createElement("li");
    liValue.innerText = `${stat.value}`;
    listValues.appendChild(liValue);
  });
};
