let loadedPokemon = {
    'pokemonId' : [],
    'pokemonName' : [],
    'pokemonType' : [],
    'pokemonImg' : []
}

async function fetchData(id) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    let apidata = await response.json();
    

    //name holen
    let indexFromApiData = Object.keys(apidata.results)
    
    for (let indexFromApiData = 0; indexFromApiData < apidata.results.length; indexFromApiData++) {
        let pokemonName = apidata.results[indexFromApiData].name
        
        restData(pokemonName)
    }
}

async function restData(name) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    let apidata = await response.json();

    let pokemonId = apidata.id
    let pokemonName = apidata.name
    let pokemonTypes = apidata.types.map(typeInfo => typeInfo.type.name)
    let pokemonImg = apidata.sprites.front_default

    loadedPokemon.pokemonId.push(pokemonId)
    loadedPokemon.pokemonName.push(pokemonName)
    loadedPokemon.pokemonType.push(pokemonTypes)
    loadedPokemon.pokemonImg.push(pokemonImg)

    console.log(loadedPokemon);
}
