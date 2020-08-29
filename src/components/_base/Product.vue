<template>
  <div>
    <b-input-group class="mb-3 mt-2">
      <b-input-group class="mb-2">
        <b-form-input v-model="keyword" placeholder="Search Product......." class="form-control"></b-form-input>
        <b-input-group-append>
          <b-button @click="searchProduct()" variant="info" type="submit">
            <span>Search</span>
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <!-- sort -->
      <b-dropdown id="sort" text="Product Name" class="m-2" variant="outline-primary">
        <b-dropdown-group id="dropdown-group-1" header="Product Name">
          <b-dropdown-item-button @click="sortNameASC()">A-Z</b-dropdown-item-button>
          <b-dropdown-item-button @click="sortNameDESC()">Z-A</b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
      <b-dropdown id="sort" text="Price" class="m-2" variant="outline-primary">
        <b-dropdown-group id="dropdown-group-1" header="Price">
          <b-dropdown-item-button @click="sortPriceASC()">Lowest Price</b-dropdown-item-button>
          <b-dropdown-item-button @click="sortPriceDESC()">Highest Price</b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
      <b-dropdown id="sort" text="Date" class="m-2" variant="outline-primary">
        <b-dropdown-group id="dropdown-group-1" header="Date">
          <b-dropdown-item-button @click="sortDateASC()">Old Product</b-dropdown-item-button>
          <b-dropdown-item-button @click="sortDateDESC()">New Product</b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
    </b-input-group>

    <!-- search -->

    <div v-if="(!dataFound == 0)" class="text-center text-item">{{ dataFound }}</div>

    <!-- product -->
    <b-row class="product-items">
      <b-col
        id="my-items"
        cols="6"
        md="6"
        lg="4"
        class="item"
        v-for="(value, indeks) in product"
        :key="indeks"
      >
        <img
          class="card-img-top"
          src="@/assets/img/product/bear.png"
          alt="...."
          style="max-height:180px;"
        />
        <div class="item-body">
          <div class="text-item">
            <strong>{{ value.product_name }}</strong>
            <div>
              RP {{ value.product_price.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
            </div>
          </div>
          <div class="button-add">
            <b-button
              v-if="!checkList(value)"
              variant="outline-primary"
              type="button"
              @click="addToCart(value)"
            >
              <span>
                Add Cart
                <b-icon icon="cart4"></b-icon>
              </span>
            </b-button>
            <b-button v-else variant="success" type="button" @click="removeFromCart(value)">
              <span>
                Remove
                <b-icon icon="cart3"></b-icon>
              </span>
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
  props: ['clearCart'],
  data() {
    return {
      sortBy: 'product_name',
      sort: 'ASC',
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
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        qty: 1
      }
      this.cart.push(setCart)
      this.$emit('itemCart', this.cart)
    },
    // remove cart
    removeFromCart(data) {
      this.cart.splice(
        this.cart.findIndex((value) => value.product_id === data.product_id),
        1
      )
      this.$emit('itemCart', this.cart)
    },
    // get product
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?limit=${this.limit}&page=${this.page}&name=${this.sortBy}&sort=${this.sort}`
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
      if (this.keyword === '') {
        this.getProduct()
        this.$router.push('')
        this.dataFound = 0
        this.showPagination = true
      } else {
        axios
          .get(`http://127.0.0.1:3001/product/search?keyword=${this.keyword}`)
          .then((response) => {
            this.showPagination = false
            this.product = response.data.data[0]
            this.dataFound = response.data.msg
            this.$router.push(`?keyword=${this.keyword}`)
          })
          .catch((error) => {
            if (error) {
              this.dataFound = 'Sorry Data Not Found'
              this.getProduct()
              this.$router.push(`?keyword=${this.keyword}`)
              this.showPagination = false
            }
          })
      }
    },

    // sort
    // sort by name
    sortNameASC() {
      this.sortBy = 'product_name'
      this.sort = 'ASC'
      this.$router.push(`?orderBy=${this.sortBy}`)
      this.page = 1
      this.getProduct()
    },
    sortNameDESC() {
      this.sortBy = 'product_name'
      this.sort = 'DESC'
      this.$router.push(`?orderBy=${this.sortBy}`)
      this.page = 1
      this.getProduct()
    },
    // price
    sortPriceASC() {
      this.sortBy = 'product_price'
      this.sort = 'ASC'
      this.page = 1
      this.getProduct()
    },
    sortPriceDESC() {
      this.sortBy = 'product_price'
      this.sort = 'DESC'
      this.$router.push(`?orderBy=${this.sortBy}`)
      this.page = 1
      this.getProduct()
    },
    // date
    sortDateASC() {
      this.sortBy = 'product_created_at'
      this.sort = 'ASC'
      this.$router.push(`?orderBy=${this.sortBy}`)
      this.page = 1
      this.getProduct()
    },
    sortDateDESC() {
      this.sortBy = 'product_created_at'
      this.sort = 'DESC'
      this.$router.push(`?orderBy=${this.sortBy}`)
      this.page = 1
      this.getProduct()
    },

    // pagination
    pageChange(value) {
      this.page = value
      this.$router.push(`?page=${value}`)
      this.getProduct()
    },
    checkList(data) {
      return this.cart.some((value) => value.product_id === data.product_id)
    }
  }
}
</script>

<style scoped >
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
}
.text-item {
  font-size: 0.9rem;
}
.button-add {
  text-align: center;
}
.card-img-top {
  max-height: 180px;
  object-fit: cover;
}
@media (max-width: 500px) {
  .text-item {
    font-size: 0.7rem;
  }
  .button-add span {
    font-size: 0.7rem;
  }
}
@media (min-width: 1000px) and (max-width: 1024px) {
  .text-item {
    font-size: 0.7rem;
  }
  .button-add span {
    font-size: 0.7rem;
  }
}
</style>
