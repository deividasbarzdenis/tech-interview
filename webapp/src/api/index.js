import axios from "axios"

const HTTP = axios.create({
    baseURL: '/api/1.0'
})

export { HTTP as default }
