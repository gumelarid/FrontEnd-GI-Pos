<template>
  <b-col md="12" class="recent-order">
    <!-- add category -->
    <b-button size="sm" variant="outline-info" class="ml-1" v-b-modal.modal-category>
      <b-icon icon="plus"></b-icon>Add
    </b-button>

    <table class="table text-center">
      <thead style="border-bottom: 1px solid black;">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,index) in category" :key="index">
          <td class="text-muted">{{index+1}}</td>
          <td class="text-muted">{{value.category_name}}</td>
          <td>
            <b-button
              size="sm"
              variant="outline-info"
              v-b-modal.modal-category
              @click="setCategory(value)"
            >
              <b-icon icon="pencil-square"></b-icon>
            </b-button>|
            <b-button size="sm" variant="outline-danger" @click="deleteCategory(value)">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal id="modal-category" ref="modal-category" centered title="Category" hide-footer>
      <form @submit.prevent="addCategory">
        <div class="form-group row">
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              placeholder="Category"
              v-model="form.category_name"
              required
            />
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
  name: 'Category',
  data() {
    return {
      category: [],
      category_id: '',
      alert: false,
      isMsg: '',
      isUpdate: false,
      form: {
        category_id: '',
        category_name: ''
      }
    }
  },
  created() {
    this.getCategory()
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
      this.$refs['modal-category'].hide()
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
    addCategory() {
      axios
        .post('http://127.0.0.1:3001/category', this.form)
        .then((response) => {
          this.category = response.data.data
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getCategory()
          this.form = {
            category_id: '',
            category_name: ''
          }
        })
    },
    setCategory(data) {
      this.form = {
        category_id: data.category_id,
        category_name: data.category_name
      }
      this.isUpdate = true
      this.category_id = data.category_id
    },
    patchProduct() {
      axios
        .patch(`http://127.0.0.1:3001/category/${this.category_id}`, this.form)
        .then((response) => {
          console.log(response)
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getCategory()
          this.form = {
            category_id: '',
            category_name: ''
          }
        })
      this.isUpdate = false
    },
    deleteCategory(data) {
      this.category_id = data.category_id
      axios
        .delete(`http://127.0.0.1:3001/category/${this.category_id}`)
        .then((response) => {
          this.category = response.data.data
          this.isMsg = response.data.msg
          this.makeToast(this.isMsg)
          this.getCategory()
        })
    }
  }
}
</script>
<style scoped src="@/assets/css/style.css">
</style>
