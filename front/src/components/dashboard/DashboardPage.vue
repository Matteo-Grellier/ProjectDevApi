<template>
  <div class="row" style="height: 100%;">
    <div style="width: 20%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
      <div style="height: 50px; display: flex; justify-content:space-between;">
        <h2 style="font-size: 20px"> Mes listes </h2>
        <q-btn outline label="+" style="height: 15px" to="/newlist"/>
      </div>
      <div style="height: 50px; display: flex; justify-content: center;">
        <p style="color: #6E6E6F">
          Vous n’avez aucune liste créer en une première pour commencer en cliquant sur le bouton +
        </p>
      </div>
      <div v-for="list in listsStore.lists" class="div-select" style="padding: 3%">
        <p>
          {{ list.title }}
        </p>
      </div>

    </div>
    <div style="width: 80%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
      <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
        Hello, {{userStore.user.email}} 👋
      </h1>
      <p style="font-size: 20px; margin-top: 5%; margin-bottom: 5%;">
        {{text}}
      </p>

      <q-card class="my-card" style="margin: 5%; width: 50%" v-for="list in lists">
        <q-card-section style="background-color: #F2F2F2; padding: 3%; display: flex; justify-content: space-between; align-items: center;">
          <div class="text-h6"> <p style="line-height: 0px; padding: 0px; margin: 0px;">{{list.list.title}} </p> </div>
          <q-btn round style="height: 10px; width: 10px">...</q-btn>
        </q-card-section>
        <q-separator />
        <div v-for="task in list.tasks" style="display: flex; align-items: center; margin-top: 2%; margin-bottom: 2%; padding: 2%">
          <input type="checkbox" value="true" v-model="task.done" style="margin-left: 3%; margin-right: 3%;"/>
          <p style="margin: 0px;" >{{task.title}}</p>
        </div>
      </q-card>

      <q-btn label="Créer une liste" style="background-color: #613973; color: white;" to="/newlist"/>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store'
import { useListsStore } from 'src/stores/lists-store';
import { useTasksStore } from 'src/stores/tasks-store';
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const listsStore = useListsStore()
const tasksStore = useTasksStore()
var text = '';
var tasks = ref([]);
var lists = ref([]);

onMounted(async () => {
  try {
    userStore.user = await userStore.getUserProfile()
    listsStore.lists = await listsStore.getAllLists()
    if (listsStore.lists != null) {
      text = "Voici les dernières tâches que tu as ajoutés"
    }
    else {
      text = "Tu n’as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter"
    }

    for (let i = 0; i < listsStore.lists.length; i++) {
      // console.log(await tasksStore.getTaskId(listsStore.lists[i]._id))
      tasks.value.push(await tasksStore.getTaskId(listsStore.lists[i]._id))
      lists.value.push({list: listsStore.lists[i], tasks: tasks.value[i]})
    }
    console.log(lists)

  } catch (e) {
    console.error(e);
  }
})

</script>

<style lang="css">

p{
  margin: 0;
}

.div-select{
  background-color: #F2F2F2;
  transition: 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  font-family: sans-serif
}

.div-select:hover{
  background-color: #929292;
}
</style>
