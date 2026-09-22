let loadedPokemon = {
    'pokemonId' : [],
    'pokemonName' : [],
    'pokemonType' : [],
    'pokemonImg' : []
}

let limit = 20
let offset = 0
let totalCount = 0 // gesamtanzahl aller pokemon in der api
let pokemonCache = {} // alle geladenen pokemon mit der id als key, für das dialog fenster

async function fetchData(limit, offset) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    let apidata = await response.json();
    totalCount = apidata.count

    for (let indexFromApiData = 0; indexFromApiData < apidata.results.length; indexFromApiData++) {
        let pokemonName = apidata.results[indexFromApiData].name
        await fetchName(pokemonName)
    }
}

async function fetchName(name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let apidata = await response.json();

    let responseTwo = await fetch(`${apidata.species.url}`)
    let apidataSpecies = await responseTwo.json();
    loadData(apidata, apidataSpecies)
}

function loadData(apidata, apidataSpecies) {
    let pokemon = cachePokemon(apidata, apidataSpecies)
    pokemonCache[pokemon.id] = pokemon

    loadedPokemon.pokemonId.push(pokemon.id)
    loadedPokemon.pokemonName.push(pokemon.name)
    loadedPokemon.pokemonType.push(pokemon.types)
    loadedPokemon.pokemonImg.push(pokemon.img)

    document.getElementById("card-section").innerHTML += getcard(pokemon.id, pokemon.name, pokemon.types, pokemon.img)
}


// baut die daten fürs dialog fenster, damit nicht nochmal gefetcht werden muss
function cachePokemon(apidata, apidataSpecies) {
    let stats = apidata.stats.map(statInfo => ({ name: statInfo.stat.name, value: statInfo.base_stat }))
    let hp = getStatValue(stats, "hp")
    let attack = getStatValue(stats, "attack")
    let defense = getStatValue(stats, "defense")
    let spAtk = getStatValue(stats, "special-attack")
    let spDef = getStatValue(stats, "special-defense")
    let speed = getStatValue(stats, "speed")
    let total = hp + attack + defense + spAtk + spDef + speed

    return {
        id: apidata.id,
        name: apidata.name.toUpperCase(),
        types: apidata.types.map(typeInfo => typeInfo.type.name),
        img: apidata.sprites.other.home.front_default,
        height: (apidata.height / 10).toFixed(2),
        weight: (apidata.weight / 10),
        abilities: apidata.abilities.map(abilityInfo => abilityInfo.ability.name),
        stats: stats,
        hp: hp,
        attack: attack,
        defense: defense,
        spAtk: spAtk,
        spDef: spDef,
        speed: speed,
        total: total,
        species: apidataSpecies.genera[4].genus,
    }
}


function openDialog(id) {
    let dialogPokemon = pokemonCache[id]

    document.getElementById("pokemon-dialog").innerHTML = "";
    document.getElementById("pokemon-dialog").innerHTML = getDialog(dialogPokemon);
    switchTab("about", id);

    for (let indexOfType = 0; indexOfType < dialogPokemon.types.length; indexOfType++) {
        document.getElementById("dialog-types").innerHTML += `<div class="type-div">${dialogPokemon.types[indexOfType]}</div>`;
    }
    document.getElementById("pokemon-dialog").showModal();
}


async function loadMorePokemon() {
    offset = offset + limit
    await fetchData(limit, offset)
}


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

function switchTab(tab, id) {
    let dialogPokemon = pokemonCache[id]

    switch (tab) {
        case "about": // wenn about angefragt wird
            document.getElementById("infos").innerHTML = getDialogAboutSection(dialogPokemon)
            break

        case "stats": // wenn stats angefragt wird
            document.getElementById("infos").innerHTML = getDialogBaseStatsSection(dialogPokemon)
            break
    }
}


function closeDialog() {
    document.getElementById("pokemon-dialog").close();
}

// schliesst den dialog, wenn direkt auf den backdrop geklickt wird (event.target ist dann der dialog selbst, nicht ein kind-element)
function closeDialogOnBackdropClick(event) {
    if (event.target.id === "pokemon-dialog") {
        closeDialog()
    }
}
