<template>
  <div>
    <b-input-group style="margin:auto">
      <!-- search -->
      <b-nav-form v-on:submit.prevent="searchProduct">
        <b-form-input v-model="keyword" class="mr-sm-2" placeholder="Search Product......."></b-form-input>
        <b-button variant="primary" class="my-2 my-sm-0" type="submit">
          <b-icon icon="search"></b-icon>
        </b-button>
      </b-nav-form>

      <!-- sort -->
      <b-dropdown id="sort" text="Sort" class="m-2" variant="outline-primary">
        <b-dropdown-item-button>Category</b-dropdown-item-button>
        <b-dropdown-group id="dropdown-group-2" header="Date">
          <b-dropdown-item-button>Oldest</b-dropdown-item-button>
          <b-dropdown-item-button>Newest</b-dropdown-item-button>
        </b-dropdown-group>
        <b-dropdown-group id="dropdown-group-3" header="Price">
          <b-dropdown-item-button>Lowest</b-dropdown-item-button>
          <b-dropdown-item-button>Highest</b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
      <b-dropdown id="sort" text="Name" class="m-2" variant="outline-primary">
        <b-dropdown-group id="dropdown-group-1" header="Name">
          <b-dropdown-item-button>A-Z</b-dropdown-item-button>
          <b-dropdown-item-button>Z-A</b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
    </b-input-group>

    <div v-if="(showPagination === false)" class="text-center text-item">{{ dataFound }}</div>

    <!-- product -->
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

    <!-- pagination -->
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
      showPagination: '',
      product: [],
      cart: [],
      keyword: '',
      dataFound: 0
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    // add cart
    addToCart(data) {
      const cekIndex = this.cart.findIndex(
        (value) => value.product_id === data.product_id
      )
      console.log(cekIndex)

      if (cekIndex >= 0) {
        this.cart.splice(this.cart.indexOf(cekIndex), 1)
        console.log(this.cart)
        // if (this.cart.length >= 0) {
        //   this.cart
        // } else {
        //   this.cart = []
        // }
      } else {
        const setCart = {
          product_id: data.product_id,
          product_name: data.product_name,
          product_price: data.product_price,
          qty: 1
        }
        this.cart.push(setCart)
      }
      this.$emit('itemCart', this.cart)
    },
    // get product
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?limit=${this.limit}&page=${this.page}`
        )
        .then((response) => {
          this.showPagination = true
          this.product = response.data.data[0]
          this.totalData = response.data.data[1].totalData
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // search
    searchProduct() {
      if (!this.keyword.length <= 0) {
        axios
          .get(`http://127.0.0.1:3001/product/search?keyword=${this.keyword}`)
          .then((response) => {
            console.log(this.keyword)
            this.showPagination = false
            this.product = response.data.data[0]
            this.dataFound = response.data.msg
            this.keyword = ''
          })
      } else {
        this.getProduct()
      }
    },

    // pagination
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
