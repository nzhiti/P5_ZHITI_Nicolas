import CartObject from "./Models/CartObject.js";

class CartService {
    constructor() {
        if(window.localStorage) {
            window.localStorage.getItem('cart')
        } else {
            this.cart = [];
        }
    }

    add(productId, option) {
        const cartObject = new CartObject(productId, option);
        this.cart.push(cartObject);
        console.log(`L'object ${productId} a bien été ajouté au panier avec sa personnalisation ${option}`);
        window.localStorage.setItem( 'cart' , this.cart );
    }
}

const cartService = new CartService();
export default cartService;

