<template>
  <div>
    <img
      class="card-img-top"
      src="https://picsum.photos/250/250/?image=54"
      alt="...."
      style="max-height:180px;"
    />
    <div class="item-body">
      <div class="text-item">
        <strong>{{ name }}</strong>
        <div>RP {{ price }}</div>
      </div>
      <div class="button-add">
        <b-button variant="outline-primary" type="button" @click="increment()">
          <b-icon icon="cart4"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['name', 'price'],
  methods: {
    increment() {
      this.$emit('increment', 1)
    }
  }
}
</script>

<style scoped>
.item-body {
  padding: 5px 5px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
}
.text-item {
  flex: 2;
  font-size: 0.9rem;
  /* text-align: left; */
}
.button-add {
  flex: 1;
  text-align: right;
}
.card-img-top {
  max-height: 180px;
  object-fit: cover;
}
</style>
