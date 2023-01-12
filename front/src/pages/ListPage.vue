<template>
  <q-page class="flex flex-center row">
    <div style="background-color: blue;" class="col-1">
      <h1 style="font-weight: bold; color: #613973;"> Ynov Task Manager </h1>
      <p>Try out this new lightweight tasks manager for everyday tasks</p>
      <q-btn color="primary" to="/register">
        Get started
      </q-btn>
    </div>
    <div style="background-color: blue;" class="col-2">
      <img
      alt="header image"
      src="~assets/header-img.png"
      style="width: 400px; height: 300px"
    >
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListPage'
})
</script>
