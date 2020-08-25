<template>
  <b-sidebar width="max-content" id="sidebar" backdrop shadow no-header-close>
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
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: 'sidebar'
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
  /* display: none; */
  align-content: center;
  align-items: center;
}

.nav-link {
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
