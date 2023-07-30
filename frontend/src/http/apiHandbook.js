import axios from 'axios'

const API_URL = 'http://localhost:8000'

const url = axios.create({
    baseURL: API_URL + '/api'
})

export const getHandbook = async (typeHandbook) => {
    const {data} = await url.get(`/handbook/${typeHandbook}/`)
    return data
}