<template>
  <b-col md="12" class="recent-order">
    <!-- add product -->
    <b-button size="sm" variant="outline-primary" v-b-modal.modal-product>
      <b-icon icon="plus"></b-icon>Add
    </b-button>

    <!-- table -->
    <table class="table text-center">
      <thead style="border-bottom: 1px solid black;">
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Category Name</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,index) in product" :key="index">
          <td class="text-muted">{{value.product_name}}</td>
          <td class="text-muted">{{value.category_name}}</td>
          <td class="text-muted">
            Rp. {{value.product_price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}}
          </td>
          <td>
            <b-button
              size="sm"
              variant="outline-info"
              v-b-modal.modal-product
              @click="setProduct(value)"
            >
              <b-icon icon="pencil-square"></b-icon>
            </b-button>|
            <b-button size="sm" variant="outline-danger" @click="deleteProduct(value)">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

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

    <!-- modal product-->
    <b-modal id="modal-product" ref="modal-product" centered title="Product" hide-footer>
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
              style="padding-top:5px"
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
              >{{ value.category_name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row" v-show="isUpdate">
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-10">
            <select class="custom-select" v-model="form.status" required>
              <option disabled value>Change Status</option>
              <option value="0">Not Active</option>
              <option value="1">Active</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="reset" class="btn btn-cancel">reset</button>
          <button type="submit" class="btn btn-add" v-show="!isUpdate">Save</button>
          <button type="button" class="btn btn-add" v-show="isUpdate" @click="patchProduct()">Update</button>
        </div>
      </form>
    </b-modal>
  </b-col>
</template>

<script>
import axios from 'axios'
export default {
  name: 'table',
  created() {
    this.getProduct()
    this.getCategory()
  },
  data() {
    return {
      alert: false,
      isMsg: '',
      isUpdate: false,
      totalData: 0,
      limit: 6,
      page: 1,
      showPagination: true,
      product: [],
      category: [],
      product_id: '',
      form: {
        id_category: '',
        product_name: '',
        product_image: '',
        product_price: '',
        status: ''
      }
    }
  },
  methods: {
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
        appendToast: append
      })
    },
    closeModal() {
      this.$refs['modal-product'].hide()
    },

    // category
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

    // product
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
          this.form = {
            id_category: '',
            product_name: '',
            product_image: '',
            product_price: '',
            status: 1
          }
        })
    },
    setProduct(data) {
      this.form = {
        id_category: data.category_id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_price: data.product_price,
        status: data.status
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      axios
        .put(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getProduct()
          this.isUpdate = false
          this.form = {
            category_id: '',
            product_name: '',
            product_image: '',
            product_price: '',
            status: 1
          }
        })
    },
    deleteProduct(data) {
      this.product_id = data.product_id
      axios
        .delete(`http://127.0.0.1:3001/product/${this.product_id}`)
        .then((response) => {
          this.products = response.data.data
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.getProduct()
        })
    }
  }
}
</script>
<style scoped src="@/assets/css/style.css">
</style>
