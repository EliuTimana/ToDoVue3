<template>
  <TaskBanner :tasks="tasks"/>
  <div class="container">
    <ul class="list-group">
      <TaskRow v-for="t in tasks" :task="t" :key="t.id" @toggle="onToggle" @delete="onDelete"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskRow from '@/components/TaskRow.vue';
import { Task, TaskInterface } from '@/models/models';
import TaskBanner from '@/components/TaskBanner.vue';

export default defineComponent({
  name: 'Home',
  components: {TaskBanner, TaskRow},
  setup() {
    const tasks = ref<Task[]>([
      {id: 1, description: 'Task 1', done: false},
      {id: 2, description: 'Task 2', done: true}
    ]);
    const onToggle = (task: TaskInterface) => {
      tasks.value = tasks.value.map(t => t.id === task.id ? {...t, done: !t.done} : t);
    }
    const onDelete = (task: TaskInterface) => {
      const index = tasks.value.findIndex(t => t.id === task.id);
      const data = [...tasks.value];
      data.splice(index, 1);
      tasks.value = data;
    }
    return {tasks, onToggle, onDelete};
  }
});
</script>
