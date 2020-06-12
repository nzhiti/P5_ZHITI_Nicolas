class ApiService {
    /**
     * Fonction fetch pour récupérer les données de l'api de manière asynchrone
     * @param productName
     * @returns {Promise<void>}
     */
    async getProducts(productName){
        const url = 'https://lindow.fr/api/'+productName;
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

}

export default new ApiService()
