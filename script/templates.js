
function getNotFoundMessage() {
    return `<p class="not-found" data-id="not-found">No match found.</p>`
}

function getcard(id, name, type, img) {
    let mainType = type[0]

    return `
    <div class="card" data-id="card" role="button" tabindex="0" aria-label="Open details of ${name}" onclick="openDialog(${id})" onkeydown="if (event.key === 'Enter') openDialog(${id})">
        <h4 class="header type-${mainType}">${id} ${name}</h4>

        <img class="pokemon-img" data-id="card-image" src="${img}" alt="Image of ${name}">
        <div class="type type-${mainType}">
            ${type.join('   ')}
        </div>
    </div>
    `
}

function getDialog(dialogPokemon, isFirst) {
    let mainType = dialogPokemon.types[0]

    return `
    <div class="dialog-content" data-id="overlay-pokemon-name">
        <div class="dialog-header">
            <h2>${dialogPokemon.id}</h2>
            <h2>${dialogPokemon.name}</h2>
            <h2 class="close-x" data-id="close-dialog-button" role="button" tabindex="0" aria-label="Close details" onclick="closeDialog()" onkeydown="if (event.key === 'Enter') closeDialog()">X</h2>
        </div>

        <div class="type-img">
            <div id="dialog-types">${dialogPokemon.types.map(type => `<div class="type-div">${type}</div>`).join('')}</div>
            <img class="dialog-img" data-id="dialog-image" src="${dialogPokemon.img}" alt="Image of ${dialogPokemon.name}">
        </div>

        <div class="info-section type-${mainType}">
            <nav class="dialog-nav" aria-label="Pokemon information">
                <h3 id="about" class="nav-option" role="button" tabindex="0" aria-label="Show about" onclick="switchTab('about', ${dialogPokemon.id})" onkeydown="if (event.key === 'Enter') switchTab('about', ${dialogPokemon.id})">About</h3>
                <h3 id="base-stats" class="nav-option" role="button" tabindex="0" aria-label="Show base stats" onclick="switchTab('stats', ${dialogPokemon.id})" onkeydown="if (event.key === 'Enter') switchTab('stats', ${dialogPokemon.id})">Base Stats</h3>
            </nav>

            <div class="infos" id="infos">

            </div>

            <div class="switch-buttons">
                <button class="next-before-button ${isFirst ? 'hidden-button' : ''}" data-id="prev-button" aria-label="Previous Pokemon" onclick="nextPokemon(${dialogPokemon.id}, -1)">←</button>
                <button class="next-before-button" data-id="next-button" aria-label="Next Pokemon" onclick="nextPokemon(${dialogPokemon.id}, 1)">→</button>
            </div>
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
