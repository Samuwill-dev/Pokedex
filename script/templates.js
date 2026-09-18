
function getcard(id, name, type, img) {
    return `
    <div class="card" data-id="card">
            <h3 class="header">${id} ${name}</h3>
            
            <img class="pokemon-img" src="${img}" alt="image form ${name}">
            <div class="type">
                ${type}
            </div>
        </div>
    `
}