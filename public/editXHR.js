'use strict'

// xhr request for submit button to post a photo
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

// xhr request for delete button to delete a photo from database
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();


  let xhrUrl = document.getElementById('xhrURL').value;
  const dReq = new XMLHttpRequest();
  dReq.addEventListener('load', (event) => {
    window.location = event.currentTarget.responseURL;
  });

  dReq.open("delete", xhrUrl);
  dReq.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  dReq.send();
});