import ProductsService from "../ProductsService.js";

function getProductDetail() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productName = urlParams.get('product');
    const productId = urlParams.get('id');

}







