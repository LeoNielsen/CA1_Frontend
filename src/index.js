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

/*  create User*/
document.querySelector("#create-btn").addEventListener(`click`, () => {
  const newUser = {
    firstname: document.querySelector("#create-firstname-input").value,
    lastname: document.querySelector("#create-lastname-input").value,
    email: document.querySelector("#create-email-input").value,
    phones: [{
    number: document.querySelector("#create-number-input").value,
    description: document.querySelector("#create-phonedescription-input").value}],
    address: {
      street: document.querySelector("#create-street-input").value,
      additionalInfo: document.querySelector("#create-additionainfo-input").value,
      city: document.querySelector("#create-city-input").value,
      zipcode: document.querySelector("#create-zipcode-input").value
    },
    hobbies: [
      {
        name: document.querySelector("#create-hobby-input").value,
        description: document.querySelector("#create-hobbydescription-input").value
      }
    ]
  }

  facade.createUser(newUser).then( user => {
    displayGoodMessage("Brugeren blev oprettet og fik ID: " + user.id)
    document.querySelector("#create-firstname-input").value = "";
    document.querySelector("#create-lastname-input").value = "";
    document.querySelector("#create-email-input").value = "";
    document.querySelector("#create-number-input").value = "";
    document.querySelector("#create-street-input").value = "";
    document.querySelector("#create-additionainfo-input").value = "";
    document.querySelector("#create-city-input").value = "";
    document.querySelector("#create-zipcode-input").value = "";
    document.querySelector("#create-hobby-input").value = "";
    document.querySelector("#create-hobbydescription-input").value = "";
  })

})

/* edit user*/
document.querySelector("#save-edit-btn").addEventListener(`click`, () => {
  const editUser = {
    id: document.querySelector("#edit-id").value,
    firstname: document.querySelector("#edit-firstname").value,
    lastname: document.querySelector("#edit-lastname").value,
    email: document.querySelector("#edit-email").value,
    phones: [{
    number: document.querySelector("#edit-number").value,
    description: document.querySelector("#edit-phonedescription").value}],
    address: {
      street: document.querySelector("#edit-street").value,
      additionalInfo: document.querySelector("#edit-addtionalinfo").value,
      city: document.querySelector("#edit-city").value,
      zipcode: document.querySelector("#edit-zipcode").value
    },
    hobbies: [
      {
        name: document.querySelector("#edit-hobby").value,
        description: document.querySelector("#edit-hobbydescription").value
      }
    ]
  }

  facade.editUser(editUser).then( user => {
    document.querySelector("#edit-id").value = "";
    document.querySelector("#edit-firstname").value = "";
    document.querySelector("#edit-lastname").value = "";
    document.querySelector("#edit-email").value = "";
    document.querySelector("#edit-number").value = "";
    document.querySelector("#edit-street").value = "";
    document.querySelector("#edit-addtionalinfo").value = "";
    document.querySelector("#edit-city").value = "";
    document.querySelector("#edit-zipcode").value = "";
    document.querySelector("#edit-hobby").value = "";
    document.querySelector("#edit-hobbydescription").value = "";
  })
})


