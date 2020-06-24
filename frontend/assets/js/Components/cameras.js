import ProductsService from "../Services/ProductsService.js";
import Camera from "../Models/cameras.js";
import CartService from "../Services/CartService.js";

// Création d'un nouveau camera à partir du model



// Création du template HTML
const $template = document.querySelector('#cameras');
const content = $template.content;

function iterateCameras() {
    ProductsService.getCameras()
        .then(function (data) {
            drawCameras(data);
        })
        .catch(function (error) {
            console.log("Erreur lors de la création des cameras " + error);
        });
}


function drawCameras(datas) {
    for(let data of datas) {
        // Importation des valeurs dans les templates
        let camera = new Camera(data);
        const $camera = document.importNode(content, true);
        $camera.querySelector('.cameraImg').setAttribute('src', camera.imageUrl);
        $camera.querySelector('.cameraName').textContent = camera.name;
        $camera.querySelector('.cameraDescription').innerHTML = camera.description;
        $camera.querySelector('.cameraPrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + camera.price + '<i class="ml-2 fas fa-euro-sign"></i>';

        /**
         * Montrer / cacher les div de panier et de detail
         * @type {Element | any}
         */

            // Selection des éléments du dom pour modification
        let $cameraOverlay = $camera.querySelector('.cameraOverlay');
        let $cameraDetailDiv = $camera.querySelector('.cameraDetailDiv');
        let $cameraCartDiv = $camera.querySelector('.cameraCartDiv');
        let $cameraCartDivArrow = $camera.querySelector('.cameraBackToDetail');
        // toggle cartDiv
        $cameraOverlay.addEventListener('click' , function showCartDiv() {
            $cameraDetailDiv.classList.toggle('d-flex');
            $cameraDetailDiv.classList.toggle('d-none');
            $cameraOverlay.classList.toggle('d-none');
            $cameraCartDiv.classList.toggle('d-none');
        });
        // toggle detailDiv
        $cameraCartDivArrow.addEventListener('click' , function showDetailDiv() {
            $cameraDetailDiv.classList.toggle('d-flex');
            $cameraDetailDiv.classList.toggle('d-none');
            $cameraOverlay.classList.toggle('d-none');
            $cameraCartDiv.classList.toggle('d-none');
        });

        /**
         * Ajout des lentilles dans les divDetail et divCart
         * @type {Element | any}
         */
        let $cameraLenseDiv = $camera.querySelector('.cameraLense');
        let $cameraLenseHtml = '';
        let $lenseSelect = $camera.querySelector('.lenseSelect');
        for(let cameraLense of camera.lenses) {
            $cameraLenseHtml += '<div class="products--magnet-txt-lenses-single mr-2 mb-2">'+cameraLense+'</div>';
            $cameraLenseDiv.innerHTML = $cameraLenseHtml;
            let $selectOption = document.createElement('option');
            ProductsService.setAttributes($selectOption , {'value' : cameraLense.replace(/[ ,.]/g, "") , "class" : "cameraSelectOption"});
            $selectOption.innerHTML = cameraLense;
            $lenseSelect.appendChild($selectOption);
        }

        /**
         * Ajout au panier de l'élement cameras et de sa lentille
         * @type {Element | any}
         */
        let $cameraForm = $camera.querySelector('#cameraForm');
        $cameraForm.addEventListener('submit' , (e) => {
            e.preventDefault();
            let option = new FormData($cameraForm).get('cameraLenseSize');
            console.log(option);
            // Validation du form
            if(option) { // si option choisie
                // Ajout au panier
                CartService.add(camera._id , option, 'cameras');
                // Animation de l'icône panier dans le menu
                let cartBigIcon = document.querySelector('.bigCartIcon');
                cartBigIcon.classList.add('fade-scale');
                setTimeout(() =>{
                    cartBigIcon.classList.remove('fade-scale');
                },3000);
            } else { //sinon erreur
                let $errorDiv = document.createElement('div');
                ProductsService.setAttributes($errorDiv , {'class' : 'errorDiv col-12 p-0 p-4 font-weight-bold text-center'});
                $errorDiv.innerText = 'Merci de seléctionner une taille de lentille';
                document.querySelector('body').prepend($errorDiv);
                setTimeout(()=> {
                    document.querySelector('body').removeChild($errorDiv);
                }, 3000)
            }
        });

        document.querySelector('#camerasDiv').appendChild($camera);
    }
}

iterateCameras();





