import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import "./facade"
import facade from "./facade"

document.getElementById("all-content").style.display = "block"

document.querySelector("#searchbutton").addEventListener(`click`, () => {

  let newUserObj =
  {
    firstname: "Frank",
    lastname: "F.",
    email: "frank@freeky.com",
    phones: [
      {
        number: "55555555",
        description: "Mobil"
      }
    ],
    address: {
      street: "Herlevvej",
      additionalInfo: "5",
      city: "Herning",
      zipcode: "7400"
    },
    hobbies: [
      {
        description: "https://en.wikipedia.org/wiki/Table_football",
        name: "Bordfodbold"
      },
      {
        description: "https://en.wikipedia.org/wiki/Soccer",
        name: "Fodbold"
      }
    ]
  }



  let input = document.querySelector("#input").value;
  let seachfilter = document.querySelector("#filter").value;
  let result = facade.createUser(newUserObj);
  

  document.querySelector("#change").innerHTML = result;
})

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


/* JS For Exercise-2 below */



/* JS For Exercise-3 below */


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



