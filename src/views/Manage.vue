<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="12" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px;"></b-icon>
          </div>
          <div class="title">
            <p>manage</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left:0; padding-right:0;">
      <b-row class="main">
        <b-col md="12" class="items">
          <h4>All Product</h4>
          <b-container>
            <b-table
              id="table-transition-example"
              :items="items"
              :fields="fields"
              striped
              small
              primary-key="a"
              :tbody-transition-props="transProps"
            >
              <template v-slot:cell(actions)>
                <b-button size="sm" class="mr-1">Update</b-button>
                <b-button size="sm" class="mr-1">Delete</b-button>
              </template>
            </b-table>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '../components/_module/Sidebar'

export default {
  name: 'manage',
  components: {
    Sidebar
  },
  data() {
    return {
      total_data: 0,
      perPage: 7,
      currentPage: 2,
      items: [],
      fields: [
        { key: 'product_name', sortable: true },
        { key: 'category_name', sortable: true },
        { key: 'product_price', sortable: true },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  computed: {
    rows() {
      return this.total_data
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?limit=${this.perPage}?page=${this.currentPage}`
        )
        .then((response) => {
          this.items = response.data.data[0]
          this.total_data = response.data.data[1].totalData
          console.log(response.data.data[1].totalData)
        })
        .catch((error) => {
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
/* product item */
.main {
  margin: 1px;
}

.main .items {
  text-align: center;
  padding: 20px 5px;
  font-size: 0.9rem;
}

.main .product-items {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 5px 2px;
}
</style>
