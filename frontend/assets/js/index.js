/**
 * Fonction pour montrer / cacher les div des produits
 * @param productName correspond au nom du produit affiché (bear / camera / furniture )
 */
function toggleDiv(productName) {
    let targetDiv = document.getElementById(productName + 'Div');
    let caretUp = document.getElementById(productName + 'CaretUp');
    let caretDown = document.getElementById(productName + 'CaretDown');
    targetDiv.classList.toggle('d-none');
    targetDiv.classList.toggle('d-flex');
    caretUp.classList.toggle('d-none');
    caretDown.classList.toggle('d-none');
    caretDown.classList.toggle('d-block');
}



