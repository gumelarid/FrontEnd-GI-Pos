<template>
  <b-col md="12" class="recent-order">
    <!-- add category -->

    <div class="table-responsive">
      <table class="table text-center">
        <thead style="border-bottom: 1px solid black">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in users" :key="index">
            <td class="text-muted">
              {{ value.user_name }}
              <span
                v-if="value.user_role === 1"
                class="badge badge-sm badge-primary"
                >Admin</span
              >
              <span v-else class="badge badge-sm badge-success">Chasier</span>
            </td>
            <td class="text-muted">{{ value.user_email }}</td>

            <td class="text-muted" v-if="value.user_status === 1">
              <span class="badge badge-success">Active</span>
            </td>
            <td class="text-muted" v-else>
              <span class="badge badge-warning">Not Active</span>
            </td>
            <td>
              <b-dropdown
                size="sm"
                text="Action"
                variant="outline-primary"
                class="m-2"
              >
                <b-dropdown-item
                  v-b-modal.modal-change
                  @click="setPassword(value)"
                  >Change Password</b-dropdown-item
                >
                <b-dropdown-item v-b-modal.modal-user @click="setUsers(value)"
                  >Edit</b-dropdown-item
                >
                <b-dropdown-item @click="deleteUser(value)"
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal id="modal-user" ref="modal-user" centered title="User" hide-footer>
      <form @submit.prevent="patchUser">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="form.user_name"
              class="form-control"
              placeholder="Name"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="form.user_email"
              class="form-control"
              placeholder="email"
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Status</label>
          <div class="col-sm-10">
            <select class="form-control" v-model="form.user_status" required>
              <option value="0">Not active</option>
              <option value="1">Active</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Role</label>
          <div class="col-sm-10">
            <select class="form-control" v-model="form.user_role" required>
              <option value="1">admin</option>
              <option value="2">Chasier</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-add">Update</button>
        </div>
      </form>
    </b-modal>

    <b-modal
      id="modal-change"
      ref="modal-user"
      centered
      title="User"
      hide-footer
    >
      <form @submit.prevent="changePassword()">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">New Password</label>
          <div class="col-sm-10">
            <input
              type="password"
              v-model="form.user_password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-add">Change</button>
        </div>
      </form>
    </b-modal>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TbUser',
  data() {
    return {
      users_id: '',
      alert: true,
      isMsg: '',
      isUpdate: false,

      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_status: '',
        user_role: ''
      }
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    ...mapGetters({
      users: 'getUserData'
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
      this.$refs['modal-user'].hide()
    },
    ...mapActions(['getUsers', 'patchUsers', 'patchPasswords', 'deleteUsers']),

    setUsers(data) {
      this.form = {
        user_name: data.user_name,
        user_email: data.user_email,
        user_status: data.user_status,
        user_role: data.user_role
      }
      this.isUpdate = true
      this.user_id = data.user_id
    },

    patchUser() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      this.patchUsers(setData)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.isUpdate = false
          this.getUsers()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    },
    setPassword(data) {
      this.form = {
        user_password: ''
      }
      //
      this.isUpdate = true
      this.user_id = data.user_id
    },
    changePassword() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      this.patchPasswords(setData)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.alert = false
          this.isUpdate = false
          this.getUsers()
        })
        .catch((error) => {
          this.alert = true
          this.isUpdate = false
          this.isMsg = error.data.msg
          this.makeToastError(this.isMsg)
        })
    },
    makeToastError(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Opss',
        variant: 'danger',
        autoHideDelay: 10000,
        appendToast: append
      })
    },

    deleteUser(data) {
      this.deleteUsers(data.user_id)
        .then((response) => {
          this.isMsg = response.msg
          this.makeToast(this.isMsg)
          this.closeModal()
          this.isUpdate = false
          this.getUsers()
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.data.msg
        })
    }
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
