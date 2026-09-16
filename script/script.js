async function fetchData(id) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    let apidata = await response.json();
    console.log(apidata);

    let indexFromApiData = Object.keys(apidata.results)
    console.log(indexFromApiData);

    for (let indexFromApiData = 0; indexFromApiData < apidata.results.length; indexFromApiData++) {
        console.log(apidata.results[indexFromApiData]);
        let pokemonName = apidata.results[indexFromApiData].name
        console.log(pokemonName);
        
    }
}