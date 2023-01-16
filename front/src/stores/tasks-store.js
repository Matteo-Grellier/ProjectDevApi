import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { getTaskId, AddTask, UpdateTask, deleteTask } from 'src/services/tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {}
  }),
  actions: {
    async getTaskId (id) {
      try {
        const res = await getTaskId(id)
        return res.data
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async AddTask (params) {
      try {
        await AddTask(params)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async UpdateTask (id, params) {
      try {
        await UpdateTask(id, params)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async deleteTask (id) {
      try {
        await deleteTask(id)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  }
})
