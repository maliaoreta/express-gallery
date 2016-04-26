'use strict'

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  let method = document.getElementById('method').value;
  let xhrUrl = document.getElementById('xhrURL').value;
  let inputsArr = event.currentTarget.parentNode.querySelectorAll('input[name]');
  let photo = 'author=' + inputsArr[0].value + '&link=' + inputsArr[1].value + '&description=' + inputsArr[2].value;

  const xReq = new XMLHttpRequest();
  xReq.addEventListener('load', (event) => {
    window.location = event.currentTarget.responseURL;
  });
  xReq.open(method, xhrUrl);
  xReq.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  xReq.send(photo);
});