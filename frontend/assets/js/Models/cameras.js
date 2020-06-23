class Camera {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.description = data.description;
        this.imageUrl = data.imageUrl;
        this.price = data.price;
        this.lenses = data.lenses;
    }
}
export default Camera

