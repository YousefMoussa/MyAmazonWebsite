import { cart,removeFromCart,updateDeliveryOption,getItemQuantity,setItemQuantity } from '../../data/cart.js';
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary,updateCartQuantityReturn } from './paymentSummary.js';

export function renderOrderSummary(){

    let cartSummaryHTML = '';

    if(updateCartQuantityReturn() == 0){
        document.querySelector('.order-summary').innerHTML = `
        <div data-testid="empty-cart-message">
        Your cart is empty.
        </div>
        <a class="button-primary view-products-link" href="../../amazon.html" data-testid="view-products-link">
        View products
        </a>
        `
        return;
    }

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString  = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
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
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary update-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        `

    });

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let deliveryHTML = ''
        const today = dayjs();

        deliveryOptions.forEach((deliveryOption) => {
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString  = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            deliveryHTML += `
            <div class="delivery-option js-delivery-option"
                data-product-id = "${matchingProduct.id}"
                data-delivery-option-id = "${deliveryOption.id}"
                >
                <input type="radio"
                ${isChecked ? 'checked' : ''} 
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
                </div>
            </div>
            `
        });
        return deliveryHTML;
    };

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            renderPaymentSummary();
            renderOrderSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.update-quantity-link').forEach((updateLink) => {
        // Define a named function for the click handler
        function updateQuantityHandler() {
            // Remove the event listener from updateLink
            updateLink.removeEventListener('click', updateQuantityHandler);
    
            // Continue with your logic
            const productId = updateLink.dataset.productId;
            let productQuantity = getItemQuantity(productId);
            document.querySelector(`.update-${productId}`).innerHTML = `
                <input class="js-new-quantity-input new-quantity-input" type="number" 
                value="${productQuantity}" data-testid="new-quantity-input">
                <span class="save-quantity-link link-primary save-${productId}" 
                data-product-id="${productId}">save</span>`;
            document.querySelector(`.save-${productId}`).addEventListener('click', () => {
                productQuantity = document.querySelector('.js-new-quantity-input').value;
                productQuantity = parseInt(productQuantity, 10);
                document.querySelector(`.update-${productId}`).innerHTML = 'Update';
                setItemQuantity(productId, productQuantity);
                renderPaymentSummary();
                renderOrderSummary();
            });
            document.querySelector(`.quantity-${productId}`).innerHTML = '';
        }
    
        // Add the event listener to updateLink
        updateLink.addEventListener('click', updateQuantityHandler);
    });
    
};