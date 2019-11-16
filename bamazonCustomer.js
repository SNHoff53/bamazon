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
    console.log("Connected to bamazon_DB in MySQL.");
    displayItems();
  });

function displayItems(){
    console.log("\n Hello! Welcome to Bamazon! Below are some of our products available for purchase.\n");
        connection.query("SELECT * FROM products", function(err, res){
        // if (err) throw err;
        for (var i = 0; i < res.length; i++){
        console.log(
            "\n",
            "Product ID: " + res[i].item_id + "\n",
            "Product Name: " + res[i].product_name + "\n",
            "Product Price: $ " + res[i].price + "\n",
            )
        }
        console.log("----------------------------------------------------");
        // console.log(res);
        });
    customerInquiryAlert();
};

function customerInquiryAlert() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt ([
            {
                name: "item",
                type: "number",
                message: "What product would you like to buy? Please choose one ID number from the list above."
            },
            {
                name: "numberOfUnits",
                type: "number",
                message: "How many units of the product would you like to purchase?"
            }
        ])
        .then(function(answer) {
            // get the customer's answers for their chosenProduct and their quantity choice and store in variable; console.log answers
              var itemChosen = answer.item;
              console.log("You chose item number " + itemChosen + ".");
              var unitsRequested = answer.numberOfUnits;
              console.log("You have chosen to purchase " + unitsRequested + " units.");

            // then we are gathering the information of the chosen product and checking the sql table
            connection.query("SELECT * FROM products WHERE ?", [{ 
                item_id : answer.item 
            }] ,function(err, res) {
                
                if (err) throw err;

            // if the customer's quantity choice is greater than an item's stock quantity...
                if (res[0].stock_quantity - answer.numberOfUnits >= 0) {
                    var purchaseOrder = unitsRequested * res[0].price;

                    console.log("Thank you for your purchase. Your order was successful.");
                    console.log("The total amount charged is $" + purchaseOrder + ".");
                    console.log("Quantity of " + res[0].product_name + " left in stock: " + res[0].stock_quantity + " .");
                    console.log("----------------------------------------------------");

                    connection.query("UPDATE products SET stock_quantity=? WHERE id=", 
                    [res[0].stock_quantity - unitsRequested, itemChosen], 
                    function(err, inventory) {
                        // if(err) throw err;
                    })
                } else {
                    console.log(
                        "Insufficient quantity! Sorry, there are not enough units of " + res[0].product_name + ". Please update your number of units."
                    + "\nThe current number of units available for " + res[0].product_name + " is " + res[0].stock_quantity + ".");
                }
                displayItems();
            });
            connection.end();
        });
    });
}
