import ProductsService from "../ProductsService.js";

function iterateTeddies() {
    ProductsService.getTeddies()
        .then(function (data) {
            for (let teddie of data) {
                drawTeddies(teddie);
            }
        })
        .catch(function (error) {
            console.log("Impossible d'attribuer l'array teddies à sa variable " + error);
        });
}


function drawTeddies(teddie) {
    let teddieColors;
    let htmlColors = '';
    for(let teddieColor of teddie.colors) {
        if(teddieColor === "Pale brown") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + teddieColor + '" style="background: #987654"></div>'

        } else if(teddieColor === "Dark brown") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + teddieColor + '" style="background: #654321"></div>'
        } else {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + teddieColor + '" style="background: '+ teddieColor +'"></div>'
        }

    }
    let htmlContent =
        '<a href="" class="my-4 mx-2">' +
        '<div class="products--magnet d-flex flex-wrap">' +
        '<div class="products--magnet-img col-12 p-0">' +
        '<img src="' + teddie.imageUrl + '" alt="image d\'ourson en peluche">' +
        '</div>' +
        '<div class="products--magnet-txt col-12 d-flex flex-wrap py-3">' +
        '<div class="products--magnet-txt-name col-12 mb-3">' +
        '<p>' + teddie.name + '</p>' +
        '</div>' +
        '<div class="col-12 mb-3">' +
        '<div class="d-flex justify-content-start align-items-center products--magnet-txt-colors">Couleurs : ' + htmlColors + '</div>' +
        '</div>' +
        '<div class="products--magnet-txt-description col-12 mb-3">' +
        '<p>' + teddie.description + '</p>' +
        '</div>' +
        '<div class="products--magnet-txt-price col-12 d-flex align-items-center mb-3">' +
        '<p class="m-0">Prix :</p>' +
        '<p class="mx-2 m-0">' + teddie.price + '</p>' +
        '<i class="fas fa-euro-sign"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>';
    ProductsService.innerHtml('teddiesMagnet', htmlContent);
}

iterateTeddies();





