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
            return ApiService.getProducts('cameras')
        } catch (error) {
            console.log(error);
        }
    }
    getFurnitures() {
        try {
            return ApiService.getProducts('furniture')
        } catch (error) {
            console.log(error);
        }
    }
    setAttributes(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    getSingleProduct(productName , id) {
        try {
            return ApiService.getSingleProduct(productName , id);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductsService()

