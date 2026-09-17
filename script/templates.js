
function getcard(id, name, type, img) {
    return `
    <div class="card" data-id="card">
            <h3>${id}   ${name}</h3>
            <div>
                <div class="type">
                     ${type}
                </div>
                <img src="${img}" alt="image form ${name}">
            </div>
        </div>
    `
}