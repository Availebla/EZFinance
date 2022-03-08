const mysql = require("mysql");
const dotenv = require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to MySQL!");
});

module.exports = { connection };


















/////test to retrieve records
// const b1 = document.getElementById("b1"); //<button type="button" id="b1" class="btn btn-primary">Press here</button>
// b1.addEventListener("click", () => {
//   $.getJSON(
//     // [insert url for retrieve of records]
//     "http://nusbackendstub.herokuapp.com/user/by-uid?user_id=1",
//     (data) => {
//       let code = "<ul>";
//       data.forEach((datapoint) => {
//         code += `<li> First Name: ${datapoint.first_name}
//                     Last Name: ${datapoint.last_name}
//                     Email: ${datapoint.email} </li>`;
//       });
//       code += "</ul>";
//       $(".mypanel").html(code);
//     }
//   );
// });
////