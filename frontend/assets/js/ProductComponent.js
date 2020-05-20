import ProductsService from "./ProductsService.js";
let teddies = [];
function iterateTeddies() {
    ProductsService.getTeddies()
        .then(function (data) {
            let teddies = data.slice(0);
            teddies.reverse();
            return teddies;
        })
        .catch(function (error) {
            console.log("Impossible d'attribuer l'array teddies à sa variable " + error);
        });
}
iterateTeddies();

function drawTeddies() {
    console.log(teddies);
}

drawTeddies();




