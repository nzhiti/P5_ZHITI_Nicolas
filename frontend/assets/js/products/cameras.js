import ProductsService from "../ProductsService.js";
import CartService from "../CartService.js";

function iterateCameras() {
    ProductsService.getCameras()
        .then(function (data) {
            for (let camera of data) {
                drawCameras(camera);
                addProductToCart(camera);
            }
        })
        .catch(function (error) {
            console.log("Impossible d'attribuer l'array cameras à sa variable " + error);
        });

}


function drawCameras(camera) {
    let cameraLenseHtml = '';
    let cameraLenseOptions = '';
    for(let cameraLense of camera.lenses) {
        cameraLenseHtml += '<div class="products--magnet-txt-lenses-single">'+cameraLense+'</div>'
        cameraLenseOptions += '<option name="'+cameraLense+'" value="'+cameraLense+'">'+cameraLense+'</option>';
    }
    let hideDetailDiv =
        '<div id="products--magnet-detail-hide-s' + camera._id + '" class="col-12 d-none flex-wrap py-3">' +
        '<div class="col-12 d-flex mb-5 orange " onclick="toggleProductDiv(\'cameras\', \'s'+camera._id+'\')">' +
        '<i class="fas fa-arrow-left fa-2x mr-3"></i>' +
        '<p class="font-weight-bold">Retour</p>' +
        '</div>' +
        '<p class="col-12 font-weight-bold mb-5">Choissiez une lentille parmis celles disponibles :</p>' +
        '<form id="forms'+camera._id+'" class="d-flex flex-wrap justify-content-center col-12 cameraForm" method="get">' +
        '<div class="col-12 d-flex justify-content-center mb-5">' +
        '<input type="hidden" name="id" value="'+camera._id+'">' +
        '<div class="select">' +
        '<select id="select'+camera._id+'" class="col-12" name="cameraLense">' +
        cameraLenseOptions +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="products--magnet-detail-hide-form-btn col-12 d-flex justify-content-end">' +
        '<button class="cart-btn '+camera._id+'" onclick="CartService.addToCart(\''+camera._id+'\')" type="submit"><i class="fas fa-cart-plus fa-2x"></i></button>' +
        '</div>' +
        '</form>' +
        '</div>';

    let htmlContent =
        '<div class="my-4 mx-2">' +
        '<div id="camerass'+camera._id+'-magnet" class="products--magnet d-flex flex-wrap align-content-start">' +
        '<div class="products--magnet-overlay product-link mr-auto" onclick="toggleDetailDiv(\'cameras\', \'s'+camera._id+'\')"><i class="fas fa-cart-plus fa-5x"></i></div>' +
        '<div class="products--magnet-img col-12 p-0">' +
        '<img src="' + camera.imageUrl + '" alt="image d\'ourson en peluche">' +
        '</div>' +
        '<div id="camerass'+camera._id+'" class="products--magnet-txt col-12 d-flex flex-wrap py-3">' +
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
        '</div>';
    ProductsService.innerHtml('camerasMagnet', htmlContent);
    ProductsService.innerHtml('camerass'+camera._id+'-magnet' , hideDetailDiv);
}

function addProductToCart(camera) {
    let hidenInput = document.getElementById('hiden_input');
    let form = document.getElementById('form'+camera._id);
    let formSelect = document.getElementById('select'+camera._id);
    if(hidenInput.value === 1) {
        form.addEventListener('submit' , (e) => {
            e.preventDefault();
            console.log('allo ?');
            let option = formSelect.options[formSelect.selectedIndex].value;
            CartService.addToCart(camera._id , option);
            console.log("J'ajoute au panier");
        });
    }
}

iterateCameras();





