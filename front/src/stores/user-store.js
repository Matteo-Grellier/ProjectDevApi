import { defineStore } from 'pinia'
import { LocalStorage, SessionStorage } from 'quasar'
import { register, login, getUserProfile } from 'src/services/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  getters: {
  },

  actions: {
    getJwtToken () {
      return LocalStorage.getItem('token') || SessionStorage.getItem('token')
    },

    async handleRegister (params) {
      try {
        const res = await register(params)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async handleLogin (params) {
      try {
        const res = await login(params)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async getUserProfile () {
      try {
        const res = await getUserProfile()
        return { email: res.data.email, id: res.data._id }
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  },
}
)
