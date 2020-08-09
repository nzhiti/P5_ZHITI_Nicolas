import CartObject from "../Models/CartObject.js";
import ApiService from "./ApiService.js";

class CartService {
    constructor() {
        this.getCart();
    }

    // Récupération du panier dans le local storage et push dans array
    getCart() {
        if(window.localStorage) {
            this.cart = (JSON.parse(localStorage.getItem("cart") || "[]"));
        } else {
            this.cart = [];
        }
        return this.cart;
    }

    // Ajout d'un produit au panier
    add(productId, option, productName) {
        const cartObject = new CartObject(productId, option, productName);
        console.log(`L'object ${productName} portant l'id ${productId} a bien été ajouté au panier avec sa personnalisation ${option}`);
        let productAlreadyInCart = this.cart.find(product => product._id === productId);
        if(productAlreadyInCart) {
           productAlreadyInCart.quantity++;
        } else {
            cartObject.quantity = 1;
            this.cart.push(cartObject);
        }
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }

    // Suppresion d'un produit du panier
    remove(productId , productOption) {
        for( let i = 0; i < this.cart.length; i++) {
            if(this.cart[i]._id === productId && this.cart[i].quantity === 1) {
                this.cart.splice(i , 1);
                i--;
            } else if(this.cart[i]._id === productId && this.cart[i].quantity > 1) {
                this.cart[i].quantity--;
            }
        }
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }

    // On envoie les produits contenus dans le panier au serveur avec l'objet contact
    async postTeddies(reqBody) {
        let response = await ApiService.postCarts('teddies' , reqBody);
        return response;
    }
    async postCameras(reqBody) {
        let response = await ApiService.postCarts('cameras' , reqBody);
        return response;
    }
    async postFurnitures(reqBody) {
        let response = await ApiService.postCarts('furniture' , reqBody);
        return response;
    }
}

const cartService = new CartService();
export default cartService;

