<template>
  <div class="row" style="height: 100%;">
    <div style="width: 20%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
      <div style="height: 50px; display: flex; justify-content:space-between;">
        <h2 style="font-size: 20px"> Mes listes </h2>
        <q-btn outline label="+" style="height: 15px" to="newlist"/>
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
          <div class="text-h6">
            <p style="line-height: 0px; padding: 0px; margin: 0px; font-weight: bold">{{list.list.title}} </p>
          </div>
          <div>
            <q-btn round class=".btn" label="...">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="() => view(list.list._id)" >
                    <q-item-section>View</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="() => editList(list.list._id)">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="() => deleteList(list.list._id)" >
                    <q-item-section style="color: red">Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-section>
        <q-separator />
        <div style="min-height: 50px">
          <p></p>
          <div v-for="task in list.tasks" style="display: flex; align-items: center; margin-top: 2%; margin-bottom: 2%; padding: 2%;">
            <input type="checkbox" value="true" v-model="task.done" style="margin-left: 3%; margin-right: 3%;"/>
            <p style="margin: 0px;" >{{task.title}}</p>
          </div>
        </div>
      </q-card>

      <q-btn label="Créer une liste" style="background-color: #613973; color: white;" to="newlist"/>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store'
import { useListsStore } from 'src/stores/lists-store';
import { useTasksStore } from 'src/stores/tasks-store';
import { Notify } from 'quasar'
import { onMounted, ref } from 'vue'
import { list } from 'postcss';
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const listsStore = useListsStore()
const tasksStore = useTasksStore()
const router = useRouter()

var text = '';
var emptyText = '';
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
      tasks.value.push(await tasksStore.getTaskId(listsStore.lists[i]._id))
      console.log(listsStore.lists[i]._id);
      lists.value.push({list: listsStore.lists[i], tasks: tasks.value[i]})
    }

  } catch (e) {
    console.error(e);
  }
})

const deleteList = async (id) => {
  try {
    console.log(id);
    await listsStore.deleteList(id)
  } catch (e) {
    Notify.create('Error during list deletion')
  }
}

const editList = async (id) => {
  try {
    console.log(id);
    router.push({ name: 'editlist', params: { id: id } })
  } catch (e) {
    Notify.create('Error during list edition')
  }
}

const view = async (id) => {
  try {
    router.push({ name: 'viewlist', params: { id: id } })
  } catch (error) {
    Notify.create('Error during view')
  }
}

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

.btn{
  background-color: #F2F2F2;
}

.btn:hover{
  background-color: #cbcbcb;
}

.q-btn--round{
  min-width: 2em;
  min-height: 2em;
}
</style>
