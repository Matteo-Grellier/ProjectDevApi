<template>
  <div class="row" style="height: 100%;">
    <div style="width: 20%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
      <div style="height: 50px; display: flex; justify-content:space-between;">
        <h2 style="font-size: 20px"> Retour </h2>
        <q-btn outline label="+" style="height: 15px"/>
      </div>

    </div>
    <div style="width: 80%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
      <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
        Créer une nouvelle liste :
      </h1>

      <q-btn label="Done" style="background-color: #613973; color: white;" @click="newList"/>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from 'src/stores/lists-store';
import { onMounted, ref } from 'vue'

const listsStore = useListsStore()
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

const newList = async () => {
  try {
    await useListsStore.newList(form.value)
    router.push({ name: 'dashboard' })
  } catch (e) {
    Notify.create('Error during Login')
  }
}

</script>

