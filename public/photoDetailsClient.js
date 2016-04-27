'use strict'

// click event for photo listing to show detailed view of photo
const photoCollection = document.getElementById('photoCollection');
photoCollection.addEventListener('click', (event) => {
  event.preventDefault();

  let photoLink = document.getElementById('photoLink').value;
  let photoId = document.getElementById('photoId').value;
  // window.location = photoLink;

  // let pReq = new XMLHttpRequest();
  // pReq.addEventListener('load', (event) => {
  // });
  // pReq.open('get', photoLink);
  // pReq.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
  // pReq.setRequestHeader('Photo-Id', photoId);
  // pReq.send();
});