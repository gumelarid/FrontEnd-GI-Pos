<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col md="12" class="header-title">
          <div class="list" v-b-toggle.sidebar>
            <b-icon icon="list" style="width: 26px; height: 26px;"></b-icon>
          </div>
          <div class="title">
            <p>manage</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Sidebar />
    <b-container fluid style="padding-left:0; padding-right:0;">
      <b-row class="main">
        <b-col md="12">
          <b-container>
            <div class="my-5">
              <b-card no-body>
                <b-tabs pills card>
                  <b-tab title="Product" active>
                    <Table />
                  </b-tab>
                  <b-tab title="Category">
                    <Category />
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '../components/_module/Sidebar'
import Table from '../components/_module/Table'
import Category from '../components/_module/Category'

export default {
  name: 'manage',
  components: {
    Sidebar,
    Table,
    Category
  }
}
</script>

<style scoped>
.header-title {
  font-size: 1.5rem;
  padding-left: 0;
  padding-right: 0;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-content: space-between;
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
  text-align: center;
  padding: 20px 5px;
  font-size: 1rem;
}

.main .product-items {
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: 0;
  padding: 5px 2px;
}
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
</style>
