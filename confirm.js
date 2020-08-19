//variables pour l'affichage des données
let totalPriceDisplay = document.querySelector(".totalPrice span");
let orderIdDisplay = document.querySelector(".orderId span");
let orderInfo = localStorage.getItem("orderInfos");
orderInfo = JSON.parse(localStorage.orderInfos);
let totalPrice = localStorage.getItem("totalCost");
let orderId = orderInfo.orderId;

//affichage des données
totalPriceDisplay.textContent = totalPrice; //affichage du prix total
orderIdDisplay.textContent = orderId; //affichage de l'id de commande

//récapitulatif de la commande
let recapDisplay = document.querySelector(".recap p");
let nameDisplay = document.querySelector(".name");
let recapOrder = localStorage.getItem("productsToBuy");
let nameGet = localStorage.getItem("orderInfos");
recapOrder = JSON.parse(recapOrder);
nameGet = JSON.parse(nameGet);
nameDisplay.textContent = `${nameGet.contact.firstName} ${nameGet.contact.lastName}`;
for (const BuyedBear of recapOrder) {
  recapDisplay.textContent += `
Un adorable ourson nommé ${BuyedBear.name} dont la couleur est ${
    BuyedBear.color
  } et dont le prix unitaire est de ${BuyedBear.price / 100},00 €.
`;
}

//reset le panier au départ de la page
window.addEventListener("unload", function () {
  localStorage.clear();
});
