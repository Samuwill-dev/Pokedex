let allPokemonNames = [] 
let searchRunId = 0 
let isSearching = false

document.getElementById("search-input").addEventListener("input", (event) => {
    if (event.target.value.trim() === "") resetSearch()
});
document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") search(event.target.value)
});

function search(value) {
    let smallValue = value.trim().toLowerCase()

    if (smallValue.length > 2) {
        document.getElementById("warning").classList.add("hidden");
        searchPokemon(smallValue)

    } else {
        document.getElementById("warning").classList.remove("hidden");
    }
}

async function searchPokemon(smallValue) {
    let runId = ++searchRunId
    isSearching = true

    if (allPokemonNames.length === 0) {
        await fetchAllPokemonNames()
    }
    if (searchRunId !== runId) return 

    let matchingNames = allPokemonNames.filter(name => name.includes(smallValue))
    prepareSearchResults(matchingNames.length)
    await renderSearchResults(matchingNames, runId)
}

function prepareSearchResults(resultCount) {
    searchResultIds = []
    document.getElementById("card-section").innerHTML = resultCount > 0 ? "" : getNotFoundMessage()
    document.querySelector('[data-id="load-more-button"]').classList.add("hidden")
}

async function renderSearchResults(matchingNames, runId) {
    for (let index = 0; index < matchingNames.length; index++) {
        let pokemon = await fetchAndCacheByName(matchingNames[index])
        if (searchRunId !== runId) return 

        searchResultIds.push(pokemon.id)
        renderCards([pokemon])
    }
}

async function fetchAllPokemonNames() {
    let apidata = await fetchJson(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    allPokemonNames = apidata.results.map(pokemon => pokemon.name)
}

function resetSearch() {
    searchRunId++
    isSearching = false
    searchResultIds = []
    document.getElementById("card-section").innerHTML = ""
    document.querySelector('[data-id="load-more-button"]').classList.remove("hidden")
    document.getElementById("warning").classList.add("hidden")

    renderCards(loadedPokemonIds.map(id => pokemonCache[id]))
}
