<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="8" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px"></b-icon>
          </div>
          <div class="title">
            <p>Food Items</p>
          </div>
        </b-col>
        <b-col md="4" class="cart">
          <p>
            Cart
            <b-badge pill variant="primary">{{ cart.length }}</b-badge>
          </p>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left: 0; padding-right: 0">
      <b-row class="main">
        <b-col md="8" class="items">
          <b-form class="m-3" inline @submit.prevent="search">
            <b-input
              type="search"
              placeholder="Search Product ....."
              v-model="searchKeyword"
            ></b-input>
            <b-button variant="info" type="submit" class="ml-md-2"
              >Search</b-button
            >
            <b-dropdown id="sort" class="m-2" variant="info" text="Sort">
              <b-dropdown-group id="dropdown-group-1" header="Product Name">
                <b-dropdown-item-button @click="sortNameASC()"
                  >A-Z</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sortNameDESC()"
                  >Z-A</b-dropdown-item-button
                >
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-2" header="Date">
                <b-dropdown-item-button @click="sortDateASC()"
                  >Old Product</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sortDateDESC()"
                  >New Product</b-dropdown-item-button
                >
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-3" header="Price">
                <b-dropdown-item-button @click="sortPriceASC()"
                  >Lowest Price</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sortPriceDESC()"
                  >Highest Price</b-dropdown-item-button
                >
              </b-dropdown-group>
            </b-dropdown>
          </b-form>
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
                :src="url + '/' + value.product_image"
                alt="...."
                style="max-height: 180px"
              />
              <div class="item-body">
                <div class="text-item">
                  <strong>{{ value.product_name }}</strong>
                  <div>
                    RP
                    {{
                      value.product_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                  </div>
                </div>
                <div class="button-add">
                  <b-button
                    variant="outline-primary"
                    v-if="!checkList(value)"
                    type="button"
                    @click="addToCart(value)"
                  >
                    <span>
                      Add Cart
                      <b-icon icon="cart4"></b-icon>
                    </span>
                  </b-button>
                  <b-button
                    v-else
                    variant="success"
                    type="button"
                    @click="removeFromCart(value)"
                  >
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
            v-model="currentPage"
            :per-page="limit"
            :total-rows="totalData"
            @change="pageChange"
            v-show="showPagination"
            align="center"
            aria-controls="my-items"
          ></b-pagination>
          <!-- end productlist -->
        </b-col>
        <b-col md="4" class="cart-item">
          <div v-if="cart.length <= 0">
            <img
              class="cart-img"
              src="../assets/img/icon/cart.png"
              alt="...."
            />
            <div class="cart-body">
              <h2>
                <strong>Your Cart is Empty</strong>
              </h2>
              <span class="text">Please add some items from the menu</span>
            </div>
          </div>
          <div v-else>
            <Cart />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Cart from '../components/_base/Cart'
import Sidebar from '../components/_module/Sidebar'
export default {
  title: 'Dashboard - GI POS',
  name: 'Home',
  components: {
    Sidebar,
    Cart
  },
  data() {
    return {
      alert: false,
      searchKeyword: '',
      showPagination: true,
      currentPage: 1,
      form: {},
      productsSearch: [],
      url: process.env.VUE_APP_URL
    }
  },
  created() {
    this.getProducts()
  },
  computed: {
    ...mapGetters({
      product: 'getProductData',
      limit: 'getLimit',
      totalData: 'getTotalData',
      cart: 'getCart'
    })
  },
  methods: {
    ...mapMutations([
      'changePage',
      'addToCart',
      'removeFromCart',
      'setProduct',
      'sortProduct'
    ]),
    ...mapActions(['getProducts', 'searchProduct']),

    pageChange(data) {
      this.changePage(data)
      this.getProducts()
    },
    checkList(data) {
      return this.cart.some((value) => value.product_id === data.product_id)
    },
    search() {
      if (this.searchKeyword === '') {
        this.getProducts()
        this.showPagination = true
      } else {
        this.showPagination = false
        this.$router.push(`?keyword=${this.searchKeyword}`)
        this.searchProduct(this.searchKeyword)
          .then(response => {
            console.log(response)
          }).catch(error => {
            this.getProducts()
            this.makeToast('danger', 'Not Found', error.data.msg)
            console.log(error.data.msg)
          })
      }
    },
    sortNameASC() {
      const data = {
        sortBy: 'product_name',
        sort: 'ASC',
        page: 1
      }
      this.sortProduct(data)
      this.getProducts()
      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)
    },
    sortNameDESC() {
      const data = {
        sortBy: 'product_name',
        sort: 'desc',
        page: 1
      }
      this.sortProduct(data)
      this.getProducts()
      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)
    },
    sortPriceASC() {
      const data = {
        sortBy: 'product_price',
        sort: 'ASC',
        page: 1
      }
      this.sortProduct(data)
      this.getProducts()
      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)
    },
    sortPriceDESC() {
      const data = {
        sortBy: 'product_price',
        sort: 'desc',
        page: 1
      }
      this.sortProduct(data)
      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)
      this.getProducts()
    },
    sortDateASC() {
      const data = {
        sortBy: 'product_created_at',
        sort: 'ASC',
        page: 1
      }
      this.sortProduct(data)

      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)

      this.getProducts()
    },
    sortDateDESC() {
      const data = {
        sortBy: 'product_created_at',
        sort: 'desc',
        page: 1
      }
      this.sortProduct(data)
      this.$router.push(`?orderBy=${data.sortBy}?sort=${data.sort}`)
      this.getProducts()
    },

    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
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
