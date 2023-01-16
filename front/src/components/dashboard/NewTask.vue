<template>
    <div class="row" style="height: 100%;">
      <div style="width: 15%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
        <div style="height: 50px; display: flex; justify-content:space-between;">
          <q-btn outline label="← Retour" style="height: 15px" to="/dashboard"/>
        </div>
      </div>

      <div style="width: 85%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
        <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
          Créer une nouvelle task :
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
        <q-btn label="Done" style="background-color: #613973; color: white;" @click="newTask"/>
      </div>
    </div>
  </template>

  <script setup>
  import { useTasksStore } from 'src/stores/tasks-store';
  import { ref } from 'vue'
  import { Notify } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'

  const tasksStore = useTasksStore()

  const router = useRouter()
  const route = useRoute()
  const list = ref(route.params.id)
  const form = ref({
    title: '',
    description: '',
    list: list
  })

  const newTask = async () => {
    try {
      await tasksStore.AddTask(form.value)
      router.push({ name: 'dashboard' })
    } catch (e) {
      Notify.create('Error during task creation')
    }
  }

  </script>

