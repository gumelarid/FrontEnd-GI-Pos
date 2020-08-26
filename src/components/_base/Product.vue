<template>
  <div>
    <b-row class="product-items">
      <b-col
        id="my-items"
        col="6"
        md="6"
        lg="4"
        class="item"
        v-for="(value, indeks) in product"
        :key="indeks"
      >
        <img
          class="card-img-top"
          src="https://picsum.photos/250/250/?image=54"
          alt="...."
          style="max-height:180px;"
        />
        <div class="item-body">
          <div class="text-item">
            <strong>{{ value.product_name }}</strong>
            <div>RP {{ value.product_price }}</div>
          </div>
          <div class="button-add">
            <b-button
              v-if="checklist"
              variant="outline-primary"
              type="button"
              @click="addToCart(value)"
            >
              <b-icon icon="cart4"></b-icon>
            </b-button>
            <b-button v-else variant="success" type="button" @click="decrement()">
              <b-icon icon="cart3"></b-icon>
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-pagination
      v-model="page"
      :per-page="limit"
      :total-rows="totalData"
      @change="pageChange"
      v-show="showPagination"
      align="center"
      aria-controls="my-items"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Product',
  data() {
    return {
      checklist: true,
      count: 0,
      totalData: 0,
      limit: 6,
      page: 1,
      showPagination: true,
      product: [],
      cart: []
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    addToCart(data) {
      const cekIndex = this.cart.findIndex(
        (value) => value.product_id === data.product_id
      )

      if (cekIndex >= 0) {
        this.cart.splice(this.cart.indexOf(cekIndex), 1)
        if (this.cart.length >= 0) {
          console.log(this.cart)
        } else {
          this.cart = []
          console.log(this.cart)
        }
      } else {
        const setCart = {
          product_id: data.product_id,
          qty: 1
        }
        this.cart.push(setCart)
        console.log(this.cart)
      }
    },
    decrement() {
      this.checklist = true
      this.$emit('decrement', -1)
    },
    check(data) {
      // check data berdasarkan id terus di some jika idnya sama maka bernilai true
      return this.cart.some((value) => value.product_id === data.product_id)
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?limit=${this.limit}&page=${this.page}`
        )
        .then((response) => {
          this.product = response.data.data[0]
          this.totalData = response.data.data[1].totalData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    pageChange(value) {
      this.page = value
      this.getProduct()
    }
  }
}
</script>

<style scoped>
/* product item */

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

.item-body {
  padding: 5px 5px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
}
.text-item {
  flex: 2;
  font-size: 0.9rem;
  /* text-align: left; */
}
.button-add {
  flex: 1;
  text-align: right;
}
.card-img-top {
  max-height: 180px;
  object-fit: cover;
}
</style>
