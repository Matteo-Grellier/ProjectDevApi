import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { getAllLists, newLists } from 'src/services/lists'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: {},
  }),
  actions: {
    async getAllLists () {
      try {
        const res = await getAllLists()
        return res.data
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async newLists (params) {
      try {
        newLists(params)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  }
})
