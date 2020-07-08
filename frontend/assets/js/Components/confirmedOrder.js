let orders = JSON.parse(localStorage.getItem("order") || "[]"); // Récupération des commandes dans le localStorage

function drawTicket() {
    // Création du code HTML a intégrer dans la page
    let orderNumber = '';
    if(orders.length > 1) {
         orderNumber = `Vos colis n°<ul class="order--magnet-number-iterate font-weight-bold d-flex flex-wrap p-0 m-0"></ul> seront livrés à l'adresse suivante :`;
    } else {
         orderNumber = `Votre colis n°<ul class="order--magnet-number-iterate d-flex flex-wrap p-0 font-weight-bold m-0"></ul> sera livré à l'adresse suivante :`;
    }
    let orderAddress = `<ul><li class="font-weight-bold text-uppercase">${orders[0].contact.lastName} ${orders[0].contact.firstName}</li><li>${orders[0].contact.address}</li><li>${orders[0].contact.city}</li></ul>`;
    let orderTitle = `Merci ${orders[0].contact.firstName} ! Votre commande est validée`;
    let orderEmail = `Un récapitulatif de votre commande ainsi que la facture de celle ci vous sera envoyé à l'adresse mail : <b>${orders[0].contact.email}</b> `;

    // Div dans lesquelles le code HTML va s'insérer
    let titleDiv = document.querySelector('.order--magnet-title');
    let orderNumberDiv = document.querySelector('.order--magnet-number');
    let emailDiv = document.querySelector('.order--magnet-email');
    let addressDiv = document.querySelector('.order--magnet-address');

    // Insertion du code dans ces divs
    titleDiv.innerHTML = orderTitle;
    orderNumberDiv.innerHTML = orderNumber;
    emailDiv.innerHTML = orderEmail;
    addressDiv.innerHTML = orderAddress;

    for(let i=0; i < orders.length; i++) {
        let orderNumberIterationDiv = document.querySelector('.order--magnet-number-iterate');
        orderNumberIterationDiv.innerHTML +=  '<li>'+orders[i].orderId+'</li>'
    }
}

if(orders.length > 0) {
    drawTicket()
} else {
    let errorDiv = document.querySelector('.order--magnet-error');
    let orderDiv = document.querySelector('.order--magnet');
    errorDiv.classList.toggle('d-none');
    orderDiv.classList.toggle('d-flex');
}
localStorage.clear(); // Vidange du localstorage & redirection sur la page d'accueil

