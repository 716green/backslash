<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/backslash-logo.png" />
          </q-avatar>
          {{ toolbarTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  computed: {
    toolbarTitle() {
      return this.$store.getters.getFooterText;
    }
  }
};
</script>
