<template>
  <div>
    <div class="item-order" v-for="(value, index) in cart" :key="index">
      <img
        :src="url + '/' + value.product_image"
        alt="...."
        width="100px"
        height="100px"
      />
      <div class="selected-items">
        <p>{{ value.product_name }}</p>

        <div class="quantity">
          <b-button-group size="sm">
            <b-button v-if="value.qty == 1" variant="outline-warning">
              <b-icon
                variant="dark"
                icon="trash"
                @click="removeCart(value)"
              ></b-icon>
            </b-button>
            <b-button
              v-else
              variant="outline-warning"
              @click="decrementCart(value)"
            >
              <b-icon variant="dark" icon="dash"></b-icon>
            </b-button>

            <input
              class="input-qty"
              type="text"
              v-model="value.qty"
              min="1"
              max="100"
            />
            <b-button variant="outline-warning" @click="incrementCart(value)">
              <b-icon variant="dark" icon="plus"></b-icon>
            </b-button>
          </b-button-group>
          <span class="price">
            Rp.{{
              (value.product_price * value.qty)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }}
          </span>
        </div>
      </div>
    </div>
    <hr />
    <!-- checkout -->
    <div class="checkout align-text-bottom">
      <div class="total">
        <p>Total:</p>
        <p>
          Rp. {{ totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
        </p>
      </div>
      <p class="text-left text-muted">*Belum Termasuk PPN</p>
      <button
        type="button"
        class="btn btn-checkout"
        @click="checkOut(cart)"
        v-b-modal.modal-checkout
      >
        Checkout
      </button>
      <button type="button" @click="cancelOrder()" class="btn btn-cancels">
        Cancel
      </button>
    </div>

    <!-- modal product -->
    <b-modal
      id="modal-checkout"
      ref="modal-checkout"
      centered
      title="Checkout Success!"
      hide-footer
    >
      <div class="modal-header">
        <h5 class="modal-title">Checkout</h5>
        <h5 class="modal-title">Receipt no: #{{ invoice }}</h5>
      </div>
      <div class="modal-cashier">
        <small>Chasier : {{ user.user_name }}</small>
      </div>
      <div class="modal-body">
        <div
          class="menu-item-order"
          v-for="(value, index) in cart"
          :key="index"
        >
          <div>
            <strong>{{ value.product_name }} x{{ value.qty }}</strong>
          </div>
          <div>
            RP
            {{
              (value.product_price * value.qty)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }}
          </div>
        </div>

        <div class="ppn-order">
          <div>
            <strong>PPN 10%</strong>
          </div>
          <div>
            RP
            {{
              (totalPrice * 0.1)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }}
          </div>
        </div>
        <p class="text-right">
          Total : Rp.
          {{
            (totalPrice + totalPrice * 0.1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
          }}
        </p>
        <p>Payment : Cash</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-print" @click="downloadPDF()">Print</button>
        <!-- <button class="btn btn-print" @click="cancelOrder()">Print</button> -->
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import JsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  name: 'cart',
  data() {
    return {
      dataCheckOut: [],
      url: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      cart: 'getCart',
      totalPrice: 'totalPrice',
      invoice: 'getInvoice'
    })
  },
  methods: {
    ...mapMutations(['removeFromCart', 'cancelOrder']),
    ...mapActions(['orderPost']),
    checkOut(data) {
      data.map((value) => {
        const orderData = {
          product_id: value.product_id,
          qty: value.qty
        }
        this.dataCheckOut = [...this.dataCheckOut, orderData]
      })
      const setDataOrder = {
        user_id: this.user.user_id,
        orders: this.dataCheckOut
      }
      this.orderPost(setDataOrder)
    },

    incrementCart(data) {
      const cekData = this.cart.findIndex(
        (value) => value.product_id === data.product_id
      )
      this.cart[cekData].qty += 1
    },
    decrementCart(data) {
      const cekData = this.cart.findIndex(
        (value) => value.product_id === data.product_id
      )
      this.cart[cekData].qty -= 1
    },
    removeCart(data) {
      this.cart.splice(
        this.cart.findIndex((value) => value.product_id === data.product_id),
        1
      )
    },
    downloadPDF() {
      let data = []
      this.cart.forEach(item => {
        const dataSet = [`${item.product_name}  ${item.qty}x  ${item.product_price * item.qty}\n`]
        data += dataSet
      })
      const doc = new JsPDF()
      doc.setFontSize(14)
      doc.text(
        `   Check Out Print
      Cashier : ${this.user.user_name}
      Invoice no. #${this.invoice}
      ---------------------------------------------------
      ${data}
      Total + ppn 10% : Rp. ${this.totalPrice + this.totalPrice * 0.1}
      Payment : Cash
      ---------------------------------------------------
      Thank you ! `,
        5,
        5
      )
      doc.save('print.pdf')
      this.cancelOrder()
    }
  }
}
</script>

<style scoped>
/* -- order-quantity -- */
.quantity {
  padding-top: 10px;
  display: inline-block;
}
.input-qty {
  width: 35px;
  text-align: center;
}

/* cart */
.cart-item {
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
  text-align: center;
  height: 800px;
}

.cart-img {
  margin-top: 20px;
  width: 60%;
}

.cart-body {
  margin-top: -50px;
}

.cart-body h2 {
  font-size: 25px;
  line-height: 39px;
  color: #000000;
}

span.text-muted {
  font-size: 20px;
  line-height: 26px;
}

.selected-items p {
  text-align: left;
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

/* product select */
.item-order {
  font-size: 0.9rem;
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

.price {
  margin-left: 10px;
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
  font-size: 0.9rem;
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

/* modalCheckout */
#modalCheckout .modal-header {
  border-bottom-width: none;
}

.modal-cashier {
  margin-top: -15px;
  padding: 0 16px;
}

.menu-item-order {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ppn-order {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#modalCheckout .modal-content .modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#modalCheckout .modal-footer p {
  margin: 10px 5px;
}

.btn-print {
  width: 100%;
  background: #f24f8a;
  color: #ffffff;
}

.btn-email {
  width: 100%;
  background: #57cad5;
  color: #ffffff;
}

@media (max-width: 767px) {
  nav {
    min-height: min-content;
  }

  .cart-item {
    height: max-content;
  }
  #modalCheckout .modal-header {
    display: flex;
    flex-direction: column;
  }
  main .col-md-8 {
    padding-left: 28px;
  }
  .product-items {
    padding: 0;
  }

  nav {
    position: fixed;
    height: fit-content;
    top: 20%;
  }
  .cart-item {
    padding: 50px 5px;
  }

  main .revenue {
    left: -50px;
  }

  main .chart {
    width: 100%;
  }

  main .recent-order {
    margin-left: 0px;
    width: 100%;
  }

  .item-order {
    font-size: 15px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .search:hover > .search-txt {
    width: 100px;
  }
}

/* // Medium devices (tablets, less than 992px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .selected-items p {
    text-align: center;
  }
  .cart-item .cart-body {
    margin-top: 2px;
  }

  .cart-body h2 {
    font-size: 20px;
    line-height: 25px;
  }
  .cart-body span.text {
    font-size: 13px;
    line-height: 18px;
  }

  .card-history {
    flex-wrap: unset;
  }
  .income {
    width: 200px;
    height: 120px;
    padding: 0;
  }

  .order {
    width: 200px;
    height: 120px;
    padding: 0;
  }

  .total-income {
    width: 200px;
    height: 120px;
    padding: 0;
  }

  .item-order {
    padding: 2px;
    display: flex;
    flex-direction: column;
  }

  .item-order img {
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .price {
    padding-top: 1px;
  }

  .checkout {
    margin: 0;
    padding: 0;
  }
}

/* Large devices (desktops, less than 1200px) */
@media (min-width: 1000px) and (max-width: 1199.98px) {
  main .product-items {
    height: 580px;
    overflow: scroll;
  }

  .income {
    width: 250px;
    padding: 0;
  }

  .order {
    width: 250px;
    padding: 0;
  }

  .total-income {
    width: 250px;
    padding: 0;
  }

  .item-order {
    margin: 15px 0;
    padding: 0px;
  }

  .quantity .input-text.qty {
    width: 30px;
    height: 30px;
  }

  .quantity.buttons_added .minus,
  .quantity.buttons_added .plus {
    padding: 0 8px;
    height: 30px;
    height: 30px;
  }

  .checkout {
    margin: 10px 0;
    padding: 0;
  }
}
</style>
