<template>
  <h4 class="p-4 text-white text-center" :class="allCompleted ? 'bg-success':'bg-primary'">
    Tasks App ({{ remainingCount }} tasks to do)
  </h4>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Task } from '@/models/models';

export default defineComponent({
  props: {
    tasks: {
      type: Object as () => Task[],
      required: true
    }
  },
  setup(props) {
    const remainingCount = computed(() => props.tasks.filter(t => !t.done).length)
    const allCompleted = computed(() => remainingCount.value === 0)
    return {allCompleted, remainingCount}
  }
})
</script>

<style scoped>

</style>
