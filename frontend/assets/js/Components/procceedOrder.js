import contactObject from "../Models/contactObject.js";
import cartService from "../Services/CartService.js";

let form = document.querySelector('#cartForm');
let cart = cartService.getCart();
let teddyCartArray = [];
let cameraCartArray = [];
let furnitureCartArray = [];
let postTeddies = [];
let postCameras = [];
let postFurnitures = [];
let contact = {};

function getFormObject() {
    let formData = new FormData(form);
    let data = {
        firstName : formData.get('firstName'),
        lastName : formData.get('lastName'),
        city : formData.get('city'),
        address : formData.get('address'),
        email : formData.get('email')
    };
    contact = new contactObject(data);
}

function sortCartArray() {
    teddyCartArray = cart.filter((product) => {
        return product.productName === 'teddies'
    });
    cameraCartArray = cart.filter((product) => {
        return product.productName === 'cameras'
    });
    furnitureCartArray = cart.filter((product) => {
        return product.productName === 'furniture'
    });
}

function getIdOfArrays() {
    postTeddies = teddyCartArray.map((teddy) => {
        return teddy._id;
    });
    postCameras = cameraCartArray.map((camera) => {
        return camera._id;
    });
    postFurnitures = furnitureCartArray.map((furniture) => {
        return furniture._id;
    });
}

function promiseOfPostTeddies() {
    let reqBody = {
        contact,
        products : postTeddies
    };
    cartService.postTeddies(reqBody).then(
        () => {

        }
    );
}

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    getFormObject();
    sortCartArray();
    getIdOfArrays();
    promiseOfPostTeddies();
});

