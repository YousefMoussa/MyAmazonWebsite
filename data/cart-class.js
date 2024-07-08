class Cart {
    #localStorageKey = undefined; // The hash makes the feild/property privite
    cartItems = undefined;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStrorage();
        //Don't return anything from the constructor
    }

    #loadFromStrorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

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
    }

    removeFromCart(productId){
        const newCart  = [];
        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId) newCart.push(cartItem);
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

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

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-buisness-oop');
