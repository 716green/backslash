<template>
  <aside class="list">
    <strong>Keywords:</strong>{{ " " }}
    <q-item clickable dense v-ripple v-for="(item, i) in keywords" :key="i">
      <q-item-section>
        <q-item-label>{{ item }}</q-item-label>
      </q-item-section>
    </q-item>
  </aside>
</template>

<script>
export default {
  name: "List",
  props: ["keywords"]
};
</script>

<style scoped></style>
