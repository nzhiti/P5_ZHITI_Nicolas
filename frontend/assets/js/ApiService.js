class ApiService {
    /**
     * Fonction fetch pour récupérer les données de l'api de manière asynchrone
     * @param productName
     * @returns {Promise<void>}
     */
    async getProducts(productName){
        const url = 'http://localhost:3000/api/' + productName;
        let data = await (await (fetch(url)
                .then(response => {
                    return response.json()
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        ));
        console.log(data);
        return data
    }
}

export default new ApiService()
