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

/**
 * Fonction pour avoir le detail d'un produit
 */

function toggleDetailDiv(productName , id) {
    let productDetailDiv = document.getElementById(productName + id);
    let productMagnet = document.getElementById(productName + id + '-magnet');
    let productMagnetDetailHide = document.getElementById('Products--magnet-detail-hide-'+id);
    productDetailDiv.classList.remove('d-flex');
    productDetailDiv.classList.add('d-none');
    productMagnetDetailHide.classList.remove('d-none');
    productMagnetDetailHide.classList.add('d-flex');

}

/**
 * Fonction pour avoir la vue d'ensemble du produit
 */
function toggleProductDiv(productName , id) {
    let hidenInput = document.getElementById('hiden_input');
    hidenInput.value = 0;
    let productDetailDiv = document.getElementById(productName + id);
    let productMagnet = document.getElementById(productName + id + '-magnet');
    let productMagnetDetailHide = document.getElementById('Products--magnet-detail-hide-'+id);
    let productMagnetChild = productMagnet.firstChild;
    productDetailDiv.classList.remove('d-none');
    productDetailDiv.classList.add('d-flex');
    productMagnetChild.style.display = 'block';
    productMagnetDetailHide.classList.remove('d-flex');
    productMagnetDetailHide.classList.add('d-none');
    console.log(hidenInput.value);
}




