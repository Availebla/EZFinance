const express = require ("express"); 
const cors = require("cors");
const data = require("./database");
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json()); 
const { connection } = require("./database");

const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// req.isAuthenticated is provided from the auth router (comes from Auth0 function - True/False logged in/out)
app.get('/', (request, response) => {
  response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

app.get('/profile', requiresAuth(), (request, response) => {
    response.send(JSON.stringify(request.oidc.user));
});

// define a GET API with path "/home"
app.get("/home", (request, response) => {
    response.send("Welcome to EZ Finance App!");
});

// define an API to return all the users
app.get("/users/all", (request, response) => {
    connection.query("select * from user", (errors, results) => {
        if (errors) {
            console.log(errors);
            response.status(500).send("Something went wrong...");
        } else {
            response.status(200).send(results);
        }
    })
});

//define an API to get user by user id
app.get("/users/by-uid", (request, response) => {
    connection.query(    `select * from user where user_id = ${request.query.uid}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Something went wrong...");
      } else {
        if (results.length == 0) {
          response.status(404).send("user not found");
        } else {
          response.status(200).send(results);
        }
      }
    }
  );
});

// define an POST API to add a new user to database.
// User's information is passed request's body section.
app.post("/users/add", (request, response) => {
    connection.query(
      `insert into user (first_name, last_name, email) values ("${request.body.fname}", "${request.body.lname}", "${request.body.email}")`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
        } else {
          response.status(200).send("User added to the database!");
        }
      }
    );
  });

//define an API to update wallet total balance
  app.post("/wallet/balance/add", (request, response) => {
    connection.query(
      `update wallet set wallet.balance = wallet.balance + "${request.body.deposit}" where user_id = ${request.body.uid}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
        } else {
          response.status(200).send("Wallet balance updated!");
        }
      }
    );
  });

  //define an API to get wallet DETAILS by uid
app.get("/wallet", (request, response) => {
  connection.query(
    `select * from wallet where user_id = ${request.query.uid}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Something went wrong...");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

//define an API to get wallet balance by uid
app.get("/wallet/balance", (request, response) => {
  connection.query(
    `select balance from wallet where user_id = ${request.query.uid}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Something went wrong...");
      } else {
        response.status(200).send(results);
      }
    }
  );
});

//define an API to get transactions by uid
app.get("/transactions/by-uid", (request, response) => {
  connection.query(`select * from transactions where user_id = ${request.query.uid}`, 
  (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Something went wrong...");
    } else {
      response.status(200).send(results);
    }
  });
});

//define an API to get transactions by uid
app.get("/transactions/by-uid", (request, response) => {
  connection.query(`select * from transactions where user_id = ${request.query.uid}`, 
  (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("Something went wrong...");
    } else {
      response.status(200).send(results);
    }
  });
});

//Define API to add transaction into transaction details
app.post("/transactions/add", (request, response) => {
  connection.query(
    `insert into transactions (user_id, transaction_date, transaction_type, amount) 
     values (${request.body.uid}", ${request.body.transaction_date}", "${request.body.transaction_type}", "${request.body.amount}"  
     where user_id = ${request.body.uid}`,                 
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Something went wrong...");
      } else {
        response.status(200).send(results);
      }
    }
  );
});


//to start the server at port 3000
const port = process.env.PORT || 3000;
app.listen(port, (errors) => { 
    if (errors) {
        console.log(errors);
    } else {
        console.log(`Server started on port ${port}`)
    }
});


// ////test///

// router.post('/transact', function(req, res, next) {
//   console.log('transact working');
//   var amount = req.body.amount;
//   var card = req.body.card;
//   var action = req.body.action;
//   console.log(amount+' '+card+' '+action);
//     if(action=='DEPOSIT'){
//       var newAmount = (parseInt(amount) + parseInt(userdata.money)).toString();
//       var deposit = User.updateOne(
//       { 'card' : card },
//       { $set: { 'money' : newAmount } }
//       );
//       deposit.exec(function (err, result) {
//       if (err) return handleError(err);
//         console.log(result);
//       });
//     };
//     if(action=='WITHDRAW'){
//       var newAmount = parseInt(userdata.money) - parseInt(amount);
//       if(newAmount<0){res.redirect('/member'); return;}
//       var withdraw = User.updateOne(
//       { 'card' : card },
//       { $set: { 'money' : newAmount } }
//       );
//       withdraw.exec(function (err, result) {
//       if (err) return handleError(err);
//         console.log(result);
//       });
//     }