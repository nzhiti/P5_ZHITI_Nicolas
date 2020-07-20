import ProductsService from "../Services/ProductsService.js";
import Furnitures from "../Models/furnitures.js";
import CartService from "../Services/CartService.js";

// Création du template HTML
const $template = document.querySelector('#furnitures');
const content = $template.content;

function iterateFurnitures() {
    ProductsService.getFurnitures()
        .then(function (data) {
            drawFurnitures(data);
        })
        .catch(function (error) {
            console.log("Erreur lors de la création des meubles " + error);
        });
}


function drawFurnitures(datas) {
    for(let data of datas) {
        // Importation des valeurs dans les templates
        let furniture = new Furnitures(data);
        const $furniture = document.importNode(content, true);
        $furniture.querySelector('.furnitureImg').setAttribute('src', furniture.imageUrl);
        $furniture.querySelector('.furnitureName').textContent = furniture.name;
        $furniture.querySelector('.furnitureDescription').innerHTML = furniture.description;
        $furniture.querySelector('.furniturePrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + furniture.price + '<i class="ml-2 fas fa-euro-sign"></i>';

        /**
         * Montrer / cacher les div de panier et de detail
         * @type {Element | any}
         */

            // Selection des éléments du dom pour modification
        let $furnitureOverlay = $furniture.querySelector('.furnitureOverlay');
        let $furnitureDetailDiv = $furniture.querySelector('.furnitureDetailDiv');
        let $furnitureCartDiv = $furniture.querySelector('.furnitureCartDiv');
        let $furnitureCartDivArrow = $furniture.querySelector('.furnitureBackToDetail');
        // toggle cartDiv
        $furnitureOverlay.addEventListener('click' , function showCartDiv() {
            $furnitureDetailDiv.classList.toggle('d-flex');
            $furnitureDetailDiv.classList.toggle('d-none');
            $furnitureOverlay.classList.toggle('d-none');
            $furnitureCartDiv.classList.toggle('d-none');
        });
        // toggle detailDiv
        $furnitureCartDivArrow.addEventListener('click' , function showDetailDiv() {
            $furnitureDetailDiv.classList.toggle('d-flex');
            $furnitureDetailDiv.classList.toggle('d-none');
            $furnitureOverlay.classList.toggle('d-none');
            $furnitureCartDiv.classList.toggle('d-none');
        });

        /**
         * Ajout des couleurs dans les divDetail et divCart
         * @type {Element | any}
         */
        let $furnitureVarnishDiv = $furniture.querySelector('.furnitureVarnish');
        for(let furnitureVarnish of furniture.varnish) {
            let bgVarnish = '';
            if (furnitureVarnish === "Dark Oak") {
                bgVarnish = '#55342b';
            } else if(furnitureVarnish === "Light Oak") {
                bgVarnish = '#d1af84'
            } else if(furnitureVarnish === "Mahogany") {
                bgVarnish = '#c04000';
            } else if(furnitureVarnish === "Teak") {
                bgVarnish = '#c29467';
            }

            // Ajout des couleurs dans la divDetail
            let $furnitureVarnishChildDiv = document.createElement('div');
            ProductsService.setAttributes($furnitureVarnishChildDiv, {"style":'background: '+bgVarnish+'' , "class" : "ml-3"});
            $furnitureVarnishDiv.appendChild($furnitureVarnishChildDiv);

            // Ajout des couleurs sous form d'input dans la cartDiv
            let $furnitureInput = document.createElement('input');
            let $furnitureInputSpan = document.createElement('span');
            ProductsService.setAttributes($furnitureInputSpan , {'class': 'furnitureInputSpan'+bgVarnish.replace('#' , '') + ' ' + 'furnitureInputSpan'});
            let $furnitureInputDiv = $furniture.querySelector('.furnitureInputDiv');
            ProductsService.setAttributes($furnitureInput, {"name":'furnitureInput' , "value" : ''+furnitureVarnish+'' , 'type':'radio' , 'class':'mr-2 furnitureInput'+bgVarnish.replace('#' , '') + ' ' +'furnitureInput'});
            $furnitureInputDiv.appendChild($furnitureInput);
            $furnitureInputDiv.appendChild($furnitureInputSpan);
        }

        /**
         * Ajout au panier de l'élement ourson et de sa couleur
         * @type {Element | any}
         */
        let $furnitureForm = $furniture.querySelector('#furnitureForm');
        $furnitureForm.addEventListener('submit' , (e) => {
            e.preventDefault();
            let option = new FormData($furnitureForm).get('furnitureInput');
            // Validation du form
            if(option) { // si option choisie
                // Ajout au panier
                CartService.add(furniture._id , option, 'furniture');
                // Animation de l'icône panier dans le menu
                let cartBigIcon = document.querySelector('.bigCartIcon');
                cartBigIcon.classList.add('fade-scale');
                setTimeout(() =>{
                    cartBigIcon.classList.remove('fade-scale');
                },3000);

            } else { //sinon erreur
                let $errorDiv = document.createElement('div');
                ProductsService.setAttributes($errorDiv , {'class' : 'errorDiv col-12 p-0 p-4 font-weight-bold text-center'});
                $errorDiv.innerText = 'Merci de seléctionner une couleur';
                document.querySelector('body').prepend($errorDiv);
                setTimeout(()=> {
                    document.querySelector('body').removeChild($errorDiv);
                }, 3000)
            }
        });

        document.querySelector('#furnituresDiv').appendChild($furniture);
    }
}

iterateFurnitures();





