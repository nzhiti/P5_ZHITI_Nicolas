class FormValidationService {
    constructor() {
    }

    validateForm(contactObject) {
        // error var
        let errorMessage;

        // Valeurs du formulaire
        let firstName = contactObject.firstName;
        let lastName = contactObject.lastName;
        let address = contactObject.address;
        let city = contactObject.city;
        let email = contactObject.email;
        let inputsNames = ['firstName', 'lastName', 'address', 'city', 'email'];

        // Regex patterns
        let commonPattern = /^[a-z ,.'-]{3,}$/i;
        let locationPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        //tests patterns
        let firstNameTest = commonPattern.test(firstName);
        let lastNameTest = commonPattern.test(lastName);
        let addressTest = locationPattern.test(address);
        let cityTest = locationPattern.test(city);
        let emailTest = emailPattern.test(email);

        for(let inputName of inputsNames) {
            document.querySelector('.'+inputName+'ErrorDiv').innerHTML = '';
            let inputDiv = document.querySelector('#'+inputName);
            if(inputDiv.classList.contains('invalid')) {
                inputDiv.classList.remove('invalid');
            }

        }

        if(!firstNameTest) {
            errorMessage = 'Merci de renseigner un prénom valide, d\'une longueur de 3 caractères minimum et sans caractères spéciaux';
            this.appendErrorMessage(errorMessage, 'firstName');
        }

        if(!lastNameTest) {
            errorMessage = 'Merci de renseigner un nom valide, d\'une longueur de 3 caractères minimum et sans caractères spéciaux';
            this.appendErrorMessage(errorMessage, 'lastName');
        }

        if(!addressTest) {
            errorMessage = 'Merci de renseigner une adresse postale existante, d\'une longueur de 3 caractères minimum et sans caractères spéciaux';
            this.appendErrorMessage(errorMessage, 'address');
        }

        if(!cityTest) {
            errorMessage = 'Merci de renseigner une ville existante, d\'une longueur de 3 caractères minimum et sans caractères spéciaux';
            this.appendErrorMessage(errorMessage, 'city');
        }

        if(!emailTest) {
            errorMessage = 'Merci de renseigner une adresse email valide';
            this.appendErrorMessage(errorMessage , 'email');
        }

        return !(!firstNameTest || !lastNameTest || !addressTest || !cityTest || !emailTest);
    }

    appendErrorMessage(message, input) {
        // Div pour afficher les erreurs
        let errorDiv = document.querySelector('.' + input + 'ErrorDiv');
        let inputDiv = document.querySelector('#'+input);
        inputDiv.classList.add('invalid');
        let pElement = document.createElement('p');
        pElement.setAttribute('class', 'errorTextAnimation alert alert-danger');
        pElement.innerHTML = message;
        errorDiv.appendChild(pElement);
    }

}

export default new FormValidationService()
