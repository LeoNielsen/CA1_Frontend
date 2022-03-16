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
      getUserByName(input);
      break;
    case "Phone number":
      getUserByPhone(input);
      break;
    case "Email":
      getUserByEmail(input);
      break;
    case "City":
      getUserByCity(input);
      break;
    case "Zipcode":
      getUserByZipcode(input);
      break;
    case "Street":
      getUserByStreet(input);
      break;
    case "Hobby":
      getUserByHobby(input);
      break;
  }
});

function getUserById(input){
  facade.getUserById(input)
  .then(user => {
    tableBuilder(user);
  })
}

function getUserByName(input){
  facade.getAllUsers()
  .then(users => {
    users.filter(function(user){
      if(user.firstname.toLowerCase().includes(input.toLowerCase()) || user.lastname.toLowerCase().includes(input.toLowerCase())){
        return user;
      }
    }).forEach(user => {
      tableBuilder(user)  
    });
  })
}

function getUserByPhone(input){
  console.log(facade.getUserByPhone(input))
  facade.getUserByPhone(input)
  .then(user => {
    tableBuilder(user);
  })
}

function getUserByEmail(input){
  facade.getAllUsers()
  .then(users => {
    users.filter(function(user){
      if(user.email.toLowerCase().includes(input.toLowerCase())){
        return user;
      }
    }).forEach(user => {
      tableBuilder(user)  
    });
  })
}

function getUserByCity(input){
  facade.getAllUsers()
  .then(users => {
    users.filter(function(user){
      if(user.address.city.toLowerCase().includes(input.toLowerCase())){
        return user;
      }
    }).forEach(user => {
      tableBuilder(user)  
    });
  })
}

function getUserByZipcode(input){
  facade.getUsersByZipcode(input)
  .then(users => {
    users.forEach(user => {
      tableBuilder(user)
    })
  })
}

function getUserByStreet(input){
  facade.getAllUsers()
  .then(users => {
    users.filter(function(user){
      const street = `${user.address.street} ${user.address.additionalInfo}`;
      if(street.toLowerCase().includes(input.toLowerCase())){
        return user;
      }
    }).forEach(user => {
      tableBuilder(user)  
    });
  })
}

function getUserByHobby(input){
  facade.getUsersByHobby(input)
  .then(users => { 
    users.forEach( user => {
        tableBuilder(user);
    })
  })
}



/* Helpers */
function tableBuilder(user){
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
}