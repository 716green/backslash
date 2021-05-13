<template>
  <aside>
    <div v-show="showing" class="col-auto" full-width>
      <p>{{ showing ? "\`Shift\` + \`Space\` clear/toggle" : "" }}</p>
      <p>
        {{
          showing && containsKeyword !== "help"
            ? "Type \`help\` for assistance"
            : ""
        }}
      </p>
      <p>
        {{
          showing && containsKeyword !== "list"
            ? "Type \`list\` for commands"
            : ""
        }}
      </p>
      <p>{{ showing ? "Press \`esc\` to close" : "" }}</p>
    </div>
    <div class="hotkeys" style="width: 100%">
      <span style="display: box"
        ><strong>Modifier Key:</strong>{{ " " }}<code>shift</code></span
      ><br />
      <hr />
      <span><strong>Hotkeys:</strong>{{ " " }}</span>
      <q-item
        clickable
        dense
        v-ripple
        v-for="item in specialCharList"
        :key="item.key"
      >
        <q-item-section>
          <q-item-label><q-icon :name="item.icon" size="md"/></q-item-label>
          <q-item-label>{{ item.key }} - {{ item.action }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Hotkeys",
  props: ["showing", "containsKeyword", "specialCharList"]
};
</script>

<style scoped></style>
