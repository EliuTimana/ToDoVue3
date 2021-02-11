<template>
  <TaskBanner :tasks="tasks"/>
  <div class="container">
    <TaskCreator @create="onCreate" @toggleVisibility="onToggleVisibility"/>
    <ul class="list-group">
      <TaskRow v-for="t in allTasks" :task="t" :key="t.id" @toggle="onToggle" @delete="onDelete"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue';
import TaskRow from '@/components/TaskRow.vue';
import { Task, TaskInterface } from '@/models/models';
import TaskBanner from '@/components/TaskBanner.vue';
import TaskCreator from '@/components/TaskCreator.vue';

export default defineComponent({
  name: 'Home',
  components: {TaskCreator, TaskBanner, TaskRow},
  setup() {
    const showCompleted = ref(true);
    const tasks = ref<Task[]>([]);
    const allTasks = computed(() => showCompleted.value ? tasks.value : tasks.value.filter(t => !t.done));
    
    const onToggle = (task: TaskInterface) => {
      tasks.value = tasks.value.map(t => t.id === task.id ? {...t, done: !t.done} : t);
    }

    const onDelete = (task: TaskInterface) => {
      const index = tasks.value.findIndex(t => t.id === task.id);
      const data = [...tasks.value];
      data.splice(index, 1);
      tasks.value = data;
    }

    const onCreate = (description: string) => {
      const newId = tasks.value.length > 0 ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1;
      const newTask: TaskInterface = {
        id: newId,
        description: description,
        done: false
      };

      tasks.value.push(newTask);
    }

    const onToggleVisibility = (visible: boolean) => {
      showCompleted.value = visible
    }

    const loadTasks = () => {
      const raw = localStorage.getItem('tasks')
      if(raw) {
        tasks.value = JSON.parse(raw)
      } else {
        tasks.value = [
          {id: 1, description: 'Task 1', done: false},
          {id: 2, description: 'Task 2', done: true}
        ];
      }
    }

    loadTasks();

    watchEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
    });

    return {tasks, onToggle, onDelete, onCreate, onToggleVisibility, allTasks};
  }
});
</script>
