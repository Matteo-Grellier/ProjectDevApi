<template>
    <div class="row" style="height: 100%;">
      <div style="width: 15%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
        <div style="height: 50px; display: flex; justify-content:space-between;">
          <q-btn outline label="← Retour" style="height: 15px" to="/dashboard"/>
        </div>
      </div>

      <div style="width: 85%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
        <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
          Editer une task :
        </h1>
        <div class="q-pa-md" style="max-width: 400px">

            <q-input
            filled
            v-model="form.title"
            label="Title *"
            hint="Title"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
            filled
            v-model="form.description"
            label="Description *"
            hint="description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

        </div>
        <q-btn label="Done" style="background-color: #613973; color: white;" @click="UpdateTask"/>
      </div>
    </div>
  </template>

  <script setup>
  import { useTasksStore } from 'src/stores/tasks-store';
  import { ref, onMounted } from 'vue'
  import { Notify } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'

  const tasksStore = useTasksStore()

  const router = useRouter()
  const route = useRoute()
  var task = ref('')
  const form = ref({
    title: '',
    description: '',
    list: task.list
  })

  onMounted(async () => {
  try {
    task = await tasksStore.getOneTask(route.params.id)

  } catch (e) {
    console.error(e);
  }
})

  const UpdateTask = async (id) => {
    try {
      await tasksStore.UpdateTask(id, form.value)
      router.push({ name: 'dashboard' })
    } catch (e) {
      Notify.create('Error while editing task')
    }
  }

  </script>
