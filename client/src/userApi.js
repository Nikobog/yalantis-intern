import axios from 'axios';

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
})

export const regUser = async (user) => {
    const {data} = await $host.post('/users', user)
    return data;
}

export const getUsers = async () => {
    const {data} = await $host.get('/users')
    return data;
}

export const putUsers = async (id, santafor) => {
    const {data} = await $host.put('/users', {id, santafor} )
    return data;
}