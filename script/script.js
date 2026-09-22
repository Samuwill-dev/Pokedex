let loadedPokemon = {
    'pokemonId' : [],
    'pokemonName' : [],
    'pokemonType' : [],
    'pokemonImg' : []
}

let limit = 20
let offset = 0
// gesamtanzahl aller pokemon in der api
let totalCount = 0

// alle geladenen pokemon mit der id als key, für das dialog fenster
let pokemonCache = {}

async function fetchData(limit, offset) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    let apidata = await response.json();
    totalCount = apidata.count

    //name holen
    let indexFromApiData = Object.keys(apidata.results)

    for (let indexFromApiData = 0; indexFromApiData < apidata.results.length; indexFromApiData++) {
        let pokemonName = apidata.results[indexFromApiData].name

        await loadData(pokemonName)
    }

}

async function loadData(name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let apidata = await response.json();
    console.log(apidata);

    let pokemonId = apidata.id
    let pokemonName = apidata.name.toUpperCase()
    let pokemonTypes = apidata.types.map(typeInfo => typeInfo.type.name)
    let pokemonImg = apidata.sprites.other.home.front_default

    // fügt daten in array ein
    loadedPokemon.pokemonId.push(pokemonId)
    loadedPokemon.pokemonName.push(pokemonName)
    loadedPokemon.pokemonType.push(pokemonTypes)
    loadedPokemon.pokemonImg.push(pokemonImg)

    let responseTwo = await fetch(`${apidata.species.url}`)
    let apidataSpecies = await responseTwo.json();
    console.log("df", apidataSpecies);

    // speichert die daten fürs dialog fenster, damit nicht nochmal gefetcht werden muss
    pokemonCache[pokemonId] = {
        id: pokemonId,
        name: pokemonName,
        types: pokemonTypes,
        img: pokemonImg,
        height: (apidata.height / 10).toFixed(2),
        weight: (apidata.weight / 10),
        abilities: apidata.abilities.map(abilityInfo => abilityInfo.ability.name),
        stats: apidata.stats.map(statInfo => ({ name: statInfo.stat.name, value: statInfo.base_stat })),
        species: apidataSpecies.genera[4].genus
    }

    console.log(loadedPokemon);
    document.getElementById("card-section").innerHTML += getcard(pokemonId, pokemonName, pokemonTypes, pokemonImg)
}

// limit und offset versetzen
async function loadMorePokemon() {
    offset = offset + limit
    await fetchData(limit, offset)
}


function openDialog(id) {
    let dialogPokemon = pokemonCache[id]

    document.getElementById("pokemon-dialog").innerHTML = "";
    document.getElementById("pokemon-dialog").innerHTML = getDialog(dialogPokemon);
    document.getElementById("infos").innerHTML = getDialogAboutSection(dialogPokemon);

    for (let indexOfType = 0; indexOfType < dialogPokemon.types.length; indexOfType++) {
        document.getElementById("dialog-types").innerHTML += `<div class="type-div">${dialogPokemon.types[indexOfType]}</div>`;
    }

    document.getElementById("pokemon-dialog").showModal();
}

// öffnet das vorherige (-1) oder nächste (1) pokemon, lädt bei Bedarf nach
// gibt es kein nächstes mehr, geht es wieder bei 1 los
async function nextPokemon(id, step) {
    let index = loadedPokemon.pokemonId.indexOf(id) + step

    if (index >= loadedPokemon.pokemonId.length && offset + limit < totalCount) {
        await loadMorePokemon()
    }

    let newId = loadedPokemon.pokemonId[index]
    if (newId === undefined) {
        newId = loadedPokemon.pokemonId[0]
    }
    openDialog(newId)
}

function closeDialog() {
    document.getElementById("pokemon-dialog").close();
}
