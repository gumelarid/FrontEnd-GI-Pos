<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="9" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px;"></b-icon>
          </div>
          <div class="title">
            <p>Food Items</p>
          </div>
          <div class="search">
            <a class="search-btn" href>
              <b-icon icon="search" style="width: 26px; height: 26px;"></b-icon>
            </a>
          </div>
        </b-col>
        <b-col md="3" class="cart">
          <p>
            Cart
            <b-badge pill variant="primary">{{ count }}</b-badge>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left:0; padding-right:0;">
      <b-row class="main">
        <b-col md="9" class="items">
          <b-row class="product-items">
            <b-col
              col="6"
              md="6"
              lg="4"
              class="item"
              v-for="(value, index) in product"
              :key="index"
            >
              <Product
                @increment="IncrementCount"
                v-bind:name="value.product_name"
                v-bind:price="value.product_price"
              />
            </b-col>
          </b-row>
          <Pagination v-bind:currentPage="currentPage" v-bind:rows="rows" />
        </b-col>
        <b-col md="3" class="cart-item">
          <img class="cart-img" src="../assets/img/icon/cart.png" alt="...." />
          <div class="cart-body">
            <h2>
              <strong>Your Cart is Empty</strong>
            </h2>
            <span class="text">Please add some items from the menu</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Product from '../components/_base/Product'
import Pagination from '../components/_base/Pagination'
import Sidebar from '../components/_module/Sidebar'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Product,
    Pagination
  },
  data() {
    return {
      count: 0,
      limit: 6,
      product: [],
      currentPage: 0,
      rows: 60
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    IncrementCount(data) {
      this.count += data
    },
    getProduct() {
      axios
        .get(`http://127.0.0.1:3001/product?limit=${this.limit}`)
        .then(response => {
          this.product = response.data.data[0]
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.header-title {
  padding-left: 0;
  padding-right: 0;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.list {
  margin: auto;
  padding: 5px;
  text-align: right;
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
  line-height: 25px;
  margin-bottom: 0;
}

.cart {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  padding: 5px;
}

.cart p {
  padding-top: 4px;
  margin-bottom: 0;
}

/* product item */
.main {
  margin: 1px;
}

.main .product-items .item {
  background-color: none;
  margin: 10px 0;
}

.main .product-items {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 5px 2px;
}

/* cart */
.cart-item {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  /* height: 800px; */
}

.cart-img {
  margin-top: 20px;
  width: 60%;
}

.cart-body {
  margin-top: -50px;
}

.cart-body h2 {
  font-size: 25px;
  line-height: 39px;
  color: #000000;
}

span.text-muted {
  font-size: 20px;
  line-height: 26px;
}
</style>
