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
        Hello, NOM PRENOM 👋
      </h1>
      <p style="font-size: 20px; margin-top: 5%; margin-bottom: 5%;">
        Tu n’as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter
      </p>
      <q-btn label="Créer une liste" style="background-color: #613973; color: white;"/>
    </div>
  </div>
</template>

<script setup>

// import { onMounted } from 'vue'
// import { getAllLists } from 'src/services/lists'
// import { Notify } from 'quasar'

// const lists = ref([])

// onMounted(async () => {
//   loading.value = true
//   const data = await asyncCall()

//   try {
//     const res = await getAllLists()
//     console.log(res)
//     lists.value = res.data
//   } catch {
//     Notify.create('Error on lists load')
//   }

//   fakeData.value = data
//   loading.value = false
// })
</script>
