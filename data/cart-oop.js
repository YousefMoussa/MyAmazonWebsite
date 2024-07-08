function Cart(localStorageKey){
    const cart = {
        cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [],
        loadFromStrorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId){
            let matchingitem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingitem = cartItem;
                };
            })
            if(matchingitem){
                matchingitem.quantity +=1;
            } else{
                this.cartItems.push(
                    {
                        productId,
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                );
            };
            this.saveToStorage();
        },
        removeFromCart(productId){
            const newCart  = [];
            this.cartItems.forEach((cartItem) =>{
                if(cartItem.productId !== productId) newCart.push(cartItem);
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
        updateDeliveryOption(productId, deliveryOptionId){
            let matchingitem;
        
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingitem = cartItem;
                };
            })
        
            matchingitem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        }
    };
    return cart;
}

const cart = Cart('cart-oop');
const buisnessCart = Cart('buisness-cart-oop');

