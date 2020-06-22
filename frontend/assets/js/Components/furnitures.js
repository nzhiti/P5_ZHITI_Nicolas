import ProductsService from "../Services/ProductsService.js";
import Furnitures from "../Models/furnitures.js";

function iterateFurnitures() {
    ProductsService.getFurnitures()
        .then(function (data) {
            drawFurnitures(data);
        })
        .catch(function (error) {
            console.log("Erreur lors de la création des furnitures " + error);
        });
}



function drawFurnitures(datas) {
    const $template = document.querySelector('#furnitures');
    const content = $template.content;
    for(let data of datas) {
        let furniture = new Furnitures();
        furniture = JSON.parse(JSON.stringify(data));
        const $furniture = document.importNode(content, true);
        $furniture.querySelector('.furnitureImg').setAttribute('src', furniture.imageUrl);
        $furniture.querySelector('.furnitureName').textContent = furniture.name;
        $furniture.querySelector('.furnitureDescription').innerHTML =  furniture.description;
        $furniture.querySelector('.furniturePrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + furniture.price + '<i class="ml-2 fas fa-euro-sign"></i>';
        let $furnitureOverlay = $furniture.querySelector('.furnitureOverlay');
        let $furnitureDetailDiv = $furniture.querySelector('.furnitureDetailDiv');
        let $furnitureCartDiv = $furniture.querySelector('.furnitureCartDiv');
        let $furnitureCartDivArrow = $furniture.querySelector('.furnitureBackToDetail');
        let $furnitureVarnishDiv = $furniture.querySelector('.furnitureVarnish');
        let $furnitureForm = $furniture.querySelector('#furnitureForm');
        $furnitureForm.addEventListener('submit' , (e) => {
            e.preventDefault();
        });
        for(let furnitureVarnish of furniture.varnish) {
            let bgVarnish = '';
            if (furnitureVarnish === "Light Oak") {
                bgVarnish = '#d1af84';
            } else if(furnitureVarnish === "Dark Oak") {
                bgVarnish = '#55342b'
            } else if(furnitureVarnish === "Mahogany") {
                bgVarnish = '#c04000';
            } else if(furnitureVarnish === "Teak") {
                bgVarnish = '#c29467';
            }
            let $furnitureVarnishChildDiv = document.createElement('div');
            ProductsService.setAttributes($furnitureVarnishChildDiv, {"style":'background: '+bgVarnish+'' , "class" : "ml-3"});
            $furnitureVarnishDiv.appendChild($furnitureVarnishChildDiv);

            let $furnitureInput = document.createElement('input');
            let $furnitureInputSpan = document.createElement('span');
            ProductsService.setAttributes($furnitureInputSpan , {'class': 'furnitureInputSpan'+bgVarnish.replace('#' , '') + ' ' + 'furnitureInputSpan'});
            let $furnitureInputDiv = $furniture.querySelector('.furnitureInputDiv');
            ProductsService.setAttributes($furnitureInput, {"name":'furnitureInput' , "value" : ''+bgVarnish+'' , 'type':'radio' , 'class':'mr-2 furnitureInput'+bgVarnish.replace('#' , '') + ' ' +'furnitureInput'});
            $furnitureInputDiv.appendChild($furnitureInput);
            $furnitureInputDiv.appendChild($furnitureInputSpan);
        }
        $furnitureOverlay.addEventListener('click' , function showCartDiv() {
            $furnitureDetailDiv.classList.toggle('d-flex');
            $furnitureDetailDiv.classList.toggle('d-none');
            $furnitureOverlay.classList.toggle('d-none');
            $furnitureCartDiv.classList.toggle('d-none');
        });
        $furnitureCartDivArrow.addEventListener('click' , function showDetailDiv() {
            $furnitureDetailDiv.classList.toggle('d-flex');
            $furnitureDetailDiv.classList.toggle('d-none');
            $furnitureOverlay.classList.toggle('d-none');
            $furnitureCartDiv.classList.toggle('d-none');
        });
        document.querySelector('#furnituresDiv').appendChild($furniture);
    }
}

iterateFurnitures();
