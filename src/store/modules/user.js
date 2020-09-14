import axios from 'axios'

export default {
  state: {
    user: []
  },
  mutations: {
    setTbUser(state, payload) {
      state.user = payload.data
    }
  },
  actions: {
    getUsers(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/users`)
        .then(response => {
          context.commit('setTbUser', response.data)
        })
        .catch(error => {
          console.log(error.response)
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
    changePasswords(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/changepassword/${payload.user_id}`,
            payload.form
          )
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
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
    getTbUser(state) {
      return state.user
    }
  }
}
