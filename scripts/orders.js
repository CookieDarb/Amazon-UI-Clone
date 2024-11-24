import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatMoney } from "./utils/money.js";
import { getImage,getName } from "../data/products.js";
import { cartQuantity } from "../data/cart.js";
import { addToCart } from "../data/cart.js";

function renderOrderDetails(order){
    let orderDetailHTML=``;

    const {products}=order;

    products.forEach((product)=>{

        //getting product details
        const prodID=product.productId;
        const {quantity}=product;
        
        const prodName=getName(prodID);
        const prodImg=getImage(prodID);

        const orderTime=dayjs(product.estimatedDeliveryTime);
        const formattedTime=orderTime.format('MMMM D')


        orderDetailHTML+=`
            <div class="product-image-container">
                <img src="${prodImg}">
            </div>

            <div class="product-details">
                <div class="product-name">
                ${prodName}
                </div>
                <div class="product-delivery-date">
                Arriving on: ${formattedTime}
                </div>
                <div class="product-quantity">
                Quantity: ${quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-quantity="${quantity}" data-product-id="${prodID}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${prodID}">
                <button class="track-package-button button-secondary js-track-button">
                    Track package
                </button>
                </a>
            </div>
        `;
    });

    return orderDetailHTML;
}

function renderOrderHistory(){
    let orderHistoryHTML=``;

    orders.forEach((order) => {

        //Order Time using dayjs()
        const orderTime=dayjs(order.orderTime);
        const formattedTime=orderTime.format('MMMM D');
        
        //Order Total Amount
        const totalCostCents=order.totalCostCents;
        const formattedMoney=formatMoney(totalCostCents);

        //Order Id
        const orderId=order.id;

        orderHistoryHTML+=`
        <div class="order-container">

        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedTime}</div>
            </div>
            <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formattedMoney}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
        </div>
        </div>

        <div class="order-details-grid">
        ${renderOrderDetails(order)}
        </div>
    </div>
        `; 
    });

    document.querySelector(".js-order-grid").innerHTML=orderHistoryHTML;

    //checkout header link
    function checkoutHeader(cartQuantity){
        if(cartQuantity===0){
            document.querySelector(".js-cart-quantity").innerText="";
        }
        else{
            document.querySelector(".js-cart-quantity").innerText=`${cartQuantity}`;
        }
    }

    checkoutHeader(cartQuantity());

    //adding buy again functionality
    document.querySelectorAll(".js-buy-again-button").forEach((button)=>{
        button.addEventListener('click',()=>{
            let quantity=parseInt(button.dataset.productQuantity);
            let prodId=button.dataset.productId;
            addToCart(prodId,quantity);
            window.location.href="checkout.html";
        });
    });
}



renderOrderHistory();