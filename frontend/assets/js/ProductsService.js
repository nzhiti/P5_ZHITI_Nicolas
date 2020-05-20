import ApiService from "./ApiService.js";

class ProductsService {
    getTeddies() {
        return ApiService.getProducts(teddies);
    }
    getCameras() {
        return ApiService.getProducts(cameras)
    }
    getFurnitures() {
        return ApiService.getProducts(furnitures);
    }
}

export default new ProductsService()

