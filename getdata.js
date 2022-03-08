const b1 = document.getElementById("b1");
b1.addEventListener("click", () => {
  let user_id = document.getElementById("inputbox").value;
  $.getJSON(`https://ezfinancez.herokuapp.com/users/by-uid?uid=${user_id}`, (data) => {
    console.log(data);
    data = data[0];
    let code = `First Name: ${data.first_name} <br>
                Last Name:  ${data.last_name} <br>
                Email:      ${data.email}`;
    $(".mypanel").html(code);
  });
});

const b2 = document.getElementById("b2");
b2.addEventListener("click", () => {
  let user_id = document.getElementById("inputbox").value;
  $.getJSON(
    `https://ezfinancez.herokuapp.com/users/all`,
    (data) => {
      console.log(data);
      let code = "<ul>";
      data.forEach((datapoint) => {
        code += `<li> First Name: ${datapoint.first_name}
                    Last Name: ${datapoint.last_name}
                    Email: ${datapoint.email} </li>`;
      });
      code += "</ul>";
      $(".mypanel").html(code);
    }
  );
});
