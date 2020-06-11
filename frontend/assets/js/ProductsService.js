import ApiService from "./ApiService.js";

class ProductsService {
    getTeddies() {
        try {
            return ApiService.getProducts('teddies');
        } catch (error) {
            console.log(error);
        }
    }
    getSingleTeddy(productName, productId) {
        try {
            return ApiService.getSingleProduct(productName, productId);
        } catch (error) {
            console.log(error);
        }
    }
    getCameras() {
        try {
            return ApiService.getProducts('cameras');
        } catch (error) {
            console.log(error);
        }
    }
    getFurnitures() {
        try {
            return ApiService.getProducts('furniture');
        } catch (error) {
            console.log(error);
        }
    }
    innerHtml(targetDivId, content) {
        let targetDiv = document.getElementById(targetDivId);
        targetDiv.innerHTML += content;
    }
}

export default new ProductsService()

