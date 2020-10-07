import axios from 'axios'

export default {
  state: {
    userData: []
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload.data
    }
  },
  actions: {
    getUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users`)
          .then(response => {
            context.commit('setUserData', response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchUsers(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchPasswords(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/changepassword/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/users/${payload}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    }
  }
}
