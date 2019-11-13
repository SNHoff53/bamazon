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
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("---------------------- Available Items ----------------------");
        for (var i = 0; i < res.length; i++){
        console.log(
            "Product ID: " + res[i].item_id + "\n",
            "Product Name: " + res[i].product_name + "\n",
            "Product Price: " + res[i].price + "\n",
            )
        }
        console.log("----------------------------------------------------");
    });
    customerInquiryAlert();
}


