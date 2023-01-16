import { api } from 'boot/axios'

export const getAllLists = () => { return api.get('/lists') }
export const newLists = (params) => { return api.post('/lists', params) }
export const deleteList = (id) => { console.log(id); return api.delete(`/lists/${id}`) }
export const updateList = (id, params) => { return api.put(`/lists/${id}`, params) }
export const getListByID = (id) => { return api.get(`/lists/${id}`) }
