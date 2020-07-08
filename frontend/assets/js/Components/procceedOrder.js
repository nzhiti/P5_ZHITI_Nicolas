import contactObject from "../Models/contactObject.js";
import cartService from "../Services/CartService.js";

let form = document.querySelector('#cartForm'); // Récupération du form

// Initialisation des variables au scope global
let cart = cartService.getCart();
let teddyCartArray = [];
let cameraCartArray = [];
let furnitureCartArray = [];
let postTeddies = [];
let postCameras = [];
let postFurnitures = [];
let contact = {};

// Création d'un formObject pour récupérer les valeurs du form & attribution au model contact
function getFormObject() {
    if (form) {
        let formData = new FormData(form);
        let data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            city: formData.get('city'),
            address: formData.get('address'),
            email: formData.get('email')
        };
        contact = new contactObject(data);
    } else {
        console.log('Impossible de récupérer les informations du formulaire')
    }

}

// On trie les commandes pour dissocier les produits car l'API du back gère les requêtes POST par produit
function sortCartArray() {
    if (cart) {
        teddyCartArray = cart.filter((product) => {
            return product.productName === 'teddies'
        });
        cameraCartArray = cart.filter((product) => {
            return product.productName === 'cameras'
        });
        furnitureCartArray = cart.filter((product) => {
            return product.productName === 'furniture'
        });
    } else {
        console.log('Impossible de récupérer le panier depuis le localStorage');
    }

}

// On récupère l'Id des différents produits triés
function getIdOfArrays() {

    if (teddyCartArray) {
        postTeddies = teddyCartArray.map((teddy) => {
            return teddy._id;
        });
    }

    if (cameraCartArray) {
        postCameras = cameraCartArray.map((camera) => {
            return camera._id;
        });
    }

    if (furnitureCartArray) {
        postFurnitures = furnitureCartArray.map((furniture) => {
            return furniture._id;
        });
    }

}

// Création du body de la requête post pour les différents produits contenant un object contact et un array d'id de produtis
async function promiseOfPostTeddies() {
    if (Array.isArray(teddyCartArray) && teddyCartArray.length) {
        let reqBody = {
            contact,
            products: postTeddies
        };
        let teddyOrder = await cartService.postTeddies(reqBody);
        return teddyOrder;
    } else {
        console.log('Aucun ourson dans le panier')
    }
}

async function promiseOfPostCameras() {
    if (Array.isArray(cameraCartArray) && cameraCartArray.length) {
        let reqBody = {
            contact,
            products: postCameras
        };
        let cameraOrder = await cartService.postCameras(reqBody);
        return cameraOrder;
    } else {
        console.log('Aucune camera dans le panier');
    }
}

async function promiseOfPostFurnitures() {
    if (Array.isArray(furnitureCartArray) && furnitureCartArray.length) {
        let reqBody = {
            contact,
            products: postFurnitures
        };
        let furnitureOrder = await cartService.postFurnitures(reqBody);
        return furnitureOrder;
    } else {
        console.log('Aucun meuble dans le panier')
    }
}

// Résolution de toutes les promesses des requêtes POST en une fois plutôt que simultanément & ajout des commandes au local storage
function getOrderId() {
    let conditionnalArray = [];
    if (Array.isArray(teddyCartArray) && teddyCartArray.length) {
        conditionnalArray.push(promiseOfPostTeddies());
    }
    if (Array.isArray(cameraCartArray) && cameraCartArray.length) {
        conditionnalArray.push(promiseOfPostCameras());
    }
    if (Array.isArray(furnitureCartArray) && furnitureCartArray.length) {
        conditionnalArray.push(promiseOfPostFurnitures());
    }
    Promise.all(conditionnalArray).then(orders => {
        console.log(orders);
        localStorage.setItem('order', JSON.stringify(orders));
        window.location.href = "http://localhost:8080/confirmedOrder.html";
    })
}

// Soumission du form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getFormObject();
    sortCartArray();
    getIdOfArrays();
    getOrderId();
});
