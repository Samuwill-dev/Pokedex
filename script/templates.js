
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
    let mainType = dialogPokemon.types[0]

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

    <div class="info-section type-${mainType}">
        <nav class="dialog-nav">
            <span class="nav-option" onclick="switchTab('about', ${dialogPokemon.id})">About</span>
            <span class="nav-option" onclick="switchTab('stats', ${dialogPokemon.id})">Base Stats</span>
        </nav>

        <div class="infos" id="infos">

        </div>

        <div class="switch-buttons">
            <button class="next-before-button ${dialogPokemon.id === 1 ? 'hidden-button' : ''}" onclick="nextPokemon(${dialogPokemon.id}, -1)">←</button>
            <button class="next-before-button" onclick="nextPokemon(${dialogPokemon.id}, 1)">→</button>
        </div>
    </div>
    `
}

function getDialogAboutSection(dialogPokemon) {
    return `
    <table>
        <tr>
            <td>Species:</td>
            <td>${dialogPokemon.species}</td>
        </tr>
        <tr>
            <td>Height:</td>
            <td>${dialogPokemon.height} m</td>
        </tr>
        <tr>
            <td>Weight:</td>
            <td>${dialogPokemon.weight} kg</td>
        </tr>
        <tr>
            <td>Abilities:</td>
            <td><ul class="abilities">${dialogPokemon.abilities.map(ability => `<li>${ability}</li>`).join('')}</ul></td>
        </tr>
    </table>
    `
}

function getStatValue(stats, name) {
    return stats.find(stat => stat.name === name).value
}

function getDialogBaseStatsSection(dialogPokemon) {
    return `
    <table>
        <tr>
            <td>HP:</td>
            <td>${dialogPokemon.hp}</td>
        </tr>
        <tr>
            <td>Attack:</td>
            <td>${dialogPokemon.attack}</td>
        </tr>
        <tr>
            <td>Defense:</td>
            <td>${dialogPokemon.defense}</td>
        </tr>
        <tr>
            <td>SpAtk:</td>
            <td>${dialogPokemon.spAtk}</td>
        </tr>
        <tr>
            <td>Sp.Def:</td>
            <td>${dialogPokemon.spDef}</td>
        </tr>
        <tr>
            <td>Speed:</td>
            <td>${dialogPokemon.speed}</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>${dialogPokemon.total}</td>
        </tr>
    </table>
    `
}
