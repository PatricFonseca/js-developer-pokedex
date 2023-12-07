const pokeApi = {};

pokeApi.getPokemoDetailById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((response) => response.json());
};

const id = new URLSearchParams(window.location.search).get("id");
const pokemon = new Pokemon();
pokeApi.getPokemoDetailById(id).then((pokemonReq) => {
  pokemonReq.stats.map((stat) => {
    pokemon.stats.push({
      value: stat.base_stat,
      name: stat.stat.name,
    });
  });
  pokemon.photo = pokemonReq.sprites.other.dream_world.front_default;
  pokemon.number = pokemonReq.id;
  pokemon.name = pokemonReq.name;

  const types = pokemonReq.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  convertStatsToList(pokemon.stats);

  document.getElementById("img_pokemon").src = pokemon.photo;
  document.getElementById("name").innerText = pokemon.name;
  document.getElementById("number").innerText = "#" + pokemon.number;
  document.getElementById("types").innerHTML = ` ${pokemon.types
    .map((type) => `<li class="type ${type}">${type}</li>`)
    .join("")}`;

  document.getElementsByClassName("content")[0].classList.add(pokemon.type);

  pokemon.stats.map((stat) => {
    const statGoodOrBad = stat.value > 50 ? "good" : "bad";
    const div = document.createElement("div");
    div.className = "stats__wrapper";

    // span.style.width = `${stat.value}%`;
    document.getElementById("stats__progress").appendChild(div);
    div.innerHTML = ` 
    <div class="stats__progress-bar">
      <span style="width:${stat.value}%" class="${statGoodOrBad}"></span>
    </div>`;
  });
});

// function convertPokeApiDetailToPokemon(pokeDetail) {
//   const pokemon = new Pokemon();
//   pokemon.number = pokeDetail.id;
//   pokemon.name = pokeDetail.name;
// }

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
