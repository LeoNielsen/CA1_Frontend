const URL = "https://miemt.me/CA1/api/person/"

function getUserById(id) {
  return fetch(URL+id)
  .then(res => res.json())
}

function getAllUsers(){
  return fetch(`${URL}/all`)
  .then(res => res.json())
}

function createUser(user){
  return fetch(`${URL}/create`,{method: 'post',
  headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
  }, body: JSON.stringify(user)})
  .then(handleHttpErrors)
}


const facade = {
  getUserById,
  getAllUsers,
  createUser
}

function handleHttpErrors(res){
  if(!res.ok){throw res}
  return res.json();
}

export default facade;

