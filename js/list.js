
const mycategory = new URLSearchParams(window.location.search).get("category");
console.log("produktliste loader... med category", mycategory)

const ListContainer = document.querySelector(".product_list_container");
const overskrift = document.querySelector("h1")

overskrift.innerHTML = mycategory;

fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategory}`)
  .then((response) => response.json())
  .then(showProducts);

function showProducts(data) {
  
  console.log(data);
  markup = data
    .map(
      (product) => `
    <article class="product_container"}>
            <div><h3 class="productdisplayname">${product.productdisplayname}</h3></div>
            <div>
              <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="Billede af produkt"
              />

              <p class="discount ${product.discount && "isOnSale"}">-${product.discount}%</p>



              


            <div>
              <div class="grid1-1">
                <p class="articletype">${product.articletype}</p>
                <p>I</p>
                <p class="brandname">${product.brandname}</p>
              </div>
              <p class="${product.soldout && "sold-out"}"><strong>Sold Out</strong></p>
              <p class="price">DKK ${product.price},-</p>
            </div>
            <div class="button">
              <a href="produkt.html?id=${product.id}">Read More</a>
            </div>
          </article>
          `
    )
    .join("");
    console.log(markup);
  ListContainer.innerHTML = markup;
}


// // Få overskriften til at ændre sig baseret på kategori
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const category = urlParams.get("category");

// document.querySelector("h1").textContent = category;

// console.log("category:", category);





      // <span class="discount" ${product.discount && "IsOnSale"}>
            // ${product.discount}%</span>
            // <span class="sold-out" ${product.soldout && "IsSoldOut"}>
            // ${product.soldout}</span>

          //   <div class="discount"> 
          //   <p> Now DKK <span>${Math.floor((product.price*product.discount) / 100)} </span>,- </p>
          //   <p><span>${product.discount} </span>%</p>
          //   </div>      
          // </div>