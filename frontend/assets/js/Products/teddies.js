import ProductsService from "../ProductsService.js";
import Teddy from "../Models/teddies.js";
import CartService from "../CartService.js";

// Création d'un nouveau teddy à partir du model



// Création du template HTML
const $template = document.querySelector('#teddies');
const content = $template.content;

function iterateTeddies() {
    ProductsService.getTeddies()
        .then(function (data) {
                drawTeddies(data);
        })
        .catch(function (error) {
            console.log("Erreur lors de la création des ourson " + error);
        });
}


function drawTeddies(datas) {
    console.log(datas);
    for(let data of datas) {
        // Importation des valeurs dans les templates
        let teddy = new Teddy(data);
        console.log(teddy);
        const $teddy = document.importNode(content, true);
        $teddy.querySelector('.teddyImg').setAttribute('src', teddy.imageUrl);
        $teddy.querySelector('.teddyName').textContent = teddy.name;
        $teddy.querySelector('.teddyDescription').innerHTML = teddy.description;
        $teddy.querySelector('.teddyPrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + teddy.price + '<i class="ml-2 fas fa-euro-sign"></i>';

        /**
         * Montrer / cacher les div de panier et de detail
         * @type {Element | any}
         */

            // Selection des éléments du dom pour modification
            let $teddyOverlay = $teddy.querySelector('.teddyOverlay');
            let $teddyDetailDiv = $teddy.querySelector('.teddyDetailDiv');
            let $teddyCartDiv = $teddy.querySelector('.teddyCartDiv');
            let $teddyCartDivArrow = $teddy.querySelector('.teddyBackToDetail');
            // toggle cartDiv
            $teddyOverlay.addEventListener('click' , function showCartDiv() {
                $teddyDetailDiv.classList.toggle('d-flex');
                $teddyDetailDiv.classList.toggle('d-none');
                $teddyOverlay.classList.toggle('d-none');
                $teddyCartDiv.classList.toggle('d-none');
            });
            // toggle detailDiv
            $teddyCartDivArrow.addEventListener('click' , function showDetailDiv() {
                $teddyDetailDiv.classList.toggle('d-flex');
                $teddyDetailDiv.classList.toggle('d-none');
                $teddyOverlay.classList.toggle('d-none');
                $teddyCartDiv.classList.toggle('d-none');
            });

        /**
         * Ajout des couleurs dans les divDetail et divCart
         * @type {Element | any}
         */
            let $teddyColorDiv = $teddy.querySelector('.teddyColor');
            for(let teddyColor of teddy.colors) {
                let bgColor = '';
                if (teddyColor === "Pale brown") {
                    bgColor = '#987654';
                } else if(teddyColor === "Dark brown") {
                    bgColor = '#654321'
                } else {
                    bgColor = teddyColor;
                }

                // Ajout des couleurs dans la divDetail
                let $teddyColorChildDiv = document.createElement('div');
                ProductsService.setAttributes($teddyColorChildDiv, {"style":'background: '+bgColor+'' , "class" : "ml-3"});
                $teddyColorDiv.appendChild($teddyColorChildDiv);

                // Ajout des couleurs sous form d'input dans la cartDiv
                let $teddyInput = document.createElement('input');
                let $teddyInputSpan = document.createElement('span');
                ProductsService.setAttributes($teddyInputSpan , {'class': 'teddyInputSpan'+bgColor.replace('#' , '') + ' ' + 'teddyInputSpan'});
                let $teddyInputDiv = $teddy.querySelector('.teddyInputDiv');
                ProductsService.setAttributes($teddyInput, {"name":'teddyInput' , "value" : ''+teddyColor+'' , 'type':'radio' , 'class':'mr-2 teddyInput'+bgColor.replace('#' , '') + ' ' +'teddyInput'});
                $teddyInputDiv.appendChild($teddyInput);
                $teddyInputDiv.appendChild($teddyInputSpan);
            }

        /**
         * Ajout au panier de l'élement ourson et de sa couleur
         * @type {Element | any}
         */
            let $teddyForm = $teddy.querySelector('#teddyForm');
            $teddyForm.addEventListener('submit' , (e) => {
                e.preventDefault();
                let option = new FormData($teddyForm).get('teddyInput');
                // Validation du form
                if(option) { // si option choisie
                    // Ajout au panier
                    CartService.add(teddy._id , option, 'teddies');
                    console.log(teddy._id );

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

        document.querySelector('#teddiesDiv').appendChild($teddy);
    }
}

iterateTeddies();





