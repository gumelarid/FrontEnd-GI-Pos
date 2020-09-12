import axios from 'axios'
export default {
  state: {
    count: 0,
    cart: [],
    sort: '',
    totalData: null,
    limit: 6,
    page: 1,
    product: []
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload.data
      state.totalData = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    },
    addToCart(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_image: payload.product_image,
        product_price: payload.product_price,
        qty: 1
      }
      state.cart = [...state.cart, setCart]
    },
    removeFromCart(state, payload) {
      // console.log(payload)
      state.cart.splice(
        state.cart.findIndex(value => value.product_id === payload.product_id),
        1
      )
    },
    incrementCart(state, payload) {
      // console.log(state)
      // console.log(payload)
      const cekData = state.cart.findIndex(
        value => value.product_id === payload.product_id
      )
      state.cart[cekData].qty += 1
    },
    decrementCart(state, payload) {
      const cekData = state.cart.findIndex(
        value => value.product_id === payload.product_id
      )
      state.cart[cekData].qty -= 1
    }
    // incrementCart(state, payload) {
    //   const incrementData = state.cart.find(
    //     value => value.product_id === payload.product_id
    //   )
    //   incrementData.product_qty += 1
    //   incrementData.product_total = payload.product_price * payload.product_qty
    // }
  },
  actions: {
    getProducts(context) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product?limit=${context.state.limit}&page=${context.state.page}`
        )
        .then(response => {
          // //   console.log(response)
          context.commit('setProduct', response.data)
          // context.commit('setTotalData', response.data.pagination.totalData)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/product`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/product/${payload.product_id}`,
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
    deleteProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/product/${payload}`)
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
    getProduct(state) {
      return state.product
    },
    getTotalData(state) {
      return state.totalData
    },
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    },
    getCart(state) {
      return state.cart
    },
    getTotalCart(state) {
      let total = 0
      state.cart.map(
        value => (total += value.product_price * value.product_qty)
      )
      return total
    }
  }
}
