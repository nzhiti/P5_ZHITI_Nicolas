import cartService from "../CartService.js";
import ProductsService from "../ProductsService.js";

// Création du template HTML
const $template = document.querySelector('#cartSingleProduct');
const content = $template.content;

// Récupération du panier dans le localStorage
let cart = cartService.getCart();

    async function drawCart() {
        document.querySelector('#cartMagnet').innerHTML = '';
        for(let product of cart) {
            const $singleProductDiv = document.importNode(content, true);
            let productDetail = await ProductsService.getSingleProduct( product.productName , product._id);

            $singleProductDiv.querySelector('.productImg').setAttribute('src' , productDetail.imageUrl);
            $singleProductDiv.querySelector('.productOption').innerText = product.option;
            $singleProductDiv.querySelector('.productDesc').innerText = productDetail.description;

            document.querySelector('#cartMagnet').appendChild($singleProductDiv);
        }
    }
    async function tot() {
        await drawCart();
        await drawCart();
        await drawCart();
    }
    tot();








