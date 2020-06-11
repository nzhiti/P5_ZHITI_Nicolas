class CartService {
    addToCart(id, option) {
        const cart = [];
        let product = {
            'id': id,
            'option': option,
        };
        cart.push(product);
        return cart;
    }
}

export default new ApiService()
