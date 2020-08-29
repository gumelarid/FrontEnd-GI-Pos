<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="12" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px;"></b-icon>
          </div>
          <div class="title">
            <p>History</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left:0; padding-right:0;">
      <b-row class="main">
        <b-col md="12">
          <div class="card-history">
            <b-col md="3" sm="12" cols="12" class="income">
              <div class="card-body">
                <p>Today's Income</p>
                <p>
                  <strong>
                    Rp.
                    {{
                      incomeDay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                  </strong>
                </p>
                <p>
                  <small class="text-muted">+2% Yesterday</small>
                </p>
              </div>
            </b-col>
            <b-col md="3" sm="12" cols="12" class="order">
              <div class="card-body">
                <p>Order</p>
                <p>
                  <strong>
                    {{
                      totalOrders
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                  </strong>
                </p>
                <p>
                  <small class="text-muted">+5% Last Week</small>
                </p>
              </div>
            </b-col>
            <b-col md="3" sm="12" cols="12" class="total-income">
              <div class="card-body">
                <p>This Year's Income</p>
                <p>
                  <strong>
                    Rp.
                    {{
                      incomeYear
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                  </strong>
                </p>
                <p>
                  <small class="text-muted">+10% Last Year</small>
                </p>
              </div>
            </b-col>
          </div>
        </b-col>
        <b-col md="12" sm="12" cols="12">
          <div class="recent-order">
            <h3 class="text-left pl-4 pt-3" style=" font-size: 1rem;">
              Revenue
            </h3>
            <div class="card-body" style="padding-top: 0;">
              <line-chart
                :data="{ '2017-01-01': 11, '2017-01-02': 6 }"
              ></line-chart>
            </div>
          </div>
        </b-col>
        <b-col md="12" sm="12" cols="12" class="recent">
          <div class="recent-order">
            <h3 class="text-left pl-4 pt-3" style=" font-size:1rem;">
              Recent Orders
            </h3>
            <div class="card-body table-responsive">
              <table class="table">
                <thead style="border-bottom: 1px solid black;">
                  <tr>
                    <th scope="col">INVOICE</th>
                    <th scope="col">CHASIER</th>
                    <th scope="col">DATE</th>
                    <th scope="col">ORDER</th>
                    <th scope="col">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in data" :key="index">
                    <td class="text-muted">#{{ value.invoice }}</td>
                    <td class="text-muted">Chasier 1</td>
                    <td class="text-muted">{{ value.date }}</td>
                    <td class="text-muted">{{ value.order }}</td>
                    <td class="text-muted">Rp. {{ value.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- pagination -->
            <b-pagination
              class="pb-2"
              v-model="page"
              :per-page="limit"
              :total-rows="totalData"
              @change="pageChange"
              v-show="showPagination"
              align="center"
              aria-controls="my-items"
            ></b-pagination>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '../components/_module/Sidebar'
export default {
  name: 'History',
  components: {
    Sidebar
  },
  data() {
    return {
      totalData: 0,
      limit: 6,
      page: 1,
      showPagination: true,
      incomeDay: 0,
      totalOrders: 0,
      incomeYear: 0,
      history: [],
      data: []
    }
  },
  created() {
    this.getHistory()
    this.getIncomeDay()
    this.getOrderWeek()
    this.getIncomeYear()
  },
  methods: {
    getIncomeDay() {
      axios
        .get('http://127.0.0.1:3001/history/income')
        .then(response => {
          this.incomeDay = response.data.data.incomeDay
        })
        .catch(error => {
          console.log(error)
        })
    },
    getOrderWeek() {
      axios
        .get('http://127.0.0.1:3001/history/count')
        .then(response => {
          this.totalOrders = response.data.data.totalOrders
        })
        .catch(error => {
          console.log(error)
        })
    },
    getIncomeYear() {
      axios
        .get('http://127.0.0.1:3001/history/total')
        .then(response => {
          this.incomeYear = response.data.data.incomeYear
        })
        .catch(error => {
          console.log(error)
        })
    },

    //  history order
    getHistory() {
      axios
        .get(
          `http://127.0.0.1:3001/history?limit=${this.limit}&page=${this.page}`
        )
        .then(response => {
          this.history = response.data.data
          this.totalData = response.data.pagination.totalData

          this.history.map(value => {
            const setData = {
              invoice: value.invoice,
              date: value.history_created_at.slice(0, 10),
              order: value.orders.map(item => item.product_name).join(', '),
              total: value.subtotal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }
            this.data = [...this.data, setData]
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    pageChange(value) {
      this.page = value
      this.data = []
      this.getHistory()
    }
  }
}
</script>

<style scoped>
.header-title {
  font-size: 1.5rem;
  padding-left: 0;
  padding-right: 0;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.title {
  padding: 5px;
  margin: auto;
  text-align: center;
  flex: 2;
}

.title p {
  font-size: 1rem;
  line-height: 25px;
  margin-bottom: 0;
}
.main {
  margin: 1px;
}

/* history */
.card-history {
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.income {
  margin: 10px;
  padding: 5px 25px;
  width: 375px;
  background: linear-gradient(
    285.38deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
  color: black;
}

.order {
  margin: 10px;
  padding: 5px 25px;
  width: 375px;
  background: linear-gradient(
    285.38deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );

  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
  color: black;
}

.total-income {
  margin: 10px;
  padding: 5px 25px;
  width: 375px;
  background: linear-gradient(
    285.38deg,
    #abb4c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );

  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
  color: black;
}

.card-history .card-body p {
  margin: 0;
  font-size: 1rem;
}

/* chart */
.chart {
  margin: 10px 5px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

/* recent order */
.recent-order {
  margin: 10px 5px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.recent-order th {
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 0.1em;
}

.recent-order .text-muted {
  font-size: 1rem;
}

@media (max-width: 767px) {
  .card-history .card-body p {
    margin: 0;
    font-size: 0.9rem;
  }
  .income {
    margin: 5px 20px;
    padding: 5px 5px;
  }

  .order {
    margin: 5px 20px;
    padding: 5px 5px;
  }

  .total-income {
    margin: 5px 20px;
    padding: 5px 5px;
  }
  .recent-order {
    margin: 5px 15px;
  }
  .recent-order th {
    font-size: 0.7rem;
    line-height: 15px;
    letter-spacing: 0.1em;
  }

  .recent-order .text-muted {
    font-size: 0.7rem;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .card-history .card-body p {
    margin: 0;
    font-size: 0.9rem;
  }
  .income {
    margin: 5px 5px;
    padding: 5px 5px;
  }

  .order {
    margin: 5px 5px;
    padding: 5px 5px;
  }

  .total-income {
    margin: 5px 5px;
    padding: 5px 5px;
  }

  .recent-order {
    margin: 10px 50px;
  }
  .revenue {
    margin: 10px 50px;
  }
  .recent-order th {
    font-size: 0.7rem;
    line-height: 15px;
    letter-spacing: 0.1em;
  }

  .recent-order .text-muted {
    font-size: 0.7rem;
  }
}
</style>
