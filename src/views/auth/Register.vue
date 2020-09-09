<template>
  <div class="box">
    <div class="content">
      <h3>Wellcome</h3>
      <hr />
      <b-alert :show="alert">{{ isMsg }}</b-alert>
      <form @submit.prevent="onRegister">
        <div class="form-group row">
          <div class="col-sm-12 form-input">
            <input
              type="text"
              class="form-control"
              placeholder="Input your name"
              v-model="form.user_name"
              required
            />
          </div>
          <div class="col-sm-12 form-input">
            <input
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
        <button type="submit" class="btn-sign-in">Register</button>
      </form>
      <hr />
      <p>
        Account already ?
        <router-link to="/login">Log In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      isMsg: '',
      alert: false,
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onRegister() {
      // const data = new FormData()
      // data.append('user_name', this.form.user_name)
      // data.append('user_email', this.form.user_email)
      // data.append('user_password', this.form.user_password)
      this.register(this.form)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.isMsg = response.msg
          this.form = {
            user_name: '',
            user_email: '',
            user_password: ''
          }
          this.$router.push('/login')
        })
        .catch((error) => {
          this.alert = true
          this.isMsg = error.msg
        })
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
  background-color: #3903fa;
  color: #ffffff;
}

.form-input {
  margin: 10px 0;
}

p {
  font-size: 0.9rem;
}
</style>
