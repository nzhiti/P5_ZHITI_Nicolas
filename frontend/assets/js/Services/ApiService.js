class ApiService {
    /**
     * Fonction fetch pour récupérer les données de l'api de manière asynchrone
     * @param productName
     * @returns {Promise<void>}
     */
    getProducts(productName) {
        const url = 'http://localhost:3000/api/'+productName;
        let data = fetch(url)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    console.log('Error: ' + error)
                });
        return data;
    }

    getSingleProduct(productName , id){
        const url = 'http://localhost:3000/api/'+productName+'/'+id;
        let data = fetch(url)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    console.log('Error: ' + error)
                });
        return data
    }

    /**
     * Fonction fetch pour poster les données du formulaire
     */
    async postCarts(productName , reqBody) {
        const url = 'http://localhost:3000/api/'+productName+'/order';
        // méthode post
        let action = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        };

        //fetch
        let data = fetch(url , action).then(
            response => {
                return response.json();
            }).catch(
                error => {
                    console.log('Erreur : ' + error);
                }
            );
        return data;
    }

}

export default new ApiService()
