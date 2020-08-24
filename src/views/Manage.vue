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
        <b-col md="12">
          <b-container>
            <h3 class="items">All Product</h3>
            <b-button v-b-modal.modal-add>Add Product</b-button>
            <hr />
            <b-table
              class="items"
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
          <b-modal id="modal-add" ref="modal-add" centered title="BootstrapVue" hide-footer>
            <form @submit.prevent="addProduct">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    v-model="form.product_name"
                    class="form-control"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Image</label>
                <div class="col-sm-10">
                  <input type="text" v-model="form.product_image" class="form-control" required />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    v-model="form.product_price"
                    class="form-control price"
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Category</label>
                <div class="col-sm-10">
                  <select class="custom-select" v-model="form.id_category" required>
                    <option disabled value>Please select Category</option>
                    <option
                      v-bind:value="value.category_id"
                      v-for="(value, index) in category"
                      :key="index"
                    >{{value.category_name}}</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="reset" class="btn btn-cancel">reset</button>
                <button type="submit" class="btn btn-add">Add</button>
              </div>
            </form>
          </b-modal>
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
      alert: false,
      isMsg: '',
      total_data: 0,
      perPage: 7,
      currentPage: 2,
      category: [],
      product: [],
      fields: [
        { key: 'product_name', sortable: true },
        { key: 'category_name', sortable: true },
        { key: 'product_price', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      form: {
        id_category: '',
        product_name: '',
        product_image: '',
        product_price: '',
        status: 1
      }
    }
  },
  computed: {
    rows() {
      return this.total_data
    }
  },
  created() {
    // this.getProduct()
    this.getCategory()
  },
  methods: {
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Success',
        autoHideDelay: 10000,
        appendToast: append
      })
    },
    getCategory() {
      axios
        .get('http://127.0.0.1:3001/category')
        .then((response) => {
          this.category = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getProduct() {
      axios
        .get(`http://127.0.0.1:3001/product?limit=${this.perPage}`)
        .then((response) => {
          this.product = response.data.data[0]
          this.total_data = response.data.data[1].totalData
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeModal() {
      this.$refs['modal-add'].hide()
    },
    addProduct() {
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          this.products = response.data.data
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getProduct()
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
.modal-body form input {
  border: 1px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.modal-body .price {
  width: 270px;
  border: 1px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.modal-body form select {
  width: 200px;
  border: 1px solid #cecece;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.btn-add {
  width: 80px;
  border-radius: 100px;
  background-color: #57cad5;
  color: #ffffff;
}

.btn-cancel {
  width: 80px;
  border-radius: 100px;
  background-color: #f24f8a;
  color: #ffffff;
}
</style>
