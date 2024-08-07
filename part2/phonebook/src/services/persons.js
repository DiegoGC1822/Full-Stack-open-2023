import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPersons => {
  const request = axios.post(baseUrl, newPersons)
  return request.then(response => response.data)
}

const update = (id, newPersons) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersons)
  return request.then(response => response.data)
}

const eliminate = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update,
  eliminate
}