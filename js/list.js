
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
 <article class="product_container">
 <div><h3 class="productdisplayname">${product.productdisplayname}</h3></div>
 <div class="image-container">
 <img
 src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
 alt="Billede af produkt"
 />
 <p class="discount ${product.discount && "IsOnSale"}">-${product.discount}%</p>
 <p class="sold-out ${product.soldout && "IsSoldOut"}">Sold Out</p>
 </div>
 <div>
 <div class="grid1-1">
 <p class="articletype">${product.articletype}</p>
 <p>I</p>
 <p class="brandname">${product.brandname}</p>
 </div>
  <p class="price ${product.discount ? "discount-price IsOnSale" : ""}">DKK ${product.price},-</p>
    ${product.discount ? `<p class="discount-price IsOnSale">Nu DKK ${Math.round(product.price * (1 - product.discount / 100))},-</p>` : ""}
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





// FILTER 

const filterSelect = document.querySelector("#filter");
let originalData = []; // Store the original data

// Modify your existing fetch chain to store the original data
fetch(`https://kea-alt-del.dk/t7/api/products?category=${mycategory}`)
  .then((response) => response.json())
  .then((data) => {
    originalData = data; // Store the original data
    showProducts(data); // Show all products initially
  });

// Add event listener to the filter select
filterSelect.addEventListener("change", function() {
  let filteredData = [...originalData]; // Create a copy of the original data

  switch(this.value) {
    case "women":
      filteredData = originalData.filter(product => 
        product.gender.toLowerCase() === "women" || 
        product.gender.toLowerCase() === "unisex"
      );
      break;
    
    case "men":
      filteredData = originalData.filter(product => 
        product.gender.toLowerCase() === "men" || 
        product.gender.toLowerCase() === "unisex"
      );
      break;
    
    case "discount":
      filteredData = originalData.filter(product => 
        product.discount && !product.soldout
      );
      break;
    
    case "all":
    default:
      filteredData = [...originalData];
      break;
  }

  showProducts(filteredData);
});