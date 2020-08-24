<template>
  <b-pagination
    v-model="currentPage"
    :per-page="perPage"
    :total-rows="rows"
    align="center"
    aria-controls="my-items"
  ></b-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['currentPage', 'rows', 'perPage']
}
</script>
