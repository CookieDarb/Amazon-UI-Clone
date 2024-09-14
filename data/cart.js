export let cart=JSON.parse(localStorage.getItem('cart'))||[
{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryId: '1'
},{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryId: '2'
}
];

function saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantity){
    let sameCheck=0;
  
    cart.forEach((item)=>{
      if(productId===item.productId){
        item.quantity+=quantity;
        sameCheck=1;
      }
    });
  
    if(!sameCheck){
      cart.push({
        productId,
        quantity,
        deliveryId: '1' 
      });
    }
    saveCart();
}

export function removeFromCart(productId){
    cart=cart.filter(item=>{
        if(item.productId===productId){
            return false;
        }else{
            return true;
        }
    });
    saveCart();
}

export function cartQuantity(){
    let qt=0;
    cart.forEach(item=>{
      qt+=item.quantity;
    });
    return qt;
}

export function updateDeliveryId(productId,deliveryOptionId){
    cart.forEach(cartItem=>{
      if(cartItem.productId===productId){
        cartItem.deliveryId=deliveryOptionId;
      }
    });
    saveCart();
}

export function updateQuantity(productId,newQuantity){
    cart.forEach(cartItem=>{
      if(cartItem.productId===productId){
        cartItem.quantity=Number(newQuantity);
        saveCart();
      }
    });
}