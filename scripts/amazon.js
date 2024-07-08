import { cart, addToCart } from "../data/cart.js";
import { products,loadProducts, getProduct } from "../data/products.js";
import{ formatCurrency } from "./utils/money.js";

let searchList = JSON.parse(localStorage.getItem('searchList')) || [];
localStorage.removeItem('searchList');

loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let productsHTML = '';
    updateCartQuantity();

    let continu = false;
    products.forEach((product) =>{

        continu = false;
        if(searchList.length != 0){
            searchList.forEach((word) => {
                const searchWord = word;
                
                product.keyWords.forEach((keyWord) =>{ 
                    if(keyWord.toLowerCase().includes(searchWord)) continu = true;
                })
                product.name.trim().split(/\s+/).map(item => item.toLowerCase()).forEach((keyWord) =>{ 
                    if(keyWord.toLowerCase().includes(searchWord)) continu = true;
                })
            });
            
        } else {
            continu = true;
        }
        
        if(!continu) {
        
        }else {
            console.log(products.length);
            product.addToCartCount = 1;
            const html = `
            <div class="product-container">
                <div class="product-image-container">
                <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${product.name}
                </div>

                <div class="product-rating-container">
                <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
                </div>

                <div class="product-price">
                ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                <select class="js-product-quantity-count" data-product-object-id="${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart" data-product-id="${product.id}">
                <img src="images/icons/checkmark.png">
                Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id="${product.id}">
                Add to Cart
                </button>
            </div>`;
            productsHTML += html;
        }
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;


    document.querySelectorAll('.js-product-quantity-count').forEach((choice) => {
        choice.addEventListener('change', () => {
            const product = getProduct(choice.dataset.productObjectId)
            product.addToCartCount = parseInt(choice.value, 10);
        });
    });

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            document.querySelectorAll(`.added-to-cart`).forEach((check) => {
                if(check.dataset.productId === productId) check.style.opacity = 1;
                setTimeout(() => {
                    check.style.opacity = 0;
                }, 3000);
            });
            addToCart(productId);
            updateCartQuantity();
        });
    });

    let popup = document.getElementById("popup");
    let span = document.getElementById("closePopup");
    document.querySelectorAll('.popup-button').forEach((btn) => {
        btn.addEventListener('click', () => {
            popup.style.display = "block";
        })
    });    
    span.onclick = function() {
        popup.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    searchList = [];    
};
function updateCartQuantity(){
    let cartQuantity = 0
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelector('.search-bar').addEventListener('keypress', (event) => {
    if(event.key === 'Enter') search();
});
document.querySelector('.search-button').addEventListener('click', () => {
    search();
});

function search(){
    const searchString = document.querySelector('.search-bar').value;
    document.querySelector('.search-bar').value = '';
    searchList = searchString.trim().split(/\s+/).map(item => item.toLowerCase());
    if(searchList.length === 1 && searchList[0] == '') searchList = [];
    console.log(searchList);
    renderProductsGrid();
    searchList = [];
    console.log(searchList);
    
}