<template>
  <li class="list-group-item d-flex justify-content-between align-items-center" :class="{'list-group-item-secondary': task.done}">
    <div>
      <input
          class="form-check-input me-1"
          type="checkbox"
          :checked="task.done"
          :aria-label="task.description"
          @change="handleCheckbox"
      />
      <span :class="{'text-decoration-line-through':task.done}">{{ task.description }}</span>
    </div>
    <button class="btn btn-sm btn-danger" @click="handleDelete">X</button>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task, TaskInterface } from '@/models/models';

interface Props {
  task?: Task
}

export default defineComponent({
  props: {
    task: Task
  },
  emits: {
    toggle: (task: Task) => {
      return true;
    },
    delete: (task: Task) => true
  },
  setup(props: Props, {emit}) {
    const handleCheckbox = () => {
      emit('toggle', props.task!)
    }
    const handleDelete = () => {
      emit('delete', props.task!)
    }
    return {handleCheckbox, handleDelete}
  }
})
</script>

<style scoped>

</style>
