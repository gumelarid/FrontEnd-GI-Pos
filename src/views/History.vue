<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="12" class="header-title">
          <div class="title">
            <p>History</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid style="padding-left:0; padding-right:0;">
      <b-row class="main"></b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    IncrementCount(data) {
      this.count += data
    }
  }
}
</script>

<style scoped>
.header-title {
  padding-left: 0;
  padding-right: 0;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.search {
  margin: auto;
  padding: 5px;
  text-align: right;
}

.title {
  padding: 5px;
  margin: auto;
  text-align: center;
  flex: 2;
}

.title p {
  line-height: 25px;
  margin-bottom: 0;
}
/* product item */
.main {
  margin: 1px;
}

.main .items {
  padding-left: 55px;
}

.main .product-items {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 5px 2px;
}
</style>
