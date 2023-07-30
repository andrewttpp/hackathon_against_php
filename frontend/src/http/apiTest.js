import axios from 'axios'

const API_URL = 'http://localhost:8000'

const url = axios.create({
    baseURL: API_URL + '/api'
})

export const create = async (test) => {
    const {data} = await url.post('/test/create/', test)
    return data
}

export const get = async (id) => {
    const {data} = await url.get(`/test/${id}/`)
    return data
}