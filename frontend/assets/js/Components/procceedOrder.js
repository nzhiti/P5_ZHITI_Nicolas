import contactObject from "../Models/contactObject.js";
import cartService from "../Services/CartService.js";

let form = document.querySelector('#cartForm'); // Récupération du form

// Initialisation des variables au scope global
let cart = cartService.getCart();

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
        return new contactObject(data);
    } else {
        console.log('Impossible de récupérer les informations du formulaire')
    }
}
// On trie les commandes pour dissocier les produits car l'API du back gère les requêtes POST par produit
function sortProductsInCartArray() {
    if (cart) {
        let teddyArray = cart.filter((product) => {
            return product.productName === 'teddies'
        });
        let cameraArray = cart.filter((product) => {
            return product.productName === 'cameras'
        });
        let furnitureArray = cart.filter((product) => {
            return product.productName === 'furniture'
        });
        return [teddyArray, cameraArray, furnitureArray];
    } else {
        console.log('Impossible de récupérer le panier depuis le localStorage');
    }
}


// On récupère l'Id des différents produits triés
function getIdOfProducts() {
    let teddyArray, cameraArray, furnitureArray;
    [teddyArray, cameraArray, furnitureArray] = sortProductsInCartArray();
    let arrayOfProductsId = [];
    if (Array.isArray(teddyArray) && teddyArray.length) {
        let teddiesId = teddyArray.map((teddy) => {
            return teddy._id;
        });
        arrayOfProductsId.push(teddiesId);
    } else {
        arrayOfProductsId.push([]);
    }

    if (Array.isArray(cameraArray) && cameraArray.length) {
        let camerasId = cameraArray.map((camera) => {
            return camera._id;
        });
        arrayOfProductsId.push(camerasId);
    } else {
        arrayOfProductsId.push([]);
    }

    if (Array.isArray(furnitureArray) && furnitureArray.length) {
        let furnituresId = furnitureArray.map((furniture) => {
            return furniture._id;
        });
        arrayOfProductsId.push(furnituresId);
    } else {
        arrayOfProductsId.push([]);
    }
    return arrayOfProductsId;
}

// On post les produits avec leur Id et un object contact
async function postProducts() {
    let [teddyId, cameraId, furnitureId] = getIdOfProducts();
    console.log(teddyId, cameraId, furnitureId);
    let arrayOfOrders = [];
    if(Array.isArray(teddyId) && teddyId.length) {
        let contact = getFormObject();
        let reqBody = {
            contact,
            products: teddyId
        };
        let teddyOrder = await cartService.postTeddies(reqBody);
        arrayOfOrders.push(teddyOrder);
    } else {
        console.log("no teddies");
    }

    if (Array.isArray(cameraId) && cameraId.length) {
        let contact = getFormObject();
        let reqBody = {
            contact,
            products: cameraId
        };
        let cameraOrder = await cartService.postCameras(reqBody);
        arrayOfOrders.push(cameraOrder);
    } else {
        console.log("no cameras");
    }
    if (Array.isArray(furnitureId) && furnitureId.length) {
        let contact = getFormObject();
        let reqBody = {
            contact,
            products: furnitureId
        };
        let furnitureOrder = await cartService.postFurnitures(reqBody);
        arrayOfOrders.push(furnitureOrder);
    } else {
        console.log("no furnitures");
    }
    return arrayOfOrders;

}
// Résolution de la promesse suite au post des produits et peuplage du localstorage des orders
function resolveOrders() {
    postProducts().then(
        (orders) => {
            localStorage.setItem('order', JSON.stringify(orders))
        }
    );
}

// Soumission du form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    sortProductsInCartArray();
    getIdOfProducts();
    resolveOrders();
    setTimeout( () => {
        window.location.href = "http://localhost:8080/confirmedOrder.html";
    },200);
});
