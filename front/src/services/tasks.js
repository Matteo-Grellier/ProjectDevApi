import { api } from 'boot/axios'

export const getTaskId = (id) => { return api.get(`/tasks/lists/${id}`) }
export const deleteTask = (id) => { return api.delete(`/tasks/${id}`) }
export const UpdateTask = (id, params) => { return api.put(`/tasks/${id}`, params) }
export const AddTask = (params) => { return api.post(`/tasks`, params) }
