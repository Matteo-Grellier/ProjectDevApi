<template>
    <div class="row" style="height: 100%;">
      <div style="width: 15%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
        <div style="height: 50px; display: flex; justify-content:space-between;">
          <q-btn outline label="← Retour" style="height: 15px" to="/dashboard"/>
        </div>
      </div>

      <div style="width: 85%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
        <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
          Editer une liste :
        </h1>
        <div class="q-pa-md" style="max-width: 400px">

        <q-input
          filled
          v-model="form.title"
          label="Title *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        </div>
        <q-btn label="Done" style="background-color: #613973; color: white;" @click="updateList(route.params.id)"/>
      </div>
    </div>
  </template>

  <script setup>
  import { useListsStore } from 'src/stores/lists-store';
  import { onMounted, ref } from 'vue'
  import { Notify } from 'quasar'
  import { useRouter, useRoute } from 'vue-router'

  const listsStore = useListsStore()
  const router = useRouter()
  const route = useRoute()
  const form = ref({
    title: ''
  })

  onMounted(async () => {
    try {
      listsStore.lists = await listsStore.getAllLists()
    } catch (e) {
      console.error(e);
    }
  })

  const updateList = async (id) => {
    try {
      await listsStore.updateList(id, form.value)
      router.push({ name: 'dashboard' })
    } catch (e) {
      Notify.create('Error during list creation')
    }
  }

  </script>

