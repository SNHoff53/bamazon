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
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    displayAvailableItems();
    askUserPrompt();
  });

  function displayAvailableItems(){
      connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err;
          for (var i = 0; i < res.length; i++){
              console.log(res[i].item_id + " | " + res[i].product_name + " | " + 
              res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity)
          }
          console.log("-----------------------------------------");
      });
  }

  function askUserPrompt() {
      
  }