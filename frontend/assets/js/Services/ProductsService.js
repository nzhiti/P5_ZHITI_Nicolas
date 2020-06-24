import ApiService from "./ApiService.js";

class ProductsService {
    // On récupère les produits
    getTeddies() {
        return ApiService.getProducts('teddies');
    }
    getCameras() {
        return ApiService.getProducts('cameras');
    }
    getFurnitures() {
        return ApiService.getProducts('furniture');
    }

    // On récupère un seul produit
    getSingleProduct(productName , id) {
        return ApiService.getSingleProduct(productName , id);;
    }

    // Fonction Utiles dans le reste du code
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

