const productId = new URLSearchParams(window.location.search).get("id");

const productContainer = document.querySelector(".productcontainer");


fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
    .then(response => response.json())
    .then(data => {

        productContainer.innerHTML = `
        <section class="product-grid">
    <div class="image-container">
        <img class="productimg"
          src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp"
          alt="Billede af produkt"/>
           <p class="discount-single ${data.discount && "IsOnSale"}">-${data.discount}%</p>
        </div>
        
    <div> 
    <div>
    <h2 class="productdisplayname">${data.productdisplayname}</h2>
</div>
<div>
<div class="grid1-1-1-1">
    <p class="brandname"><strong>${data.brandname}</strong></p>
    <p>I</p>
    <p class="articletype"><strong>${data.articletype}</strong></p>
</div>

    <br>
    <div class="grid1-1-1-1-category">
    <p> <strong>Category: </strong></p> 
    <p>${data.category}</p></div>
    <br>
    
    <div class="grid1-1-1-1-invetory">
        <p> <strong>Inventory number:</strong></p> 
        <p>${data.id}</p></div>

    <div class="grid1-1-1-1-season">
    <p> <strong>Season: </strong></p> 
    <p>${data.season}</p></div>
    <br>

 <p class="price ${data.discount ? "discount-price IsOnSale" : ""}">DKK ${data.price},-</p>
    ${data.discount ? `<p class="discount-price IsOnSale">Nu DKK ${Math.round(data.price * (1 - data.discount / 100))},-</p>` : ""}
    
<div class="grid1-1-produktsite">
    <label for="size">Size:</label>
    <select id="size" class="size-dropdown">
        <option value="" disabled selected>Size</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">X-Large</option>
    </select>
    <div class="buy-button">
        <a href="produkt.html">ADD TO BASKET</a>
      </div></div></div>
</section>
`
    })