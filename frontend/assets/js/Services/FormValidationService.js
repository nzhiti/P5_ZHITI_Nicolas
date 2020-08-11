class FormValidationService {
    constructor() {
    }

    appendErrorMessage(message, input) {
        // Div pour afficher les erreurs
        let errorDiv = document.querySelector('.'+input+'ErrorDiv');
        let pElement = document.createElement('p');
        pElement.
        pElement.innerText = message;
        errorDiv.appendChild(pElement);
    }

    validateForm(contactObject) {

        // Valeurs du formulaire
        let firstName = contactObject.firstName;
        let lastName = contactObject.lastName;
        let address = contactObject.address;
        let city = contactObject.city;
        let email = contactObject.email;

        // Regex patterns
        let commonPattern = /^[a-z ,.'-]{5,}$/i;
        let locationPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // error var
        let errorInForm;
        let errorMessage;

        //tests patterns
        let firstNameTest = commonPattern.test(firstName);
        let lastNameTest = commonPattern.test(lastName);
        let addressTest = locationPattern.test(address);
        let cityTest = locationPattern.test(city);
        let emailTest = emailPattern.test(email);

        if(!lastName) {
            errorInForm = true;
            errorMessage = "Tu n'as pas renseigner de nom !";
            this.appendErrorMessage(errorMessage, 'lastName');
        }

        //Redirection
        if(!errorInForm) {
            setTimeout( () => {
                window.location.href = "http://localhost:8080/confirmedOrder.html";
            },200);
        }
    }
}

export default new FormValidationService()
