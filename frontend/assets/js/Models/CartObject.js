export default class CartObject {
    constructor(_id, option, productName, quantity) {
        this._id = _id;
        this.option = option;
        this.productName = productName;
        this.quantity = quantity;
    }
}
