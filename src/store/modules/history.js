import axios from 'axios'
export default {
  state: {
    incomeDay: 0,
    totalOrder: 0,
    incomeYear: 0,
    chartOrder: [],
    totalData: null,
    limit: 6,
    page: 1,
    history: []
  },
  mutations: {
    setIncomeDay(state, payload) {
      //   console.log(payload)
      state.incomeDay = payload
    },
    setTotalOrder(state, payload) {
      state.totalOrder = payload
    },
    setIncomeYear(state, payload) {
      state.incomeYear = payload
    },
    setChartWeek(state, payload) {
      // console.log(payload)
      state.chartOrder = payload
    },
    setHistory(state, payload) {
      state.history = payload.data
      state.totalData = payload.pagination.totalData
    },
    changePageHistory(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getIncomeDays(Context) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/income`)
        .then(response => {
          //   console.log(response)
          Context.commit('setIncomeDay', response.data.data.incomeDay)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOrderWeek(context) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/count`)
        .then(response => {
          //   console.log(response)
          context.commit('setTotalOrder', response.data.data.totalOrders)
          //   this.totalOrder = response.data.data.totalOrder
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIncomeYears(context) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/total`)
        .then(response => {
          context.commit('setIncomeYear', response.data.data.incomeYear)
          // this.incomeYear = response.data.data.incomeYear
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChartOrderWeeks(context) {
      axios
        .get(`${process.env.VUE_APP_URL}/history/chart`)
        .then(response => {
          // console.log(response)
          const setData = response.data.data
          var chart = []
          for (let i = 0; i < setData.length; i++) {
            chart.push([setData[i].date, setData[i].sum])
          }
          context.commit('setChartWeek', chart)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistorys(context) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/history?limit=${context.state.limit}&page=${context.state.page}`
        )
        .then(response => {
          console.log(response.data)
          // const history = response.data
          // console.log(response)
          context.commit('setHistory', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    getIncomeDay(state) {
      return state.incomeDay
    },
    getTotalOrder(state) {
      // console.log(state.TotalOrder)
      return state.totalOrder
    },
    getIncomeYear(state) {
      // console.log(state.TotalOrder)
      return state.incomeYear
    },
    getChartOrderWeek(state) {
      return state.chartOrder
    },
    getHistory(state) {
      // return state.history
      let dataHistory = []
      state.history.map(value => {
        const setData = {
          invoice: value.invoice,
          user_name: value.user_name,
          date: value.history_created_at.slice(0, 10),
          order: value.orders.map(item => item.product_name).join(', '),
          total: value.subtotal
        }
        // this.showPagination = false
        dataHistory = [...dataHistory, setData]
      })
      return dataHistory
    },
    getTotalDataHistory(state) {
      return state.totalData
    },
    getLimitHistory(state) {
      return state.limit
    },
    getPageHistory(state) {
      console.log(state.page)
      return state.page
    }
  }
}
