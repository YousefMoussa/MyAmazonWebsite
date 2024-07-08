import { getProduct } from "./products.js";
import { updateCartQuantityReturn } from '../scripts/checkout/paymentSummary.js'

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId){
    let matchingitem;

    const product = getProduct(productId);
    
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingitem = cartItem;
        };
    })
    if(matchingitem){
        matchingitem.quantity += product.addToCartCount;
    } else{
        cart.push(
            {
                productId,
                quantity: product.addToCartCount,
                deliveryOptionId: '1'
            }
        );
    };

    saveToStorage();
};


export function getItemQuantity(productId){
    let matchingitem;
    
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingitem = cartItem;
        };
    })
    
    return matchingitem.quantity;
};

export function setItemQuantity(productId, quantity){
    let matchingitem;
    
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingitem = cartItem;
        };
    })
    
    matchingitem.quantity = quantity;
    return;
};

export function removeFromCart(productId){
    const newCart  = [];
    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId) newCart.push(cartItem);
    });
    cart = newCart;
    saveToStorage();
};

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingitem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingitem = cartItem;
        };
    })

    matchingitem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function emptyCart(){
    cart = [];
    saveToStorage();
}

