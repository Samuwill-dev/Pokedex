
function getcard(id, name, type, img) {
    let mainType = type[0]

    return `
    <div class="card" data-id="card">
            <h3 class="header type-${mainType}">${id} ${name}</h3>

            <img class="pokemon-img" src="${img}" alt="image form ${name}">
            <div class="type type-${mainType}">
                ${type.join('   ')}
            </div>
        </div>
    `
}