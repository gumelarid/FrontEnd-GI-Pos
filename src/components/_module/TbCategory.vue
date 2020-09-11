<template>
  <b-col md="12" class="recent-order">
    <!-- add category -->
    <b-button size="sm" variant="outline-info" class="ml-1" v-b-modal.modal-category>
      <b-icon icon="plus"></b-icon>Add
    </b-button>
    <div class="table-responsive">
      <table class="table text-center">
        <thead style="border-bottom: 1px solid black;">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in categorys" :key="index">
            <td class="text-muted">{{ index + 1 }}</td>
            <td class="text-muted">{{ value.category_name }}</td>
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
    </div>

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
          <button
            type="button"
            class="btn btn-add"
            v-show="isUpdate"
            @click="patchCategory()"
          >Update</button>
        </div>
      </form>
    </b-modal>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TbCategory',
  data() {
    return {
      category_id: '',
      alert: false,
      isMsg: '',
      isUpdate: false,
      form: {
        category_name: ''
      }
    }
  },
  created() {
    this.getCategorys()
  },
  computed: {
    ...mapGetters({
      categorys: 'getCategory'
    })
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
    ...mapActions([
      'getCategorys',
      'addCategorys',
      'updateCategorys',
      'deleteCategorys'
    ]),
    addCategory() {
      this.addCategorys(this.form)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.getCategorys()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    setCategory(data) {
      this.form = {
        category_name: data.category_name
      }
      this.isUpdate = true
      this.category_id = data.category_id
    },
    patchCategory() {
      const setData = {
        category_id: this.category_id,
        form: this.form
      }
      this.updateCategorys(setData)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.isUpdate = false
          this.getCategorys()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    deleteCategory(data) {
      this.deleteCategorys(data.category_id)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.isUpdate = false
          this.getCategorys()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    }
  }
}
</script>
