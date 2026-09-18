let loadedPokemon = {
    'pokemonId' : [],
    'pokemonName' : [],
    'pokemonType' : [],
    'pokemonImg' : []
}

let limit = 20
let offset = 0

async function fetchData(limit, offset) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    let apidata = await response.json();
    console.log(apidata);
    
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

    let pokemonId = apidata.id
    let pokemonName = apidata.name.toUpperCase()
    let pokemonTypes = apidata.types.map(typeInfo => typeInfo.type.name)
    let pokemonImg = apidata.sprites.other.home.front_default

    // fügt daten in array ein
    loadedPokemon.pokemonId.push(pokemonId)
    loadedPokemon.pokemonName.push(pokemonName)
    loadedPokemon.pokemonType.push(pokemonTypes)
    loadedPokemon.pokemonImg.push(pokemonImg)

    console.log(loadedPokemon);
    document.getElementById("card-section").innerHTML += getcard(pokemonId, pokemonName, pokemonTypes, pokemonImg)
}

// limit und offset versetzen
function loadMorePokemon() {
    offset = offset + limit
    fetchData(limit, offset)
}


