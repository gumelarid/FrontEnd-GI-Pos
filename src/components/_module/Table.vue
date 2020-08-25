<template>
  <div class="recent col-md-12">
    <div class="recent-order">
      <div class="card-body table-responsive">
        <b-button size="sm" variant="outline-primary" v-b-modal.modal-product>
          <b-icon icon="plus"></b-icon>Add
        </b-button>
        <table class="table">
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
              <td class="text-muted">{{value.product_price}}</td>
              <td>
                <b-button
                  size="sm"
                  variant="outline-info"
                  v-b-modal.modal-product
                  @click="setProduct(value)"
                >
                  <b-icon icon="pencil-square"></b-icon>Update
                </b-button>|
                <b-button size="sm" variant="outline-danger" @click="deleteProduct(value)">
                  <b-icon icon="trash"></b-icon>Delete
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- modal -->
        <b-modal id="modal-product" ref="modal-product" centered title="BootstrapVue" hide-footer>
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
                  >{{value.category_name}}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="reset" class="btn btn-cancel">reset</button>
              <button type="submit" class="btn btn-add" v-show="!isUpdate">Save</button>
              <button
                type="button"
                class="btn btn-add"
                v-show="isUpdate"
                @click="patchProduct()"
              >Update</button>
            </div>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
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
      limit: 6,
      page: 1,
      product: [],
      category: [],
      product_id: '',
      form: {
        id_category: '',
        product_name: '',
        product_image: '',
        product_price: '',
        status: 1
      }
    }
  },
  methods: {
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Success',
        autoHideDelay: 10000,
        appendToast: append
      })
    },
    closeModal() {
      this.$refs['modal-product'].hide()
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
        .get(
          `http://127.0.0.1:3001/product?limit=${this.limit}&page=${this.page}`
        )
        .then((response) => {
          this.product = response.data.data[0]
        })
        .catch((error) => {
          console.log(error)
        })
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
<style src="@/assets/css/style.css"></style>
