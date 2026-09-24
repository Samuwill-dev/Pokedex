// leeres suchfeld zeigt wieder die normale liste, enter startet die suche wie der button
document.getElementById("search-input").addEventListener("input", (event) => {
    if (event.target.value.trim() === "") resetSearch()
});
document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") search(event.target.value)
});

let allPokemonNames = [] // namen aller pokemon aus der api (fuer die suche, nicht nur die geladenen)
let searchRunId = 0 // um veraltete, langsame suchen zu verwerfen
let isSearching = false // verhindert, dass das normale laden waehrend der suche karten anhaengt

function search(value) {
    let smallValue = value.trim().toLowerCase()

    if (smallValue.length > 2) {
        document.getElementById("warning").classList.add("hidden");
        searchPokemon(smallValue)

    } else {
        document.getElementById("warning").classList.remove("hidden");
    }
}

// laedt (einmalig) alle pokemon namen aus der api und filtert danach lokal
async function searchPokemon(smallValue) {
    let runId = ++searchRunId
    isSearching = true

    if (allPokemonNames.length === 0) {
        await fetchAllPokemonNames()
    }
    if (searchRunId !== runId) return // es wurde waehrend dem laden neu gesucht

    let matchingNames = allPokemonNames.filter(name => name.includes(smallValue))
    prepareSearchResults(matchingNames.length)
    await renderSearchResults(matchingNames, runId)
}

function prepareSearchResults(resultCount) {
    searchResultIds = []
    document.getElementById("card-section").innerHTML = resultCount > 0 ? "" : getNotFoundMessage()
    document.querySelector('[data-id="load-more-button"]').classList.add("hidden")
}

// zeigt die treffer nacheinander an, sobald sie geladen sind
async function renderSearchResults(matchingNames, runId) {
    for (let index = 0; index < matchingNames.length; index++) {
        let pokemon = await fetchAndCacheByName(matchingNames[index])
        if (searchRunId !== runId) return // es wurde waehrend dem laden neu gesucht

        searchResultIds.push(pokemon.id)
        renderCards([pokemon])
    }
}

// laedt einmalig die namen aller pokemon aus der api (ohne die vollen daten)
async function fetchAllPokemonNames() {
    let apidata = await fetchJson(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    allPokemonNames = apidata.results.map(pokemon => pokemon.name)
}

// zeigt wieder die normal geladenen pokemon
function resetSearch() {
    searchRunId++
    isSearching = false
    searchResultIds = []
    document.getElementById("card-section").innerHTML = ""
    document.querySelector('[data-id="load-more-button"]').classList.remove("hidden")
    document.getElementById("warning").classList.add("hidden")

    renderCards(loadedPokemonIds.map(id => pokemonCache[id]))
}
