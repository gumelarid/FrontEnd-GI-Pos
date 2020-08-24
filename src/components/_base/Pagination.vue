<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    align="center"
  ></b-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['currentPage', 'rows']
}
</script>
