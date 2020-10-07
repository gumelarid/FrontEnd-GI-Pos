<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="12" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px"></b-icon>
          </div>
          <div class="title">
            <p>History</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left: 0; padding-right: 0">
      <b-row class="main">
        <CardHistory />

        <Chart />
        <TbHistory />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '../components/_module/Sidebar'
import CardHistory from '../components/_base/CardHistory'
import Chart from '../components/_base/Chart'
import TbHistory from '../components/_base/TbHistory'
export default {
  title: 'History - GI POS',
  name: 'History',
  components: {
    Sidebar,
    CardHistory,
    Chart,
    TbHistory
  }
}
</script>

<style>
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
