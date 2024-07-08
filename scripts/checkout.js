import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-oop.js';
import { loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';

async function loadPage() { // await can only be used in async functions
    try{ // try-catch can be used in normal code to handle unexpected errors
        // throw 'error1'; // manualy creating an error
        await loadProductsFetch(); // await can only be used with promises
    } catch (error) {
        console.log("Unexpected error. Please try again later.");
    }
    renderOrderSummary();
    renderPaymentSummary();
    // can save resolves inside a variable
};
loadPage();

/*
loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve, reject) => {
    loadProducts(() => {
        // reject('error'); // creating a future error
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() =>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/