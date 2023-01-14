<template>
  <q-page style="display: flex; justify-content: center; padding-top: 5%;">
    <div style="padding: 5%; width:50%" >
      <h1 style="font-weight: bold; color: #2F0541; padding-bottom: 5%; font-size: 60px">
        Ynov Task Manager
      </h1>
      <p style="font-size: 25px; width:80%" >
        Try out this new lightweight tasks manager for everyday tasks
      </p>
      <q-btn color="primary" to="/register" style="padding: 8px; padding-left: 30px; padding-right: 30px;">
        Get started
      </q-btn>
    </div>
    <div style="">
      <img
      alt="header image"
      src="~assets/header-img.png"
      style="width: 500px; height: 400px"
      >
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
