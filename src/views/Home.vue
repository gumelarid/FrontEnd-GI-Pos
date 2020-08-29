<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="8" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px;"></b-icon>
          </div>
          <div class="title">
            <p>Food Items</p>
          </div>
        </b-col>
        <b-col md="4" class="cart">
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
        <b-col md="8" class="items">
          <Product :clearCart="reset" @itemCart="cart" />
        </b-col>
        <b-col md="4" class="cart-item">
          <div v-if="count <= 0">
            <img class="cart-img" src="../assets/img/icon/cart.png" alt="...." />
            <div class="cart-body">
              <h2>
                <strong>Your Cart is Empty</strong>
              </h2>
              <span class="text">Please add some items from the menu</span>
            </div>
          </div>
          <div v-else>
            <Cart :itemCart="order" @clearCart="clearCart" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Cart from '../components/_base/Cart'
import Product from '../components/_base/Product'
import Sidebar from '../components/_module/Sidebar'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Product,
    Cart
  },

  data() {
    return {
      reset: '',
      count: 0,
      order: []
    }
  },
  methods: {
    cart(data) {
      this.order = data
      this.count = this.order.length
    },
    clearCart() {
      this.order = []
      this.count = 0
      this.reset = true
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

.list {
  margin: auto;
  padding: 5px;
  text-align: right;
}

.cart {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  padding: 5px;
}

.cart p {
  font-size: 1rem;
  padding-top: 4px;
  margin-bottom: 0;
}

/* cart */
.cart-item {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  /* padding: 25px 10px; */
}

.cart-img {
  margin-top: 20px;
  width: 60%;
}

.cart-body {
  margin-top: 0px;
}

.cart-body h2 {
  font-size: 1.2rem;
  line-height: 39px;
  color: #000000;
}

span.text {
  font-size: 0.9rem;
  line-height: 26px;
}
</style>
