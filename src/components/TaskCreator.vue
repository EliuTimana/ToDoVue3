<template>
  <div class="input-group my-3">
    <input type="text" class="form-control" v-model="taskDescription" @keyup.enter="save"
           placeholder="Write a task and press ENTER">
    <div class="input-group-text">
      <div class="form-check">
        <input type="checkbox" id="chk-show" class="form-check-input" @change="toggleVisibility" :checked="visible">
        <label class="form-check-label" for="chk-show">Show completed items</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: {
    create: (description: string) => true,
    toggleVisibility: (visible: boolean) => true
  },
  setup(props, {emit}) {
    const taskDescription = ref('')
    const visible = ref(true)
    const save = () => {
      const trimmedValue = taskDescription.value.trim()
      if (trimmedValue) {
        emit('create', trimmedValue)
        taskDescription.value = ''
      }
    }
    const toggleVisibility = () => {
      visible.value = !visible.value
      emit('toggleVisibility', visible.value)
    }
    return {save, taskDescription, toggleVisibility, visible}
  }
})
</script>

<style scoped>

</style>
