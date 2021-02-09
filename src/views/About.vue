<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleClick">click {{ age }}</button>
    <ul>
      <li v-for="i in items" :key="i">{{ i }}</li>
      {{
        items
      }}
    </ul>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const age = ref(1);
    const items = ref<any[]>([]);
    const handleClick = () => {
      items.value = Array(1500).map((_) => {
        return 0;
      });
    };
    return { age, handleClick, items };
  },
});
</script>
