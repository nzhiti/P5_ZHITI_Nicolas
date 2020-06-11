class CartService {

    addToCart(id) {
        const cart = [];
        let product = {
            'id': id,
        };
        cart.push(product);
        console.log(cart);
        return cart;
    }
}

export default new CartService()
