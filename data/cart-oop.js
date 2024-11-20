class Cart{

  localStorageKey=undefined;

  constructor(key){
    this.localStorageKey=key;
  }

  cartItems=JSON.parse(localStorage.getItem(this.localStorageKey))||[
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
  

  saveCart(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId,quantity){
      let sameCheck=0;
    
      this.cartItems.forEach((item)=>{
        if(productId===item.productId){
          item.quantity+=quantity;
          sameCheck=1;
        }
      });
    
      if(!sameCheck){
        this.cartItems.push({
          productId,
          quantity,
          deliveryId: '1' 
        });
      }
      this.saveCart();
  }

  removeFromCart(productId){
      this.cartItems=this.cartItems.filter(item=>{
          if(item.productId===productId){
              return false;
          }else{
              return true;
          }
      });
      this.saveCart();
  }

  cartQuantity(){
      let qt=0;
      this.cartItems.forEach(item=>{
        qt+=item.quantity;
      });
      return qt;
  }

  updateDeliveryId(productId,deliveryOptionId){
      this.cartItems.forEach(cartItem=>{
        if(cartItem.productId===productId){
          cartItem.deliveryId=deliveryOptionId;
        }
      });
      this.saveCart();
  }

  updateQuantity(productId,newQuantity){
      this.cartItems.forEach(cartItem=>{
        if(cartItem.productId===productId){
          cartItem.quantity=Number(newQuantity);
          this.saveCart();
        }
      });
  }
}

