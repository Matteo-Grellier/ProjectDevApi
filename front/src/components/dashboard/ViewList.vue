<template>
  <div class="row" style="height: 100%;">
    <div style="width: 20%; height: 100vh; background-color: #F2F2F2; padding: 2%;">
      <div style="height: 50px; display: flex; justify-content:space-between;">
        <h2 style="font-size: 20px"> Mes listes </h2>
        <q-btn outline label="+" style="height: 15px" to="newlist"/>
      </div>
      <div v-for="list in listsStore.lists" class="div-select" style="padding: 3%">
        <p>
          {{ list.title }}
        </p>
      </div>
    </div>

    <div style="width: 80%; padding-left: 10%; padding-top: 5%; padding-right: 20%;">
      <div style="display: flex; justify-content: space-between">
        <h1 style="color:  #2F0541; font-weight: bold; font-size: 44px;">
          {{route.params.id}}
        </h1>
        <q-btn round class=".btn" label="...">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="() => editList(route.params.id)">
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="() => deleteList(route.params.id)" >
                <q-item-section style="color: red">Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <q-btn class="btn" label="Créer une task" style="background-color: #613973; color: white; margin-top: 3%;" @click=" () => newTask(route.params.id)"/>

      <div style="margin: 5%; width: 50%; background-color: #F2F2F2; padding: 3%;" v-for="task in tasksStore.tasks">
        <div style="display: flex; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <input type="checkbox" value="true" v-model="task.done" style="margin-left: 3%; margin-right: 3%;"/>
            <p style="margin-left: 20px; font-weight: bold; font-size: 20px; width: 200px;"> {{ task.title }} </p>
          </div>
          <q-btn round class=".btn" label="...">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="() => editTask(task._id)">
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="() => deleteTask(task._id)">
                  <q-item-section style="color: red">Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <p style="margin-left:15%; "> {{ task.description }} </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store'
import { useListsStore } from 'src/stores/lists-store';
import { useTasksStore } from 'src/stores/tasks-store';
import { Notify } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const listsStore = useListsStore()
const tasksStore = useTasksStore()
const router = useRouter()
const route = useRoute()

var text = '';
var emptyText = '';
var tasks = ref([]);
var lists = ref([]);

onMounted(async () => {
  try {
    userStore.user = await userStore.getUserProfile()
    listsStore.lists = await listsStore.getAllLists()
    tasksStore.tasks = await tasksStore.getTaskId(route.params.id)

  } catch (e) {
    console.error(e);
  }
})

const deleteList = async (id) => {
  try {
    await listsStore.deleteList(id)
    router.push({ name: 'dashboard'})
  } catch (e) {
    Notify.create('Error during list deletion')
  }
}

const editList = async (id) => {
  try {
    router.push({ name: 'editlist', params: { id: id } })
  } catch (e) {
    Notify.create('Error during list edition')
  }
}

const newTask = async (id) => {
  try {
    router.push({ name: 'newtask', params: { id: id } })
  } catch (error) {
    Notify.create('Error during newtask')
  }
}

const deleteTask = async (id) => {
  try {
    await tasksStore.deleteTask(id)
  } catch (error) {
    Notify.create('Error during deleteTask')
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
