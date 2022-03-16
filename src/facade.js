const URL = "https://miemt.me/CA1/api/person/"

function getUserById(id) {
  return fetch(`${URL}${id}`)
  .then(res => res.json())
}

function getAllUsers(){
  return fetch(`${URL}/all`)
  .then(res => res.json())
}

function getUsersByHobby(hobby){
  return fetch(`${URL}hobby/${hobby}`)
  .then(res => res.json())
}

function getUsersByZipcode(zipcode){
  return fetch(`${URL}zipcode/${zipcode}`)
  .then(res => res.json())
}

function getUserByPhone(phone){
  return fetch(`${URL}phone/${phone}`)
  .then(res => res.json())
}

function deleteUserById(userId){
  return fetch(`${URL}delete/${userId}`, {method: 'delete'})
  .then(res => res.json())
}

function createUser(user){
  return fetch(`${URL}create`, requestOpt(user, 'post'))
  .then(handleHttpErrors)
}

function editUser(user){
  return fetch(`${URL}edit/${user.id}`, requestOpt(user, 'put'))
  .then(res => res.json())
}

const facade = {
  getUserById,
  getAllUsers,
  getUsersByHobby,
  getUsersByZipcode,
  getUserByPhone,
  deleteUserById,
  createUser,
  editUser
}

function requestOpt(body, method) {
  return {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'},
    body: JSON.stringify(body)}
}

function handleHttpErrors(res){
  if(!res.ok){throw res}
  return res.json();
}

export default facade;

