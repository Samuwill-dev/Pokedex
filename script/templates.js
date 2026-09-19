
function getcard(id, name, type, img) {
    let mainType = type[0]

    return `
    <div class="card" data-id="card" onclick="openDialog(${id})">
        <h4 class="header type-${mainType}">${id} ${name}</h4>

        <img class="pokemon-img" src="${img}" alt="image form ${name}">
        <div class="type type-${mainType}">
            ${type.join('   ')}
        </div>
    </div> 
    `
}

function getDialog() {
    return `
    <div class="dialog-header">
        <span>id</span>
        <span>NAME</span>
        <span>x</span>
    </div>
    <div>typen</div>
    <img src="" alt="ich bin bild">
    <div class="info-section">
        <nav class="dialog-nav">
            <span>About</span>
            <span>Base Stats</span>
        </nav>
        <div class="infos">
        </div>
    </div>
    `
}