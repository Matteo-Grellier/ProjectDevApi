import { api } from 'boot/axios'

export const getAllLists = () => { return api.get('/lists') }
export const newLists = (params) => { return api.post('/lists', params) }
