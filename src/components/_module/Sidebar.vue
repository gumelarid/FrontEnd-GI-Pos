<template>
  <b-sidebar width="max-content" id="sidebar" backdrop shadow no-header-close>
    <div class="px-3 py-2">
      <h3>GI - POS</h3>
    </div>
    <hr class="mb-5" />
    <div class="navigation px-3 py-2">
      <router-link to="/" class="nav-link">
        <b-icon icon="book" style="height:26px; width:26px;"></b-icon>
        <div class="text-link">Product</div>
      </router-link>
      <router-link to="/history" class="nav-link">
        <b-icon icon="receipt" style="height:26px; width:26px;"></b-icon>
        <div class="text-link">History</div>
      </router-link>
      <router-link to="/manage" class="nav-link">
        <b-icon icon="gear" style="height:26px; width:26px;"></b-icon>
        <div class="text-link">Manage</div>
      </router-link>
      <hr class="mt-5" />
      <a @click="handleLogout" class="logout-link">
        <b-icon icon="Power" style="height:26px; width:26px;"></b-icon>
        <div class="text-link">Logout</div>
      </a>
    </div>
  </b-sidebar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'sidebar',
  methods: {
    ...mapActions({ handleLogout: 'logout' })
  }
}
</script>

<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}

.navigation {
  padding: 10px 10px;
  width: max-content;
  box-sizing: border-box;
}

.text-link {
  padding-left: 5px;
  align-content: center;
  align-items: center;
}

.logout-link {
  cursor: pointer;
  font-size: 1rem;
  margin: 2px 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.btn-logout {
  border: none;
  color: white;
  background-color: rgb(126, 58, 58);
}

.btn-logout:hover {
  border-radius: 10px;
  color: black;
}

.nav-link {
  font-size: 1rem;
  margin: 2px 0;
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.nav-link:hover {
  background-color: rgb(74, 204, 204);
  border-radius: 0 150px 100px;
  color: white;
  width: max-content;
}
</style>
