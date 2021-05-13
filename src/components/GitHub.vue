<template>
  <aside>
    <strong> GITHUB </strong><br /><br />
    <p :class="gh_username ? 'highlight' : ''">
      GITHUB {{ gh_username_name || "username" }}
    </p>
    <p :class="gh_search ? 'highlight' : ''">
      GITHUB SEARCH
      {{ gh_search_term || "search_term" }}
    </p>
  </aside>
</template>

<script>
export default {
  name: "GitHub",
  props: ["gh_username", "gh_username_name", "gh_search", "gh_search_term"]
};
</script>

<style scoped>
.highlight {
  border: 2px solid black;
  border-radius: 0.2rem;
  background-color: slateblue;
  padding: 2px;
  margin: 0;
  font-weight: 500;
  color: lightblue;
}
</style>
