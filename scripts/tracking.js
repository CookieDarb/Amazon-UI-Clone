import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getImage, getName } from "../data/products.js";

const url=new URL(window.location.href);
const orderId=url.searchParams.get('orderId');
const productId=url.searchParams.get('productId');

let prodName='';
let prodImg='';
let formattedTime='';
let quantity=0;
let ordTime=dayjs();
let deliveryTime=dayjs();

orders.forEach((order) => {
    if(order.id===orderId){
        const {products}=order;
        ordTime=dayjs(order.orderTime);

        products.forEach((product)=>{
            if(product.productId===productId){

                prodName=getName(productId);
                prodImg=getImage(productId);

                quantity=parseInt(product.quantity);

                deliveryTime=dayjs(product.estimatedDeliveryTime);
                formattedTime=deliveryTime.format('dddd, MMMM D');
            }
        });
    }
});

const today = dayjs();
const percentProgress = ((today - ordTime) / (deliveryTime - ordTime)) * 100;

let trackingHTML=`

<div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>

    <div class="delivery-date">
        Arriving on ${formattedTime}
    </div>

    <div class="product-info">
        ${prodName}
    </div>

    <div class="product-info">
        Quantity: ${quantity}
    </div>

    <img class="product-image" src="${prodImg}">

    <div class="progress-labels-container">
        <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar style="width: ${percentProgress}%;"></div>
    </div>
</div>

`;

document.querySelector('.js-main').innerHTML=trackingHTML;


