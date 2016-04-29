'use strict'

//xhr request for registration
const registerBtn = document.getElementById('register');
registerBtn.addEventListener('click', (event) => {
  event.preventDefault();

  let regInputsArr = event.currentTarget.parentNode.querySelectorAll('input[name]');
  let regInfo = 'first_name=' + regInputsArr[0].value + '&username=' + regInputsArr[1].value + '&password=' + regInputsArr[2].value + '&passwordVal=' + regInputsArr[3].value;

  const rReq = new XMLHttpRequest();
  rReq.addEventListener('load', (event) => {
  });

  rReq.onreadystatechange = function () {
    if (rReq.readyState == 4 && rReq.status != 200) {
      let res = JSON.parse(this.responseText);
      let errorDiv = document.getElementById('errorDiv');
      if (res.failure === "password"){
        errorDiv.innerHTML = 'Passwords do not match!';
      }
      else if (res.failure === "username") {
        errorDiv.innerHTML = "Username already exists"
      }
    }
  }

  rReq.open("post", '/register');
  rReq.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  rReq.send(regInfo);
});