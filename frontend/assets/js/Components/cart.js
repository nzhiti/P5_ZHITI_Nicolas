import cartService from "../Services/CartService.js";
import ProductsService from "../Services/ProductsService.js";

// Création du template HTML
const $template = document.querySelector('#cartSingleProduct');
const content = $template.content;

// Récupération du panier dans le localStorage
let cart = cartService.getCart();

// Création des éléments du dom du panier
async function drawCart() {
    document.querySelector('#cartMagnet').innerHTML = '';
    for (let product of cart) {
        const $singleProductDiv = document.importNode(content, true);
        let productDetail = await ProductsService.getSingleProduct(product.productName, product._id);

        $singleProductDiv.querySelector('.productImg').setAttribute('src', productDetail.imageUrl);
        $singleProductDiv.querySelector('.productQuantity').innerText = product.quantity;
        $singleProductDiv.querySelector('.productDesc').innerText = productDetail.description;

        // Remove button
        let removeBtn = $singleProductDiv.querySelector('.cart--wrap-magnet-single-remove');
        removeBtn.addEventListener('click', () => {
            removeItemFromCart(product._id, product.option)
        });

        // Quantity buttons
        let quantityUpBtn = $singleProductDiv.querySelector('.quantityUpBtn');
        let quantityDownBtn = $singleProductDiv.querySelector('.quantityDownBtn');

        quantityDownBtn.addEventListener( 'click', () => {
            removeItemFromCart(product._id, product.option);
        });
        quantityUpBtn.addEventListener( 'click' , () => {
            cartService.add(product._id, product.option, product.productName);
            drawCart();
        });

        // Ajout des clones dans le dom
        document.querySelector('#cartMagnet').appendChild($singleProductDiv);
    }
}

// Retirer des éléments du panier
function removeItemFromCart(productId, productOption) {
    cartService.remove(productId, productOption);
    drawCart().then(_ => {
        console.log('produit ' + productId + ' suprpimé');
        if (ProductsService.isEmpty(cart)) {
            let emptyCartDiv = document.createElement('div');
            emptyCartDiv.innerHTML = 'Votre panier est vide';
            ProductsService.setAttributes(emptyCartDiv, {'class': 'd-flex col-12 justify-content-center font-weight-bold p-5'});
            document.querySelector('#cartMagnet').appendChild(emptyCartDiv);
        }
    })
}

// Affichage de la div contenant le formulaire pour la création de l'objet contact
document.querySelector('.cart--wrap-form-action-back').addEventListener('click', toggleCartForm);
document.querySelector('.cart--wrap-action-procceed').addEventListener('click', toggleCartForm);

function toggleCartForm() {
    let formDiv = document.querySelector('#contentHidden');
    let cartDiv = document.querySelector('#content');
    let formIsHidden = true;
    if (formIsHidden) {
        if (!ProductsService.isEmpty(cart)) {
            formDiv.style.display = 'block';
            cartDiv.style.display = 'none';
            formIsHidden = false;
        } else {
            let $errorDiv = document.createElement('div');
            ProductsService.setAttributes($errorDiv, {'class': 'errorDiv col-12 p-0 p-4 font-weight-bold text-center'});
            $errorDiv.innerText = 'Votre panier est vide';
            document.querySelector('body').prepend($errorDiv);
            setTimeout(() => {
                document.querySelector('body').removeChild($errorDiv);
            }, 3000)
        }
    } else {
        formDiv.style.display = 'none';
        cartDiv.style.display = 'block';
        formIsHidden = true;
    }
}
// Panier vide message erreur
if (ProductsService.isEmpty(cart)) {
    let emptyCartDiv = document.createElement('div');
    emptyCartDiv.innerHTML = 'Votre panier est vide';
    ProductsService.setAttributes(emptyCartDiv, {'class': 'd-flex col-12 justify-content-center font-weight-bold p-5'});
    document.querySelector('#cartMagnet').appendChild(emptyCartDiv);
} else {
    drawCart().then(() => {
        console.log('Panier crée sans erreur');
    }).catch((e) => {
        console.log(e);
    });
}








