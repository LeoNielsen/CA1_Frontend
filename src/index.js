import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import "./facade"
import facade from "./facade"




document.querySelector("#searchbutton").addEventListener(`click`, () =>{
  
  document.querySelector("#tbody").innerHTML = "";
  let input = document.querySelector("#input").value;
  let filter = document.querySelector("#filter").value;

  switch (filter) {
    case "ID":
       getUserById(input);
      break;
    case "Name":
      getPersonByName(input);
      break;
    case "Phone number":
      getPersonByPhone(input);
      break;
    default:
      break;
  }
});



function getUserById(input){
  facade.getUserById(input)
  .then(user => {
    document.querySelector("#tbody").innerHTML = 
    `<tr>
      <td>${user.id}</td>
      <td>${user.firstname}</td>
      <td>${user.lastname}</td>
      <td>${user.email}</td>
      <td>${user.phones[0].number}</td>
      <td>${user.address.street} ${user.address.additionalInfo}</td>
      <td>${user.address.zipcode}</td>
      <td>${user.address.city}</td>
    </tr>`
  })
}

function getPersonByName(input){
  facade.getAllUsers()
  .then(users => {
    users.filter(function(user){
      if(user.firstname.toLowerCase().includes(input.toLowerCase()) || user.lastname.toLowerCase().includes(input.toLowerCase())){
        return user;
      }
    }).forEach(user => {
      let phone;
        if (user.phones.length > 0){
          phone = user.phones[0].number
        } else {
          phone = "No Phone";
        }

      document.querySelector("#tbody").innerHTML += 
      `<tr>
          <td>${user.id}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.email}</td>
          <td>${phone}</td>
          <td>${user.address.street} ${user.address.additionalInfo}</td>
          <td>${user.address.zipcode}</td>
          <td>${user.address.city}</td>
      </tr>`
    });
  })
}

function getPersonByPhone(input){
  console.log(facade.getUserByPhone(input))
  facade.getUserByPhone(input)
  .then(user => {
    document.querySelector("#tbody").innerHTML = 
    `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.phones[0].number}</td>
        <td>${user.address.street} ${user.address.additionalInfo}</td>
        <td>${user.address.zipcode}</td>
        <td>${user.address.city}</td>
    </tr>`
  })
}