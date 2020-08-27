<template>
  <div>
    <div class="item-order" v-for="(value, index) in itemCart" :key="index">
      <img src="https://picsum.photos/250/250/?image=54" alt="...." width="100px" height="100px" />
      <div class="selected-items">
        <p>{{value.product_name}}</p>

        <div class="quantity">
          <b-button-group size="sm">
            <b-button v-if="value.qty == 1" variant="outline-warning">
              <b-icon variant="dark" icon="dash"></b-icon>
            </b-button>
            <b-button v-else variant="outline-warning" @click="decrement(value)">
              <b-icon variant="dark" icon="dash"></b-icon>
            </b-button>

            <input class="input-qty" type="text" v-model="value.qty" min="1" max="100" />
            <b-button variant="outline-warning" @click="increment(value)">
              <b-icon variant="dark" icon="plus"></b-icon>
            </b-button>
          </b-button-group>
        </div>
      </div>
      <div class="price">
        <p>Rp.{{value.product_price * value.qty}}</p>
      </div>
    </div>
    <hr />
    <!-- checkout -->
    <div class="checkout align-text-bottom">
      <div class="total">
        <p>Total:</p>
        <p>Rp. {{ totalPrice() }}</p>
      </div>
      <p class="text-left text-muted">*Belum Termasuk PPN</p>
      <button
        type="button"
        class="btn btn-checkout"
        v-on:click="checkout()"
        v-b-modal.modal-checkout
      >Checkout</button>
      <button type="button" @click="emptyCart()" class="btn btn-cancels">Cancel</button>
    </div>

    <!-- modal product-->
    <b-modal id="modal-checkout" ref="modal-checkout" centered :title="message" hide-footer>
      <div class="modal-header">
        <h5 class="modal-title">Checkout</h5>
        <h5 class="modal-title">Receipt no: {{invoice}}</h5>
      </div>
      <div class="modal-cashier">
        <small>Chasier : Pevita Pierce</small>
      </div>
      <div class="modal-body">
        <div class="menu-item-order" v-for="(value,index) in orders" :key="index">
          <div>
            <strong>{{value.product_name}} x{{value.order_qty}}</strong>
          </div>
          <div>RP {{value.order_total}}</div>
        </div>

        <div class="ppn-order">
          <div>
            <strong>PPN 10%</strong>
          </div>
          <div>RP {{subTotal - totalPrice()}}</div>
        </div>
        <p class="text-right">Total : Rp. {{subTotal}}</p>
        <p>Payment : Cash</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-print">Print</button>
        <p>Or</p>
        <button class="btn btn-email">Send Email</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'cart',
  props: ['itemCart'],
  data() {
    return {
      message: '',
      invoice: '',
      subTotal: 0,
      orders: [],
      dataCheckOut: []
    }
  },
  methods: {
    increment(data) {
      const cekData = this.itemCart.findIndex(
        (value) => value.product_id === data.product_id
      )
      this.itemCart[cekData].qty += 1
    },
    decrement(data) {
      const cekData = this.itemCart.findIndex(
        (value) => value.product_id === data.product_id
      )
      this.itemCart[cekData].qty -= 1
    },
    totalPrice() {
      let priceTotal = 0
      for (let i = 0; i < this.itemCart.length; i++) {
        priceTotal += this.itemCart[i].product_price * this.itemCart[i].qty
      }
      return priceTotal
    },
    checkout() {
      this.itemCart.map((value) => {
        const orderData = {
          product_id: value.product_id,
          qty: value.qty
        }
        this.dataCheckOut = [...this.dataCheckOut, orderData]
      })

      const data = {
        orders: this.dataCheckOut
      }

      axios.post('http://127.0.0.1:3001/order', data).then((result) => {
        this.orders = result.data.data.orders
        this.message = result.data.msg
        this.invoice = result.data.data.invoice
        this.subTotal = result.data.data.subtotal
      })
    },
    emptyCart(e) {
      this.$emit('clearCart', e)
    }
  }
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
.input-qty {
  width: 35px;
  text-align: center;
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
