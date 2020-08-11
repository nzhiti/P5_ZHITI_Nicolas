class FormValidationService {
    constructor() {
    }

    validateForm(contactObject) {

        // Valeurs du formulaire
        let firstName = contactObject.firstName;
        let lastName = contactObject.lastName;
        let address = contactObject.address;
        let city = contactObject.city;
        let email = contactObject.email;
        let inputNames = ['firstName', 'lastName', 'address', 'city', 'email'];
        // Regex patterns
        let commonPattern = /^[a-z ,.'-]{3,}$/i;
        let locationPattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // error var
        let errorInForm ,errorMessage, regexErrorMessage, inputName;

        //tests patterns
        let firstNameTest = [commonPattern.test(firstName) , 'firstName'] ;
        let lastNameTest = [commonPattern.test(lastName) , 'lastName'];
        let addressTest = [locationPattern.test(address) , 'address'];
        let cityTest = [locationPattern.test(city), 'city'];
        let emailTest = [emailPattern.test(email) , 'email'];
        let tests = [firstNameTest, lastNameTest, addressTest, cityTest, emailTest];

        for(let test of tests) {
            [regexErrorMessage, inputName] = this.checkRegex(test);
            document.querySelector('.' + inputName + 'ErrorDiv').innerHTML = '';

            if(regexErrorMessage) {
                this.appendErrorMessage(regexErrorMessage, inputName);
                errorInForm = true;
            } else {
                errorInForm = false;
            }
        }

        // Test de valeur vide
        for(let name of inputNames) {
            let input;
            if(name === 'firstName') {
                input = firstName;
            } else if(name === 'lastName') {
                input = lastName;
            } else if(name === 'city') {
                input = city;
            } else if(name === 'address') {
                input = address;
            } else if(name === 'email') {
                input = email;
            }
            errorMessage = this.checkEmptyInput(name , input);
            document.querySelector('.' + name + 'ErrorDiv').innerHTML = '';
            if(errorMessage) {
                this.appendErrorMessage(errorMessage, name);
                errorInForm = true;
            } else {
                errorInForm = false;
            }
        }

        //Redirection
        if(!errorInForm) {
            setTimeout( () => {
                window.location.href = "http://localhost:8080/confirmedOrder.html";
            },200);
        }
    }

    appendErrorMessage(message, input) {
        // Div pour afficher les erreurs
        let errorDiv = document.querySelector('.'+input+'ErrorDiv');
        let pElement = document.createElement('p');
        pElement.setAttribute('class' , 'errorTextAnimation');
        pElement.innerText = message;
        errorDiv.appendChild(pElement);
    }

    checkRegex(test) {
        let testVar, testString, errorMessage, trad;
        [testVar, testString] = test;
        if(testString === 'lastName') {
            trad = 'e nom';
        } else if(testString === 'firstName') {
            trad = 'e prénom';
        } else if(testString === 'address') {
            trad = '\'adresse';
        } else if(testString === 'city') {
            trad = 'e ville'
        } else if(testString === 'email') {
            trad = '\'adresse email'
        }
        if (!testVar) {
            errorMessage = `Je ne reconnais pas ce genre d${trad}, êtes vous sûr de votre saisie ?`;
            return [errorMessage, testString];
        }
    }

    checkEmptyInput(inputName , input) {
        let trad;
        if(inputName === 'lastName') {
            trad = 'e nom';
        } else if(inputName === 'firstName') {
            trad = 'e prénom';
        } else if(inputName === 'address') {
            trad = '\'adresse';
        } else if(inputName === 'city') {
            trad = 'e ville'
        } else if(inputName === 'email') {
            trad = '\'adresse email'
        }

        if(!input) {
            let errorMessage = `Vous n'avez pas renseigner d${trad} !`;
            return errorMessage;
        }
    }
}

export default new FormValidationService()
