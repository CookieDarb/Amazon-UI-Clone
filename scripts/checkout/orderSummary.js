import {cart, removeFromCart, cartQuantity, updateDeliveryId, updateQuantity} from '../../data/cart.js';
import {products} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
 
export function renderOrderSummary(){
    let orderSummaryHTML=``;

    cart.forEach((cartItem)=>{
        const {productId}=cartItem;

        let matchingProduct;

        products.forEach(product=>{
            if(product.id===productId){
                matchingProduct=product;
            }
        });

        let deliveryOption;
        deliveryOptions.forEach((option)=>{
            if(option.id===cartItem.deliveryId){
                deliveryOption=option;
            }
        });
        const today=dayjs();
        const deliveryDate=today.add(deliveryOption.deliveryDays, 'days');
        const dateString=deliveryDate.format('dddd, MMMM D');

        orderSummaryHTML+=`
        <div class="cart-item-container js-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${"$"+((matchingProduct.price/100).toFixed(2))}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input type="number" min="1" max="100" step="1" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
            </div>
            </div>
        </div>
        </div>
        `;
    });

    document.querySelector(".js-order-summary").innerHTML=orderSummaryHTML;
    //checkout header link
    function checkoutHeader(cartQuantity){
        if(cartQuantity===0){
            document.querySelector(".js-checkout-header-middle-section").innerText="";
        }
        else{
            document.querySelector(".js-checkout-header-middle-section").innerText=`${cartQuantity} items`;
        }
    }

    checkoutHeader(cartQuantity());

    //interactibility to delete link
    document.querySelectorAll('.js-delete-link').forEach(link=>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
            //remove from cart
            removeFromCart(productId);
            //update the HTML
            document.querySelector(`.js-container-${productId}`).remove();
            checkoutHeader(cartQuantity());
            renderOrderSummary();
        });
    });

    //interactibility to update link
    document.querySelectorAll('.js-update-link').forEach(link=>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
            //making the input appear and update link disappear
            document.querySelector(`.js-container-${productId}`).classList.add('is-editing-quantity');
            
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach(link=>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
            //making the input disappear and update appear
            document.querySelector(`.js-container-${productId}`).classList.remove('is-editing-quantity');

            //updating quantity
            let newQuantity=document.querySelector(`.js-quantity-input-${productId}`).value;
            console.log(newQuantity);
            if(newQuantity){
                updateQuantity(productId,newQuantity);
                renderOrderSummary();
            }
        });
    });

    // delivery date

    // console.log(deliveryDate.format('dddd, MMMM D'));

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html=``;
        deliveryOptions.forEach(deliveryOption=>{
            const today=dayjs();
            const deliveryDate=today.add(deliveryOption.deliveryDays, 'days');
            const dateString=deliveryDate.format('dddd, MMMM D');
            const priceString=deliveryOption.price===0
                ?'FREE'
                : `${"$"+((deliveryOption.price/100).toFixed(2))} -`;
            let ischecked=deliveryOption.id===cartItem.deliveryId;

            html+=`
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option="${deliveryOption.id}">
                <input type="radio" 
                ${ischecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `;
        });

        return html;
    }

    document.querySelectorAll(".js-delivery-option").forEach(option=>{
        option.addEventListener('click',()=>{
            const {productId,deliveryOption}=option.dataset;
            updateDeliveryId(productId,deliveryOption);
            renderOrderSummary();
        });
    });
}