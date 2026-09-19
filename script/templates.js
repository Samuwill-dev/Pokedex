
function getcard(id, name, type, img) {
    let mainType = type[0]

    return `
    <div class="card" onclick="openDialog(${id})">
        <h4 class="header type-${mainType}">${id} ${name}</h4>

        <img class="pokemon-img" src="${img}" alt="image form ${name}">
        <div class="type type-${mainType}">
            ${type.join('   ')}
        </div>
    </div> 
    `
}

function getDialog(dialogPokemon) {
    return `
    <div class="dialog-header">
        <span>${dialogPokemon.id}</span>
        <span>${dialogPokemon.name}</span>
        <span class="close-x" onclick="closeDialog()">X</span>
    </div>
    
    <div class="type-img">
        <div id="dialog-types"></div>
        <img class="dialog-img" src="${dialogPokemon.img}" alt="bild von ${dialogPokemon.name}">
    </div>

    <div class="info-section">
        <nav class="dialog-nav">
            <span class="nav-option">About</span>
            <span class="nav-option">Base Stats</span>
        </nav>

        <div class="infos">

        </div>

        <div class="switch-buttons">
            <button class="next-before-button ${dialogPokemon.id === 1 ? 'hidden-button' : ''}" onclick="nextPokemon(${dialogPokemon.id}, -1)">←</button>
            <button class="next-before-button" onclick="nextPokemon(${dialogPokemon.id}, 1)">→</button>
        </div>
    </div>
    `
}

