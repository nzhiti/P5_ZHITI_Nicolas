import ProductsService from "../ProductsService.js";
import Camera from "../Models/cameras.js";

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
    const $template = document.querySelector('#cameras');
    const content = $template.content;
    for(let data of datas) {
        let camera = new Camera();
        camera = JSON.parse(JSON.stringify(data));
        const $camera = document.importNode(content, true);
        $camera.querySelector('.cameraImg').setAttribute('src', camera.imageUrl);
        $camera.querySelector('.cameraName').textContent = camera.name;
        $camera.querySelector('.cameraDescription').innerHTML = camera.description;
        $camera.querySelector('.cameraPrice').innerHTML = '<p class="m-0 mr-2">Prix :</p>' + camera.price + '<i class="ml-2 fas fa-euro-sign"></i>';
        let $cameraOverlay = $camera.querySelector('.cameraOverlay');
        let $cameraDetailDiv = $camera.querySelector('.cameraDetailDiv');
        let $cameraCartDiv = $camera.querySelector('.cameraCartDiv');
        let $cameraCartDivArrow = $camera.querySelector('.cameraBackToDetail');
        let $cameraLenseDiv = $camera.querySelector('.cameraLense');
        let $cameraLenseHtml = '';
        for(let cameraLense of camera.lenses) {
            $cameraLenseHtml += '<div class="products--magnet-txt-lenses-single mr-2 mb-2">'+cameraLense+'</div>';
            $cameraLenseDiv.innerHTML = $cameraLenseHtml;
        }
        $cameraOverlay.addEventListener('click' , function showCartDiv() {
            $cameraDetailDiv.classList.toggle('d-flex');
            $cameraDetailDiv.classList.toggle('d-none');
            $cameraOverlay.classList.toggle('d-none');
            $cameraCartDiv.classList.toggle('d-none');
        });
        $cameraCartDivArrow.addEventListener('click' , function showDetailDiv() {
            $cameraDetailDiv.classList.toggle('d-flex');
            $cameraDetailDiv.classList.toggle('d-none');
            $cameraOverlay.classList.toggle('d-none');
            $cameraCartDiv.classList.toggle('d-none');
        });
        document.querySelector('#camerasDiv').appendChild($camera);
    }
}

iterateCameras();





