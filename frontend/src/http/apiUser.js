import axios from 'axios'

const API_URL = 'http://localhost:8000'

const url = axios.create({
    baseURL: API_URL + '/api'
})

export const loginUser = async (email, password) => {
    const {data} = await url.post('/login/', {email, password})
    return data
}

export const authUser = async (token) => {
    const {data} = await url.post('/user/me/', {token})
    return data
}