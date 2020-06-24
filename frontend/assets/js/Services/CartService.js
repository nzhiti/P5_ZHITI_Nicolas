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
        this.cart.push(cartObject);
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }

    // Suppresion d'un produit du panier
    remove(productId , productOption) {
        for( let i = 0; i < this.cart.length; i++) {
            if(this.cart[i]._id === productId && this.cart[i].option === productOption) {
                this.cart.splice(i , 1);
                i--;
            }
        }
        localStorage.setItem( 'cart' , JSON.stringify(this.cart));
    }

    // On envoie les produits contenus dans le panier au serveur avec l'objet contact
    postTeddies(reqBody) {
        return ApiService.postCarts('teddies' , reqBody);
    }
    postCameras(reqBody) {
        return ApiService.postCarts('cameras' , reqBody);
    }
    postFurnitures(reqBody) {
        return ApiService.postCarts('furniture' , reqBody);
    }
}

const cartService = new CartService();
export default cartService;

