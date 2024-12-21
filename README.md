# Amazon Clone - E-commerce Platform

This repository contains a fully functional Amazon-like e-commerce application that replicates essential features of an online shopping platform. While it does not include advanced functionalities like payment gateways or user registration, it provides a solid foundation for understanding e-commerce platforms through dynamic HTML, robust JavaScript, and CSS styling.

Link : https://cookiedarb.github.io/Amazon-UI-Clone/amazon.html

## Screenshot

<details>
  <summary>Home</summary>
  
  ![image](https://github.com/user-attachments/assets/9fde0fb4-3c3f-4bac-b378-b083cb0f2117)
  
</details>
<details>
  <summary>Cart</summary>
  
  ![image](https://github.com/user-attachments/assets/d570ae2b-ad8b-4f3d-9345-835b5260a828)
  
</details>
<details>
  <summary>Returns & Order</summary>
  
  ![image](https://github.com/user-attachments/assets/079127d1-93cd-4d81-829d-537289348d91)

  
</details>
<details>
  <summary>Tracking</summary>
  
  ![image](https://github.com/user-attachments/assets/86054cfe-43dd-4eb2-a615-083208a1f373)

  
</details>


---

## Features
- **Dynamic HTML Loading**:  
  Pages and product listings are dynamically generated and updated using JavaScript and the DOM API.

- **Quantity Selection**:  
  Users can select the quantity of items in the cart, with real-time updates to cart totals.

- **Search Functionality**:  
  - Keyword-based search with case-insensitive matching.  
  - Results are dynamically displayed as users type.

- **Cart Management**:  
  - CRUD Operations: Add, remove, update, and delete items from the cart.  
  - Real-time cart updates with changes reflected in localStorage.

- **Order Total Calculation**:  
  Automatically calculates total cost based on item price and quantity.

- **Buy It Again Option**:  
  Items from previous orders can be re-added to the cart easily.

- **Custom Delivery Tracking**:  
  - A mock delivery tracking system based on predefined statuses.  
  - Uses `day.js` library for realistic date and time tracking.

- **LocalStorage Integration**:  
  Persistent cart and order data stored in the browser for seamless user experience.

---

## Technology Stack
- **Frontend**:  
  - HTML5  
  - CSS3 (responsive design, flexbox, and grid layouts)  
  - JavaScript (ES6+)  

- **Testing Framework**:  
  - Jasmine for unit testing JavaScript functionality.

- **External Libraries**:  
  - `day.js` for date manipulation in delivery tracking.

---

## Concepts and Techniques Used

### HTML
- Semantic HTML5 structure.
- Forms and inputs for quantity selection and search functionality.
- `<template>` elements for dynamically rendering product cards.

### CSS
- Responsive design with Flexbox and CSS Grid.
- Custom animations and transitions.
- Media queries for mobile and desktop views.

### JavaScript
- **DOM Manipulation**:  
  - Dynamic content generation for products, cart, and tracking statuses.
- **Advanced Functions**:  
  - Arrow functions, closures, and higher-order functions.  
- **Modules**:  
  - Separation of concerns with modular JavaScript files for cart, product, and utility functions.  
- **Object-Oriented Programming (OOP)**:  
  - Classes and inheritance for product and cart item modeling.
- **Asynchronous Programming**:  
  - `async/await` used for simulating backend calls.
- **Callbacks**:  
  - Custom event handlers for button clicks and cart updates.
- **External Library Integration**:  
  - `day.js` for accurate date-based functionalities.

### Backend Simulation  
- Mock JSON data used for products and orders.  
- LocalStorage serves as a temporary backend to persist user data across sessions.
