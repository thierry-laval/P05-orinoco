//fonction affichant le nombre de produits dans le panier au chargement
function onLoadCartNumber() {
  let productInCart = localStorage.getItem("ProductsInCart");
  if (productInCart) {
    document.querySelector(".cart span").textContent = productInCart;
  }
}

//appelle de la fonction
onLoadCartNumber();

//variables générales
productsInCart = localStorage.getItem("productsToBuy");
productsInCart = JSON.parse(productsInCart);
let productsContainer = document.querySelector(".products-container");
let headlines = document.querySelector(".headlines");

//affichage des produits
if (productsInCart == null) {
  productsContainer.innerHTML = `
  <h4 class="font-italic col-12 text-center">Votre panier est vide</h4>
  `;
  let formContainer = document.querySelector(".form-container");
  formContainer.classList.add("d-none");
} else {
  //affichage de l'en-tête
  headlines.innerHTML = `
    <div class="col-md-4 d-none d-md-block text-center font-weight-bold">Image</div>
    <div class="col-md-2 d-none d-md-block text-center font-weight-bold">
          Produit
    </div>
    <div class="col-md-2 d-none d-md-block text-center font-weight-bold">Prix</div>
    <div class="col-md-4 d-none d-md-block text-center font-weight-bold">
          Couleur et description
    </div>
  `;
  //affichage de chaque produit
  for (let i = 0; i < productsInCart.length; i++) {
    let productsDisplay = document.createElement("div"); //création d'une div
    productsDisplay.classList.add("product-added"); //ajout de la class product-added
    productsContainer.appendChild(productsDisplay); //ajout de la div créée dans la div container
    let productDisplay = document.querySelector(".product-added"); //ciblage de la div créée
    //nouveau HTML par produit
    productDisplay.innerHTML += `
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4 text-center align-self-center">
          <img src="${productsInCart[i].image}" class="card-img" alt="">
        </div>
        <div class="col-md-2 text-center align-self-center"><h5>${
          productsInCart[i].name
        }</h5></div>
        <div class="col-md-2 text-center align-self-center"><h5>${
          productsInCart[i].price / 100
        },00 €</h5></div>
        <div class="col-md-4 text-center align-self-center"><h5>${
          productsInCart[i].color
        }</h5><p>${productsInCart[i].description}</p></div>
      </div>
    </div>
  `;
  }
  //affichage du prix total
  let totalCost = localStorage.getItem("totalCost");
  totalCost = parseInt(totalCost);
  let productsTotalCost = document.createElement("div");
  productsTotalCost.classList.add("totalCost", "col-12");
  productsContainer.appendChild(productsTotalCost);
  productsTotalCost = document.querySelector(".totalCost");
  productsTotalCost.innerHTML += `
      <div class="col-md-4 offset-md-4 text-center align-self-center my-3">
        <h5>TOTAL : ${totalCost},00 €</h5>
      </div>
  `;
}

// création de l'objet général client
class Client {
  constructor(firstName, lastName, eMail, telephoneNumber, address, city, zip) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.eMail = eMail),
      (this.telephoneNumber = telephoneNumber),
      (this.address = address),
      (this.city = city),
      (this.zip = zip);
  }
}

//variables générales du client
let orderButton = document.querySelector(".order-submit");
let validationButton = document.querySelector(".btn-primary");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let eMail = document.querySelector("#inputEmail");
let telephoneNumber = document.querySelector("#telephoneNumber");
let address = document.querySelector("#inputAddress");
let city = document.querySelector("#inputCity");
let zip = document.querySelector("#inputZip");

//créer un tableau avec les ids des articles commandés
let productsIdList = [];
for (let i = 0; i < productsInCart.length; i++) {
  productsIdList.push(productsInCart[i].iD);
}
localStorage.setItem("products", JSON.stringify(productsIdList));
productsIdList = localStorage.getItem("products");
productsIdList = JSON.parse(productsIdList);

//au click sur submit
orderButton.addEventListener("click", function (event) {
  event.preventDefault();
  //création du nouveau client
  let newClient = new Client(
    firstName.value,
    lastName.value,
    eMail.value,
    telephoneNumber.value,
    address.value,
    city.value,
    zip.value
  );

  //POST à l'API
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: {
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        address: newClient.address,
        city: newClient.city,
        email: newClient.eMail,
      },
      products: productsIdList,
    }),
  })
    .then((res) => {
      if (res.ok) {
        alert(
          "Informations enregistrées. Cliquez sur [Valider la commande]."
        );
        validationButton.classList.remove("disabled");
        return res.json();
      } else {
        alert("Vous devez renseigner tous les champs.");
      }
    })
    .then((data) => {
      localStorage.setItem("orderInfos", JSON.stringify(data));
    })
    .catch((error) => console.log("erreur de type : ", error));
});
