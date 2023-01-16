import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { getAllLists, newLists, deleteList, updateList, getListByID } from 'src/services/lists'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: {},
    theList: {}
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
    },
    async deleteList (id) {
      try {
        deleteList(id)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async updateList (id, params) {
      try {
        updateList(id, params)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async getListByID (id) {
      try {
        const res = await getListByID(id)
        return res.data
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  }
})
