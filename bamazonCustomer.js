var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_DB'
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // console.log("Hello! Welcome to Bamazon! Below are some of our products available for purchase " + connection.threadId + "\n");
    // run the displayAvailableItms function after the connection is made to initiate the prompt
    displayItems();
  });

function displayItems(){
    console.log("\n Hello! Welcome to Bamazon! Below are some of our products available for purchase.\n");
        connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
        console.log(
            "\n",
            "Product ID: " + res[i].item_id + "\n",
            "Product Name: " + res[i].product_name + "\n",
            "Product Price: " + res[i].price + "\n",
            )
        }
        console.log("----------------------------------------------------");
        // console.log(res);
        });
    // connection.end();
    customerInquiryAlert();
};

function customerInquiryAlert() {
    // quering the database for items
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // displaying the items in the available items list then...
        inquirer
        .prompt([
            {
              name: "itemID",
              type: "rawlist",
              message: "What product would you like to buy? Please choose from the following item ID numbers.",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
            // then asking the customer how many units the chosen product they would like
                name: "unitNumber",
                type: "input",
                message: "How many units of the product would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {

            // get the customer's answers for their chosenProduct and their unitNumber entry and store in variable; console.log answers
              var customerChoice = answer.chosenProduct;
              console.log("You chose the item id: " , customerChoice);
              var numberOfUnitsEntered = answer.unitNumber;
              console.log("The number of units chosen from stock: " , numberOfUnitsEntered);

            // then we are gathering the information of the chosen product and checking the sql table
            connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.chosenProduct}], function(err, res) {
                if (err) throw err;

            // checking our math -- is the customer's unit entry more or less than the item's stock quanity?
                // setting current quantity to the item's quantity
                var currentStockQuanity = res[0].stock_quantity;
                // setting price to the item's current price
                var price = res[0].price;
                // calculating the remaining quantity
                var remaining_quantity = currentStockQuanity - answer.unitNumber;
                
            // if the customer's unitNumber is greater than an item's stock quantity...
                if (res[0].stock_quantity < answer.unitNumber) {
                    console.log("Insufficient quantity! Sorry, there are not enough units of " + res[0].product_name + ". Please update your number of units."
                    + "\nThe current number of units available for " + res[0].product_name + "is " + res[0].stock_quantity + ".");
                }
                else {
                    (currentStockQuanity > answer.unitNumber)
                        console.log("Quantity of chosen item remaining: " + remaining_quantity);
                        console.log("Total cost: " + (answer.unitNumber * price) + "\n");

                        connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?," [remaining_quantity, answer.chosenProduct], function(err, res) { 
                        });

                        connection.query("SELECT * FROM products", function(err, res) {
                            if (err) throw err;
                            console.log("Purchase confirmed");
                            console.log("Here is the updated inventory of the product items:" );
                            console.log("----------------------------------------------------");
                            displayItems(res);
                        });
                }
            });
            connection.end();
        });
    });
}
