# MyAmazonWebsite

This project is a practice exercise to create an Amazon-like e-commerce website using HTML, CSS, and JavaScript. The goal is to replicate some functionalities and design elements found on Amazon's website. The project includes product listing, cart management, checkout process, order tracking, and more.

## View the Site

You can view the live version of the site at: [MyAmazonWebsite](https://myamazonwebsite.netlify.app/)

## Project Structure

The project is organized into several key components:

### HTML Files

- **index.html**: The main page displaying a grid of products.
- **checkout.html**: The checkout page where users can review and finalize their orders.
- **orders.html**: The orders page displaying user's past orders.
- **tracking.html**: The order tracking page showing the delivery status of a specific order.

### CSS Files

- **styles/shared/general.css**: General styles applied across the entire application.
- **styles/shared/amazon-header.css**: Styles for the header that is consistent across all pages.
- **styles/pages/amazon.css**: Styles specific to the main product listing page.
- **styles/pages/checkout/checkout-header.css**: Styles for the header on the checkout page.
- **styles/pages/checkout/checkout.css**: Styles specific to the checkout page.
- **styles/pages/orders.css**: Styles specific to the orders page.
- **styles/pages/tracking.css**: Styles specific to the order tracking page.

### JavaScript Files

- **scripts/amazon.js**: Handles product rendering and interactions on the main page.
- **scripts/cart.js**: Manages the shopping cart functionalities.
- **scripts/cart-class.js**: A class-based approach to managing the cart.
- **scripts/cart-oop.js**: An object-oriented approach to managing the cart.
- **scripts/checkout.js**: Manages the checkout process.
- **scripts/orders.js**: Handles displaying and managing user orders.
- **scripts/tracking.js**: Manages order tracking details.
- **scripts/paymentSummary.js**: Renders and calculates the payment summary during checkout.
- **scripts/orderSummary.js**: Renders the order summary during checkout.
- **scripts/money.js**: Utility functions for formatting currency.

### Data Files

- **data/products.json**: Contains the product data used for rendering product listings.
- **data/cart.js**: Contains functions for managing the cart.
- **data/orders.js**: Handles order data and management.
- **data/deliveryOptions.js**: Contains delivery options data.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/MyAmazonWebsite.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd MyAmazonWebsite
    ```

3. **Open `index.html` in your browser** to view the site.

## Features

- **Product Listing**: Displays a grid of products with images, names, prices, and ratings.
- **Search Functionality**: Allows users to search for products.
- **Cart Management**: Add, update, and remove products from the cart.
- **Checkout Process**: Review and finalize orders, choose delivery options, and view payment summary.
- **Order Tracking**: Track the delivery status of orders.
- **Responsive Design**: The site is responsive and works well on different screen sizes.
- **Order History**: Allow users to view their order history and details.

## Future Improvements

- **User Authentication**: Implement user login and registration.
- **Product Reviews**: Allow users to leave reviews and ratings for products.
- **Payment Integration**: Integrate with a payment gateway for processing payments.


## Acknowledgements

- This project is inspired by Amazon's website and is created for educational purposes.
- Icons and images used in this project are sourced from various online resources.
- Fonts are provided by Google Fonts.
- This project is for educational purposes and is not affiliated with or endorsed by Amazon.

---

Feel free to explore, contribute, and provide feedback to improve this project!
