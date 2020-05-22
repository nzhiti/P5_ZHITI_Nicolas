import ProductsService from "../ProductsService.js";

function iterateFurnitures() {
    ProductsService.getFurnitures()
        .then(function (data) {
            for (let furniture of data) {
                drawFurnitures(furniture);
                console.log(furniture);
            }
        })
        .catch(function (error) {
            console.log("Impossible d'attribuer l'array teddies à sa variable " + error);
        });
}


function drawFurnitures(furniture) {

    let varnishColors;
    let htmlColors = '';
    for(let varnishColor of furniture.varnish) {
        if(varnishColor === "Dark Oak") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + varnishColor + '" style="background: #55342b"></div>'

        } else if(varnishColor === "Light Oak") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + varnishColor + '" style="background: #d1af84"></div>'
        } else if(varnishColor === "Mahogany") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + varnishColor + '" style="background: #c04000"></div>'
        } else if(varnishColor === "Teak") {
            htmlColors += '<div class="ml-3 products--magnet-txt-colors-' + varnishColor + '" style="background: #c29467"></div>'
        }

    }
    let htmlContent =
        '<a href="" class="my-4 mx-2">' +
        '<div class="products--magnet d-flex flex-wrap">' +
        '<div class="products--magnet-img col-12 p-0">' +
        '<img src="' + furniture.imageUrl + '" alt="image d\'ourson en peluche">' +
        '</div>' +
        '<div class="products--magnet-txt col-12 d-flex flex-wrap py-3">' +
        '<div class="products--magnet-txt-name col-12 mb-3">' +
        '<p>' + furniture.name + '</p>' +
        '</div>' +
        '<div class="col-12 mb-3">' +
        '<div class="d-flex flex-wrap justify-content-start align-items-center products--magnet-txt-varnish">Vernis : '+htmlColors+' </div>' +
        '</div>' +
        '<div class="products--magnet-txt-description col-12 mb-3">' +
        '<p>' + furniture.description + '</p>' +
        '</div>' +
        '<div class="products--magnet-txt-price col-12 d-flex align-items-center mb-3">' +
        '<p class="m-0">Prix :</p>' +
        '<p class="mx-2 m-0">' + furniture.price + '</p>' +
        '<i class="fas fa-euro-sign"></i>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>';
    ProductsService.innerHtml('furnituresMagnet', htmlContent);
}

iterateFurnitures();





