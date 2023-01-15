<template>
  <div class="row" style="height: 100%;">
    <div style="width: 20%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
      <div style="height: 50px; display: flex; justify-content:space-between;">
        <h2 style="font-size: 20px"> Mes listes </h2>
        <q-btn outline label="+" style="height: 15px"/>
      </div>
      <div style="height: 50px; display: flex; justify-content: center;">
        <p style="color: #6E6E6F">
          Vous n’avez aucune liste créer en une première pour commencer en cliquant sur le bouton +
        </p>
      </div>
        <ul > //v-for="item in list"

        </ul>
      <div>

      </div>

    </div>
    <div style="width: 80%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
      <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
        Hello, {{userStore.email}} 👋
      </h1>
      <p style="font-size: 20px; margin-top: 5%; margin-bottom: 5%;">
        Tu n’as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter
      </p>
      <q-btn label="Créer une liste" style="background-color: #613973; color: white;"/>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store'
import { onMounted } from 'vue' // ref
// import { useListsStore } from 'src/stores/lists-store'

const userStore = useUserStore()
// const listsStore = useListsStore()

// const lists = ref([])

onMounted(async () => {
  userStore.user = await userStore.getUserProfile()
  // lists.value = listsStore.listsByAscending()
})

</script>
