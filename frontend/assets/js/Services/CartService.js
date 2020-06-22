import CartObject from "../Models/CartObject.js";

class CartService {
    constructor() {
        this.getCart();
    }

    getCart() {
        if(window.localStorage) {
            this.cart = (JSON.parse(localStorage.getItem("cart") || "[]"));
        } else {
            this.cart = [];
        }
        return this.cart;
    }

    add(productId, option, productName) {
        const cartObject = new CartObject(productId, option, productName);
        console.log(`L'object ${productName} portant l'id ${productId} a bien été ajouté au panier avec sa personnalisation ${option}`);
        this.cart.push(cartObject);
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }
    remove(productId , productOption) {
        for( let i = 0; i < this.cart.length; i++) {
            if(this.cart[i]._id === productId && this.cart[i].option === productOption) {
                this.cart.splice(i , 1);
                i--;
            }
        }
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }

}

const cartService = new CartService();
export default cartService;

