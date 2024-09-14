import {cart, addToCart, cartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

let productHTML="";

products.forEach(product=>{
    productHTML+=`
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${"$"+((product.price/100).toFixed(2))}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-msg-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

//adding HTML to code using DOM
document.querySelector('.js-products-grid').innerHTML=productHTML;


//creating cart array
function cartDisplay(cartQuantity){
  if(cartQuantity===0){
    document.querySelector(".js-cart-quantity").innerText="";
  }
  else{
    document.querySelector(".js-cart-quantity").innerText=cartQuantity;
  }
}

cartDisplay(cartQuantity());

function displayAddedText(productId,addedTimer){
  clearTimeout(addedTimer);

  document.querySelector(`.js-added-msg-${productId}`).classList.add("added-to-cart-display");
  addedTimer=setTimeout(()=>{
    document.querySelector(`.js-added-msg-${productId}`).classList.remove("added-to-cart-display");
  },2000);
}

let addedTimer;

document.querySelectorAll(".js-add-to-cart").forEach((buttonElement)=>{
  buttonElement.addEventListener("click",()=>{
    const productId=buttonElement.dataset.productId;
    let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    addToCart(productId,quantity);

    //cart-quantity div in homepage
    cartDisplay(cartQuantity());
    
    //displaying added text
    displayAddedText(productId,addedTimer);    
  });
});


