import ApiService from "./ApiService.js";

class ProductsService {
    getTeddies() {
        return ApiService.getProducts('teddies');
    }
    getCameras() {
        return ApiService.getProducts('cameras');
    }
    getFurnitures() {
        return ApiService.getProducts('furniture');
    }
    getSingleProduct(productName , id) {
        return ApiService.getSingleProduct(productName , id);;
    }
    setAttributes(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    isEmpty(obj) {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}

export default new ProductsService()

