<template>
  <aside class="search">
    <q-icon name="mdi-google" size="xl" />
    {{ search_term }}
  </aside>
</template>

<script>
export default {
  name: "Search",
  props: ["search_term"]
};
</script>

<style scoped></style>
