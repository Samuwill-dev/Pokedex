let limit = 20
let offset = 0
let totalCount = 0 
let pokemonCache = {} 
let loadedPokemonIds = [] 
let searchResultIds = [] 

async function fetchData(limit, offset) {
    showLoadingScreen()

    let apidata = await fetchJson(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    totalCount = apidata.count
    let newPokemon = await Promise.all(apidata.results.map(result => fetchAndCacheByName(result.name)))
    loadedPokemonIds.push(...newPokemon.map(pokemon => pokemon.id))

    hideLoadingScreen()
    if (!isSearching) {
        renderCards(newPokemon)
    }
}

async function fetchJson(url) {
    let response = await fetch(url)
    return await response.json()
}

// load and cache pokemon
async function fetchAndCacheByName(name) {
    let knownPokemon = Object.values(pokemonCache).find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase())
    if (knownPokemon) {
        return knownPokemon
    }

    let apidata = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let pokemon = cachePokemon(apidata)
    pokemonCache[pokemon.id] = pokemon
    return pokemon
}

function renderCards(pokemonList) {
    let cardsHtml = pokemonList.map(pokemon => getcard(pokemon.id, pokemon.name, pokemon.types, pokemon.img)).join("")
    document.getElementById("card-section").innerHTML += cardsHtml
}

function showLoadingScreen() {
    document.getElementById("loading-screen").classList.remove("hidden")
    document.querySelector('[data-id="load-more-button"]').disabled = true
}

function hideLoadingScreen() {
    document.getElementById("loading-screen").classList.add("hidden")
    document.querySelector('[data-id="load-more-button"]').disabled = false
}


// data for dialog
function cachePokemon(apidata) {
    let stats = getStats(apidata)
    return {
        id: apidata.id,
        name: apidata.name.toUpperCase(),
        types: apidata.types.map(typeInfo => typeInfo.type.name),
        img: apidata.sprites.other.home.front_default,
        height: (apidata.height / 10).toFixed(2),
        weight: (apidata.weight / 10),
        abilities: apidata.abilities.map(abilityInfo => abilityInfo.ability.name),
        speciesUrl: apidata.species.url,
        ...stats
    }
}

function getStats(apidata) {
    let stats = apidata.stats.map(statInfo => ({ name: statInfo.stat.name, value: statInfo.base_stat }))
    let hp = getStatValue(stats, "hp")
    let attack = getStatValue(stats, "attack")
    let defense = getStatValue(stats, "defense")
    let spAtk = getStatValue(stats, "special-attack")
    let spDef = getStatValue(stats, "special-defense")
    let speed = getStatValue(stats, "speed")
    let total = hp + attack + defense + spAtk + spDef + speed
    return { hp, attack, defense, spAtk, spDef, speed, total }
}

// load species at cklick on it
async function loadSpecies(pokemon) {
    if (pokemon.species) {
        return
    }

    let apidataSpecies = await fetchJson(pokemon.speciesUrl)
    let englishGenus = apidataSpecies.genera.find(entry => entry.language.name === "en")
    pokemon.species = englishGenus ? englishGenus.genus : "unknown"
}


async function openDialog(id) {
    let dialog = document.getElementById("pokemon-dialog")

    await loadSpecies(pokemonCache[id])
    dialog.innerHTML = getDialog(pokemonCache[id], getShownIds().indexOf(id) === 0)
    switchTab("about", id)
    if (!dialog.open) {
        dialog.showModal()
    }
    document.body.style.overflow = "hidden"
}


function getShownIds() {
    return isSearching ? searchResultIds : loadedPokemonIds
}


async function loadMorePokemon() {
    offset = offset + limit
    await fetchData(limit, offset)
}


async function nextPokemon(id, step) {
    let index = getShownIds().indexOf(id) + step

    if (index >= getShownIds().length && !isSearching && offset + limit < totalCount) {
        await loadMorePokemon()
    }

    let newId = getShownIds()[index]
    if (newId === undefined) {
        newId = getShownIds()[0]
    }
    openDialog(newId)
}

function switchTab(tab, id) {
    let dialogPokemon = pokemonCache[id]
    let isAbout = tab === "about"

    document.getElementById("about").classList.toggle("is-clicked", isAbout)
    document.getElementById("base-stats").classList.toggle("is-clicked", !isAbout)
    document.getElementById("infos").innerHTML = isAbout ? getDialogAboutSection(dialogPokemon) : getDialogBaseStatsSection(dialogPokemon)
}


function closeDialog() {
    document.getElementById("pokemon-dialog").close();
}


function closeDialogOnBackdropClick(event) {
    if (event.target.id === "pokemon-dialog") {
        closeDialog()
    }
}
