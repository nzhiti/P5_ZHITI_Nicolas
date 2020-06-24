class ApiService {
    /**
     * Fonction fetch pour récupérer les données de l'api de manière asynchrone
     * @param productName
     * @returns {Promise<void>}
     */
    async getProducts(productName){
        const url = 'http://localhost:3000/api/'+productName;
        let data = await (await (fetch(url)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    console.log('Error: ' + error)
                })
        ));
        return data
    }

    async getSingleProduct(productName , id){
        const url = 'http://localhost:3000/api/'+productName+'/'+id;
        let data = (await (fetch(url)
                .then(response => {
                    return response.json();
                })
                .catch(error => {
                    console.log('Error: ' + error)
                })
        ));
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
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(reqBody)
        };

        //fetch
        let data = (await (fetch(url , action).then(
            response => {
                return response.json();
            }).catch(
                error => {
                    console.log('Erreur : ' + error);
                }
            )
        ));
        return data;
    }

}

export default new ApiService()
