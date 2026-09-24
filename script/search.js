// daten aus input lessen
document.getElementById("search-input").addEventListener("input", (event) => search(event.target.value));

let allPokemonNames = [] // namen aller pokemon aus der api (fuer die suche, nicht nur die geladenen)
let currentSearchTerm = "" // um veraltete, langsame antworten zu verwerfen
let isSearching = false // verhindert, dass das normale laden waehrend der suche karten anhaengt

function search(value) {
    let smallValue = value.trim().toLowerCase()

    if (smallValue.length > 2) {
        document.getElementById("warning").classList.add("hidden");
        searchPokemon(smallValue)

    } else {
        document.getElementById("warning").classList.remove("hidden");
        document.getElementById("no-results-warning").classList.add("hidden");
        resetSearch()
    }
}

// laedt (einmalig) alle pokemon namen aus der api und filtert danach lokal
async function searchPokemon(smallValue) {
    currentSearchTerm = smallValue
    isSearching = true

    if (allPokemonNames.length === 0) {
        await fetchAllPokemonNames()
    }
    if (currentSearchTerm !== smallValue) return // eingabe hat sich waehrend dem laden veraendert

    let matchingNames = allPokemonNames.filter(name => name.includes(smallValue))

    document.getElementById("card-section").innerHTML = ""
    document.querySelector('[data-id="load-more-button"]').classList.add("hidden")
    document.getElementById("no-results-warning").classList.toggle("hidden", matchingNames.length > 0)

    for (let index = 0; index < matchingNames.length; index++) {
        let pokemon = await fetchAndCacheByName(matchingNames[index])
        if (currentSearchTerm !== smallValue) return // eingabe hat sich waehrend dem laden veraendert

        document.getElementById("card-section").innerHTML += getcard(pokemon.id, pokemon.name, pokemon.types, pokemon.img)
    }
}

// laedt einmalig die namen aller pokemon aus der api (ohne die vollen daten)
async function fetchAllPokemonNames() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    let apidata = await response.json();
    allPokemonNames = apidata.results.map(pokemon => pokemon.name)
}

// zeigt wieder die normal geladenen pokemon
function resetSearch() {
    currentSearchTerm = ""
    isSearching = false
    document.getElementById("card-section").innerHTML = ""
    document.querySelector('[data-id="load-more-button"]').classList.remove("hidden")
    document.getElementById("no-results-warning").classList.add("hidden")

    for (let index = 0; index < loadedPokemon.pokemonId.length; index++) {
        let pokemon = pokemonCache[loadedPokemon.pokemonId[index]]
        document.getElementById("card-section").innerHTML += getcard(pokemon.id, pokemon.name, pokemon.types, pokemon.img)
    }
}
