const content = document.querySelector("#content");
const form = document.querySelector("#form");
const generationShowed = document.querySelector("#showGeneration");
const generation1 = document.querySelector("#Generation1");
const generation2 = document.querySelector("#Generation2");
const generation3 = document.querySelector("#Generation3");
const generation4 = document.querySelector("#Generation4");
const generation5 = document.querySelector("#Generation5");
const generation6 = document.querySelector("#Generation6");

/* lista de pasos del proyecto
    1.buscar la url de la api probarla.
    2.crear un eventListener que cuando la paguina carge realize un fetch a la primera generacion
    3. crear un evento para cada boton uno por cada generacion y que este haga el respectivo fetch
*/ 

const showMainContent = async () => {
    generationShowed.innerHTML = "Generation 1";
    let pokemones = await fetchData();
    const pokemonData = await Promise.all(pokemones.results.map( (pokemon) => {
        return fetchPokemonInfo(pokemon.url);
    }));
    pokemonObjHTML(pokemonData)
}

const showPokemonForGeneration = async (generationNumber) => {
    let pokemonesForGeneration = await fetchforGeneration(generationNumber);
    content.innerHTML = "";
    generationShowed.innerHTML = "";

    const pokemonInfo = await Promise.all(pokemonesForGeneration.results.map(async (pokemon) => {
        const pokemonData = await fetchPokemonInfo(pokemon.url);
        return pokemonData;
    }));

    const generationShown = document.createElement("p");
    generationShown.textContent = `Generation ${generationNumber}`;
    generationShown.classList.add("generationShown");
    generationShowed.appendChild(generationShown);

    pokemonObjHTML(pokemonInfo, generationNumber);
}

const showPokemonForType = async (e) => {
    e.preventDefault();
    const selectForm = document.querySelector('#pokemonForType').value;
    const typePokemonShowed = document.createElement("p");
    typePokemonShowed.textContent = `${selectForm} type pokemon `;
    typePokemonShowed.classList.add("generationShown");
    content.innerHTML = "";
    generationShowed.innerHTML = "";

    let pokemonesForType = await (fetchPokemonForType(selectForm));
    generationShowed.innerHTML = "";
    generationShowed.appendChild(typePokemonShowed);
    
    const pokemonDataForType = await Promise.all(pokemonesForType.pokemon.map( (pokemon) => {
        return fetchPokemonInfo(pokemon.pokemon.url);
    }));

    pokemonObjHTML(pokemonDataForType);
}

const pokemonObjHTML = (pokemonData) => {
    pokemonData.forEach(pokemon => {
        const cardPokemon = document.createElement("div");
        cardPokemon.classList.add("pokemon__card");
        
        //image
        const imagePokemon = document.createElement("img");
        imagePokemon.src = pokemon.sprites.front_default;
        imagePokemon.classList.add("pokemon__image");

        //name
        const pokemonName = document.createElement("p");
        pokemonName.textContent = pokemon.name;
        pokemonName.classList.add("pokemon__name");

        //type
        const typeContainer = document.createElement("div");
        let typePokemon;
        pokemon.types.forEach(types => {
            typePokemon = document.createElement("p");
            typePokemon.textContent = types.type.name;
            typePokemon.classList.add("pokemon__type");
            typeContainer.appendChild(typePokemon);
        })

        cardPokemon.appendChild(imagePokemon);
        cardPokemon.appendChild(pokemonName);
        cardPokemon.appendChild(typeContainer);
        content.appendChild(cardPokemon);
    });
}

//Fetching Data
const fetchData = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const fetchPokemonInfo = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
    return data
    } catch (error) {
        console.log("error al encontrar el dato", error);
        throw error;
    }
}

const fetchforGeneration = async (generationNumber) => {
    let url;
    switch (generationNumber) {
        case 1:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
            break;
        case 2:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
            break;
        case 3:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251';
            break;
        case 4:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386';
            break;
        case 5:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493';
            break;
        case 6:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649';
            break;
        default:
            url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
            break;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const fetchPokemonForType = async (selectForm) => {
    const url = `https://pokeapi.co/api/v2/type/${selectForm}/`;  
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

//eventos
const eventListener = () => {
    document.addEventListener("DOMContentLoaded", showPokemonForGeneration(1), showMainContent);
    form.addEventListener('submit', showPokemonForType);
    generation1.addEventListener("click", () => showPokemonForGeneration(1));
    generation2.addEventListener("click", () => showPokemonForGeneration(2));
    generation3.addEventListener("click", () => showPokemonForGeneration(3));
    generation4.addEventListener("click", () => showPokemonForGeneration(4));
    generation5.addEventListener("click", () => showPokemonForGeneration(5));
    generation6.addEventListener("click", () => showPokemonForGeneration(6));

}

eventListener()


