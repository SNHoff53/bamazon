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
    // console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    displayAvailableItems();

  });


function displayAvailableItems(){
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
    
}


function customerInquiryAlert() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer
        .prompt([
            {
              name: "choice",
              type: "rawlist",
              choices: function() {
                var customerChoiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  customerChoiceArray.push(results[i].item_id);
                }
                return customerChoiceArray;
              },
              message: "What product would you like to buy? Please choose from the following item ID numbers."
            }
          ]);
    })
}