<template>
  <h4 class="p-4 text-white text-center" :class="allCompleted ? 'bg-success':'bg-primary'">
    Tasks App (2 tasks to do)
  </h4>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { TaskInterface } from '@/models/models';

export default defineComponent({
  props: {
    tasks: {
      type: Object as () => TaskInterface[],
      required: true
    }
  },
  setup(props) {
    const allCompleted = computed(() => props.tasks.filter(t => !t.done).length === 0)
    return {allCompleted}
  }
})
</script>

<style scoped>

</style>
