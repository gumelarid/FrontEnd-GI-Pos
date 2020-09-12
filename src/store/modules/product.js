import axios from 'axios'
export default {
  state: {
    count: 0,
    cart: [],
    sort: '',
    totalData: null,
    limit: 6,
    page: 1,
    product: [],
    invoice: ''
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
    },
    setInvoice(state, payload) {
      state.invoice = payload
    },
    cancelOrder(state) {
      state.cart = []
    }
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
            console.log(error.response)
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
    },
    orderPost(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/order`, payload)
          .then(response => {
            context.commit('setInvoice', response.data.data.invoice)
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
    getInvoice(state, payload) {
      return state.invoice
    },

    totalPrice(state) {
      let priceTotal = 0
      for (let i = 0; i < state.cart.length; i++) {
        priceTotal += state.cart[i].product_price * state.cart[i].qty
      }
      return priceTotal
    }
  }
}
