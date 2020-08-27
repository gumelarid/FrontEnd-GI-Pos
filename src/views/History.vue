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
                  <strong>Rp. 1.000.000</strong>
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
                  <strong>3.270</strong>
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
                  <strong>Rp. 100.000.000.00</strong>
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
            <p class="text-left pl-5 pt-2" style=" font-size: 0.9rem;">Revenue</p>
            <div class="card-body" style="padding-top: 0;"></div>
          </div>
        </b-col>
        <b-col md="12" sm="12" cols="12" class="recent">
          <div class="recent-order">
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
                  <tr>
                    <td class="text-muted">#10928</td>
                    <td class="text-muted">Chasier 1</td>
                    <td class="text-muted">06 October 2019</td>
                    <td class="text-muted">Ice Tea, Salad With peanut sauce</td>
                    <td class="text-muted">Rp. 120.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '../components/_module/Sidebar'
export default {
  name: 'History',
  components: {
    Sidebar
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

.search {
  margin: auto;
  padding: 5px;
  text-align: right;
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
  font-size: 0.9rem;
  line-height: 20px;
  letter-spacing: 0.1em;
}

.recent-order .text-muted {
  font-size: 0.9rem;
}

@media (min-width: 767px) {
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
