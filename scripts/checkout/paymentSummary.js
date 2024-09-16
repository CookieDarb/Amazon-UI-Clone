import {cart, cartQuantity} from '../../data/cart.js';
import { getPrice } from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { formatMoney } from '../utils/money.js';

export function renderPaymentSummary(){

    //item price
    let productPrice;
    let totalItemPrice=0;
    let totalShippingPrice=0;

    cart.forEach(cartItem=>{
        const {productId}=cartItem;
        productPrice=getPrice(productId);
        totalItemPrice+=productPrice*cartItem.quantity;

        let deliveryOption;
        deliveryOptions.forEach((option)=>{
            if(option.id===cartItem.deliveryId){
                deliveryOption=option;
            }
        });
        totalShippingPrice+=deliveryOption.price;

    });

    console.log(totalItemPrice);
    console.log(totalShippingPrice);
    let totalBeforeTax=totalItemPrice+totalShippingPrice;
    let tax=totalBeforeTax*0.1;
    let totalAfterTax=totalBeforeTax+tax;
    console.log(totalBeforeTax);
    console.log(tax);
    console.log(totalAfterTax);

    //html generation
    let paymentSummaryHTML=`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${cartQuantity()}):</div>
        <div class="payment-summary-money">${formatMoney(totalItemPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${formatMoney(totalShippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatMoney(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${formatMoney(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatMoney(totalAfterTax)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
        `;

    document.querySelector(".js-payment-summary").innerHTML=paymentSummaryHTML;
}