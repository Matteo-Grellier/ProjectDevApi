<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="row">
        <q-btn class="col-1" to="dashboard">
          <img
          alt="logo"
          src="~assets/logo.png"
          style="width: 30px; height: 30px"
          >
        </q-btn>
        <router-link float-right to="/login" class="col-1 justify-end">
          Se connecter
        </router-link>
        <q-btn float-right outline label="S'inscrire" color="primary" no-caps class="q-mx-md col-1" to="/register" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
</script>
