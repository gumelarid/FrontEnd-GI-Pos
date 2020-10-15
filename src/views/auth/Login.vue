<template>
  <div class="box">
    <div class="content">
      <h3>Login now</h3>
      <hr />
      <b-alert variant="danger" :show="alert">{{ isMsg }}</b-alert>
      <form @submit.prevent="onSubmit">
        <div class="form-group row">
          <div class="col-sm-12 form-input">
            <input
              v-focus
              type="email"
              class="form-control"
              placeholder="Input your email"
              v-model="form.user_email"
              required
            />
          </div>
          <div class="col-sm-12 form-input">
            <input
              type="password"
              class="form-control"
              placeholder="Input your password"
              v-model="form.user_password"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn-sign-in">Log In</button>
      </form>
      <hr />
      <p>
        Not Registered ?
        <router-link to="/register">Register Now</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  title: 'Login - GI POS',
  name: 'Login',
  data() {
    return {
      isMsg: '',
      alert: false,
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          this.alert = false
          this.isMsg = ''
          this.makeToast('Success Login')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error
        })
    },
    makeToast(msg, append = false) {
      this.$bvToast.toast(`${msg}`, {
        title: 'Success',
        variant: 'success',
        autoHideDelay: 10000,
        appendToast: append
      })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>

<style scoped>
.alert {
  font-size: 1rem;
}
.box {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content {
  border-radius: 10px;
  box-shadow: 0px 15px 50px 10px rgba(139, 65, 65, 0.2);
  background: white;
  width: 450px;
  text-align: center;
  padding: 10px 10px;
}

.btn-sign-in {
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  border: none;
  background-color: #a188fc;
  color: #ffffff;
}

.btn-sign-in:hover {
  padding: 10px 0;
  width: 100%;
  font-size: 1rem;
  border: none;
  background-color: #401dbe;
  color: #ffffff;
}

.form-input {
  margin: 10px 0;
}

p {
  font-size: 0.9rem;
}
</style>
