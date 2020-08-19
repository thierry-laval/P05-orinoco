//création de la fonction faisant la requête auprès de l'API
let get = function (url) {
  return new Promise(function (resolve, reject) {
    let request = new window.XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(request);
        }
      }
    };
    request.open("GET", url, true);
    request.send();
  });
};

/*CREATION DE LA PAGE LISTE EN JS*/

//appelle de la fonction
get("http://localhost:3000/api/teddies/")
  .then(function (response) {
    let productList = document.querySelector(".product-list");
    let teddies = JSON.parse(response); //tranformation des données JSON en JS
    //création de la boucle pour passer en revue chaque objet
    for (let i = 0; i < teddies.length; i++) {
      //récupération de la div qui va réceptionné les données
      let teddiesList = document.createElement("div");
      teddiesList.classList.add("row", "teddies");
      productList.appendChild(teddiesList);
      let teddyDisplay = document.querySelector(".teddies");

      //création des cartes listant les produits
      teddyDisplay.innerHTML += `
          <div class="card mb-2 m-md-3 mb-lg-0 border-dark shadow-lg col-10 offset-1 col-md-4 col-lg-3">
            <img
            class="card-img-top"
            src=${teddies[i].imageUrl}
            alt="photo peluche ours"
            />
            <div class="card-body">
              <h5 class="card-title">${teddies[i].name}</h5>
              <p class="card-text text-right">${teddies[i].price / 100},00 €</p>
              <p class="card-text d-none">${teddies[i].colors}<p>
              <p class="card-text d-none">${teddies[i].description}<p>
              <p class="card-text d-none">${teddies[i]._id}<p>
            </div>
            <div class="card-footer text-center">
              <a href="product.html" class="btn btn-primary description-link stretched-link">Description</a>
            </div>
          </div>
      `;
    }
    let descriptionLinks = document.querySelectorAll(".description-link"); //Création un sélecteur js des lien de description
    for (let i = 0; i < descriptionLinks.length; i++) {
      let link = descriptionLinks[i]; //création variable de chaque produit
      link.addEventListener("click", function (event) {
        localStorage.setItem("image", teddies[i].imageUrl); //enregistrement local de l'image de l'ours selectionné
        localStorage.setItem("name", teddies[i].name); //enregistrement local du nom de l'ours selectionné
        localStorage.setItem("price", teddies[i].price); //enregistrement local du prix de l'ours selectionné
        localStorage.setItem("colors", teddies[i].colors); //enregistrement local des couleurs de l'ours selectionné
        localStorage.setItem("description", teddies[i].description); //enregistrement local de la description de l'ours selectionné
        localStorage.setItem("_id", teddies[i]._id); //enregistrement local de l'id de l'ours selectionné
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });

//fonction affichant le nombre de produits dans le panier au chargement
function onLoadCartNumber() {
  let productInCart = localStorage.getItem("ProductsInCart");
  if (productInCart) {
    document.querySelector(".cart span").textContent = productInCart;
  }
}

//appelle de la fonction
onLoadCartNumber();
