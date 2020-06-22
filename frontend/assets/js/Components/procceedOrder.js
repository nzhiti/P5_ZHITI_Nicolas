import OrderContact from "../Models/order.js";
let form = document.querySelector('#cartForm');

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    getFormObject();
});

function getFormObject() {
    let formData = new FormData(form);
    let jsonObject = {};
    for (const [key, value]  of formData.entries()) {
        jsonObject[key] = value;
    }
    let formObject = new OrderContact(jsonObject);
}
