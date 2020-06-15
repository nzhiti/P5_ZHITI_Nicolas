import ProductsService from "../ProductsService.js";
import Teddy from "../Models/teddies.js";
import CartService from "../CartService.js";

let teddy = new Teddy();

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
    // Création du template HTML
    const $template = document.querySelector('#teddies');
    const content = $template.content;
    for(let data of datas) {
        teddy = JSON.parse(JSON.stringify(data));
        const $teddy = document.importNode(content, true);
        $teddy.querySelector('.teddyImg').setAttribute('src', teddy.imageUrl);
        $teddy.querySelector('.teddyName').textContent = teddy.name;
        $teddy.querySelector('.teddyDescription').innerHTML = teddy.description;
        $teddy.querySelector('.teddyPrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + teddy.price + '<i class="ml-2 fas fa-euro-sign"></i>';
        let $teddyOverlay = $teddy.querySelector('.teddyOverlay');
        let $teddyDetailDiv = $teddy.querySelector('.teddyDetailDiv');
        let $teddyCartDiv = $teddy.querySelector('.teddyCartDiv');
        let $teddyCartDivArrow = $teddy.querySelector('.teddyBackToDetail');
        let $teddyColorDiv = $teddy.querySelector('.teddyColor');
        let $teddyForm = $teddy.querySelector('#teddyForm');
        for(let teddyColor of teddy.colors) {
            let bgColor = '';
            if (teddyColor === "Pale brown") {
                bgColor = '#987654';
            } else if(teddyColor === "Dark brown") {
                bgColor = '#654321'
            } else {
                bgColor = teddyColor;
            }
            let $teddyColorChildDiv = document.createElement('div');
            ProductsService.setAttributes($teddyColorChildDiv, {"style":'background: '+bgColor+'' , "class" : "ml-3"});
            $teddyColorDiv.appendChild($teddyColorChildDiv);

            let $teddyInput = document.createElement('input');
            let $teddyInputSpan = document.createElement('span');
            ProductsService.setAttributes($teddyInputSpan , {'class': 'teddyInputSpan'+bgColor.replace('#' , '') + ' ' + 'teddyInputSpan'});
            let $teddyInputDiv = $teddy.querySelector('.teddyInputDiv');
            ProductsService.setAttributes($teddyInput, {"name":'teddyInput' , "value" : ''+teddyColor+'' , 'type':'radio' , 'class':'mr-2 teddyInput'+bgColor.replace('#' , '') + ' ' +'teddyInput'});
            $teddyInputDiv.appendChild($teddyInput);
            $teddyInputDiv.appendChild($teddyInputSpan);
        }
        $teddyForm.addEventListener('submit' , (e) => {
            e.preventDefault();
            let option = new FormData($teddyForm).get('teddyInput');
          /*  let option = (Object.fromEntries(new FormData($teddyForm)));*/

            CartService.add(teddy._id , option);
        });
        $teddyOverlay.addEventListener('click' , function showCartDiv() {
            $teddyDetailDiv.classList.toggle('d-flex');
            $teddyDetailDiv.classList.toggle('d-none');
            $teddyOverlay.classList.toggle('d-none');
            $teddyCartDiv.classList.toggle('d-none');
        });
        $teddyCartDivArrow.addEventListener('click' , function showDetailDiv() {
            $teddyDetailDiv.classList.toggle('d-flex');
            $teddyDetailDiv.classList.toggle('d-none');
            $teddyOverlay.classList.toggle('d-none');
            $teddyCartDiv.classList.toggle('d-none');
        });
        document.querySelector('#teddiesDiv').appendChild($teddy);
    }
}

iterateTeddies();





