import ApiService from "./ApiService.js";

class ProductsService {
    getTeddies() {
        try {
            return ApiService.getProducts('teddies');
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
            return ApiService.getProducts('furnitures');
        } catch (error) {
            console.log(error);
        }
    }
    innerHtml(parent, element) {
        let htmlParent = document.getElementById(parent);
        htmlParent.innerHTML = element;
    }
}

export default new ProductsService()

