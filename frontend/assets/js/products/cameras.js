import ProductsService from "../ProductsService.js";

function iterateCameras() {
    ProductsService.getCameras()
        .then(function (data) {
            for (let camera of data) {
                drawCameras(camera);
            }
        })
        .catch(function (error) {
            console.log("Impossible d'attribuer l'array teddies à sa variable " + error);
        });
}


function drawCameras(camera) {

    let cameraLenseHtml = '';
    for(let cameraLense of camera.lenses) {
        cameraLenseHtml += '<div class="products--magnet-txt-lenses-single">'+cameraLense+'</div>'

    }
    let htmlContent =
        '<a href="" class="my-4 mx-2">' +
        '<div class="products--magnet d-flex flex-wrap">' +
        '<div class="products--magnet-img col-12 p-0">' +
        '<img src="' + camera.imageUrl + '" alt="image d\'ourson en peluche">' +
        '</div>' +
        '<div class="products--magnet-txt col-12 d-flex flex-wrap py-3">' +
        '<div class="products--magnet-txt-name col-12 mb-3">' +
        '<p>' + camera.name + '</p>' +
        '</div>' +
        '<div class="col-12 mb-3">' +
        '<div class="d-flex flex-wrap justify-content-start align-items-center products--magnet-txt-lenses">Lentilles : '+cameraLenseHtml+'</div>' +
        '</div>' +
        '<div class="products--magnet-txt-description col-12 mb-3">' +
        '<p>' + camera.description + '</p>' +
        '</div>' +
        '<div class="products--magnet-txt-price col-12 d-flex align-items-center mb-3">' +
        '<p class="m-0">Prix :</p>' +
        '<p class="mx-2 m-0">' + camera.price + '</p>' +
        '<i class="fas fa-euro-sign"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>';
    ProductsService.innerHtml('camerasMagnet', htmlContent);
}

iterateCameras();





