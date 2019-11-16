# bamazon

## Overview --
This application is an Amazon-like- storefront, using MySQL. The app takes in orders from customers and depletes the stock amount from the store's inventory. 

## Technologies Used -- 
* [Node.js]
* [Node-File-System]
* [NPM-inquirer]
* [NPM-mysql]
* [JavaScript]
* [MySQL]

## Instructions/Commands --

1. Displaying Items to the terminal: 

    To begin the application, type `node bamazonCustomer.js` into the terminal. This will populate and display the available items for purchase from our MySQL database. 

 #### Preview below:

![displayItems](bamazon-display-items.gif)


2. Asking/prompting the customer which item they would like to choose to purchase.

    Once the items have been displayed, a prompt will appear asking the customer which item they would like to purchase, and to choose one `item_id` from the selection above. They would enter a number between 1 and 10.

#### Preview below:

![which-item_id](bamazon-prompt-which-item.gif)

3. Asking/prompting the customer the number of units they would like to purchase

    After the customer has chosen the item they would like to purchase, they will be given another prompt, asking how many units (number) they would like to purchase. 

 #### Preview below:

![how-many-units](bamazon-how-many-units.gif)


4. If the customer entered in a unit number greater than the current `stock_quantity` for that item...

    Then a response will appear, claiming that there is insufficient quantity -- that there are not enough units of that item to be purchased, and provides that number for the customer to see. The prompt also asks the customer to update their previous unit request number.

 #### Preview below:

![unit-number-greater](bamazon-insufficient-quantity.gif)


5. If the customer entered in a unit number less than the current `stock_quantity` for that item...

    Then a response will appear, confirming that the purchase was successful, the total amount that was charged, and how many units are left in stock for that chosen item. Then using node.js, we update the `products` query table to reflect how many unit remain after the customer's purchase. 

 #### Preview below:

![unit-number-less](bamazon-successful-purchase.gif)


