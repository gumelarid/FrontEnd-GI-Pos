<template>
  <b-col md="12" class="recent-order">
    <!-- add product -->
    <b-button size="sm" variant="outline-primary" v-b-modal.modal-product>
      <b-icon icon="plus"></b-icon>Add
    </b-button>
    <div class="table-responsive">
      <!-- table -->
      <table class="table text-center">
        <thead style="border-bottom: 1px solid black;">
          <tr>
            <th scope="cols">Image</th>
            <th scope="cols">Product Name</th>
            <th scope="cols">Category Name</th>
            <th scope="cols">Price</th>
            <th scope="cols">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in products" :key="index">
            <td class="text-muted">
              <img
                class="card-img-top"
                :src="url + '/' + value.product_image"
                alt="...."
                style="max-width:150px;"
              />
            </td>
            <td class="text-muted">{{ value.product_name }}</td>
            <td class="text-muted">{{ value.category_name }}</td>
            <td class="text-muted">
              Rp.
              {{
              value.product_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
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
    </div>

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

    <!-- modal product -->
    <b-modal id="modal-product" ref="modal-product" centered title="Product" hide-footer>
      <p class="alert alert-danger" v-if="message">{{ message }}</p>
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
            <input type="File" @change="handleFile" class="form-control" required />
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
            <select class="custom-select" v-model="form.id_category">
              <option disabled value>Please select Category</option>
              <option
                v-bind:value="value.category_id"
                v-for="(value, index) in category"
                :key="index"
              >{{ value.category_name }}</option>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'TbProduct',
  data() {
    return {
      showPagination: true,
      currentPage: 1,
      isUpdate: false,
      alert: false,
      isMsg: '',
      url: process.env.VUE_APP_URL,
      form: {
        product_name: '',
        id_category: '',
        product_price: '',
        product_image: '',
        status: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      category: 'getCategory',
      products: 'getProduct',
      limit: 'getLimit',
      page: 'getPage',
      totalData: 'getTotalData',
      message: 'getMessage'
    })
  },
  methods: {
    ...mapActions([
      'getCategorys',
      'getProducts',
      'addProducts',
      'updateProducts',
      'deleteProducts'
    ]),

    ...mapMutations(['changePage']),
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
    pageChange(value) {
      if (parseInt(this.$route.query.page) !== value) {
        this.$router.push(`?page=${value}`)
      }
      this.changePage(value)
      this.getProducts()
    },
    handleFile(e) {
      this.form.product_image = e.target.files[0]
      console.log(this.form.product_image)
    },
    addProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('id_category', this.form.id_category)
      data.append('product_price', this.form.product_price)
      data.append('status', this.form.status)
      data.append('product_image', this.form.product_image)

      this.addProducts(data)
        .then((response) => {
          // this.alert = true
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getProducts()
          this.form = {
            id_category: '',
            product_name: '',
            product_image: '',
            product_price: '',
            status: 1
          }
        })
        .catch((error) => {
          alert(error.data.msg)
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        id_category: data.id_category,
        product_price: data.product_price,
        status: data.status
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('status', this.form.status)
      data.append('product_image', this.form.product_image)
      const payload = {
        product_id: this.product_id,
        form: data
      }
      this.updateProducts(payload)
        .then((respsone) => {
          this.getProductItem()
          this.makeToast('Product Update')
          this.closeModal()
          this.isUpdate = false
        })
        .catch((error) => {
          alert(error.data.msg)
        })
    },
    deleteProduct(data) {
      this.deleteProducts(data.product_id)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.isUpdate = false
          this.getProducts()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    }
  },
  created() {
    this.getProducts()
    this.getCategorys()
  }
}
</script>
<style scoped>
/* recent order */
.recent-order {
  margin: 10px 5px;
  border-radius: 10px;
}

.recent-order th {
  font-size: 1rem;
  line-height: 20px;
  letter-spacing: 0.1em;
}

.recent-order .text-muted {
  font-size: 1rem;
}
/* modalAdd */
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

@media (max-width: 767px) {
  .recent-order {
    margin: 5px 0px;
  }
  .recent-order th {
    font-size: 0.7rem;
  }

  .recent-order .text-muted {
    font-size: 0.7rem;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .recent-order {
    margin: 10px 0px;
  }
  .revenue {
    margin: 10px 50px;
  }
  .recent-order th {
    font-size: 0.7rem;
  }

  .recent-order .text-muted {
    font-size: 0.7rem;
  }
}
</style>
