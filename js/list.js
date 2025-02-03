let ListContainer = document.querySelector(".product_list_container");
fetch(`https://kea-alt-del.dk/t7/api/products/`)
    .then(response => response.json())
    .then((data) => showList(data));

    function showList(products){
        console.log(products);
        let markup = "";
        products.map(product => { markup +=
            `<article class="product_container">
            <div><h3 class="productdisplayname">${product.productdisplayname}</h3></div>
            <div>
              <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="Billede af produkt"
              />
            </div>
            <div>
              <div class="grid1-1">
                <p class="articletype">${product.articletype}</p>
                <p>I</p>
                <p class="brandname">${product.brandname}</p>
              </div>
              <p class="price">DKK ${product.price},-</p>
            </div>
            <div class="button">
              <a href="produkt.html">Read More</a>
            </div>
          </article>` 
        }).join("");
        console.log(markup);
        ListContainer.innerHTML = markup;
}  
