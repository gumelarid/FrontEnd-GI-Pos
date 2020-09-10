import axios from 'axios'
export default {
  state: {
    totalData: 0,
    limit: 6,
    page: 1,
    product: []
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
    setTotalData(state, payload) {
      state.totalData = payload
    },
    setPage(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getProduct(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product?limit=${context.state.limit}&page=${context.state.page}`
        )
        .then(response => {
          //   console.log(response)
          context.commit('setProduct', response.data.data)
          context.commit('setTotalData', response.data.pagination.totalData)
          //   this.product = response.data.data[0]
          //   this.totalData = response.data.data[1].totalData
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    setProduct(state) {
      //   console.log(state.product)
      return state.product
    },
    setTotalData(state) {
      return state.totalData
    },
    setLimit(state) {
      return state.limit
    },
    setPage(state) {
      return state.page
    }
  }
}
