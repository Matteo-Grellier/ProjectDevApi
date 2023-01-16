import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { getTaskId } from 'src/services/tasks'

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
    }
  }
})
