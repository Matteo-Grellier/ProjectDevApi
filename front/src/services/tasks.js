import { api } from 'boot/axios'

export const getTaskId = (id) => { return api.get(`/tasks/lists/${id}`) }
