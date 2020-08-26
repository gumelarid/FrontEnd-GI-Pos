<template>
  <div>
    <div class="item-order" v-for="(value, index) in itemCart" :key="index">
      <img src="https://picsum.photos/250/250/?image=54" alt="...." width="100px" height="100px" />
      <div class="selected-items">
        <p>{{value.product_name}}</p>
        <div class="quantity buttons_added">
          <input type="button" value="-" class="minus" />
          <input
            type="number"
            step="1"
            min="1"
            max
            name="quantity"
            value="1"
            title="Qty"
            class="input-text qty text"
            size="4"
            pattern
            inputmode
          />
          <input type="button" value="+" class="plus" />
        </div>
      </div>
      <div class="price">
        <p>Rp.{{value.product_price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  props: ['itemCart']
}
</script>

<style scoped>
/* product select */
.item-order {
  margin: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.item-order img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

/* -- order-quantity -- */
.quantity {
  display: inline-block;
}

.quantity .input-text.qty {
  width: 35px;
  height: 39px;
  padding: 0 5px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #82de3a;
}

.quantity.buttons_added {
  text-align: left;
  position: relative;
  white-space: nowrap;
  vertical-align: top;
}

.quantity.buttons_added input {
  display: inline-block;
  margin: 0;
  vertical-align: top;
  box-shadow: none;
}

.quantity.buttons_added .minus,
.quantity.buttons_added .plus {
  padding: 7px 10px 8px;
  height: 41px;
  background: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  cursor: pointer;
}

.quantity.buttons_added .minus {
  border-right: 0;
}

.quantity.buttons_added .plus {
  border-left: 0;
}

.quantity.buttons_added .minus:hover,
.quantity.buttons_added .plus:hover {
  background: #eeeeee;
}

.quantity input::-webkit-outer-spin-button,
.quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
}

.quantity.buttons_added .minus:focus,
.quantity.buttons_added .plus:focus {
  outline: none;
}

.price {
  padding-top: 50px;
}

/* checkout */
.checkout {
  padding: 0 20px;
  margin: 20px;
  float: inline-end;
}

.checkout .btn {
  margin: 5px 0;
}

.total {
  display: flex;
  justify-content: space-between;
}

.checkout .text-muted {
  font-size: small;
  margin: 5px 0;
}

.btn-checkout {
  width: 100%;
  background: #57cad5;
  color: #ffffff;
}

.btn-cancels {
  width: 100%;
  background: #f24f8a;
  color: #ffffff;
}
</style>
