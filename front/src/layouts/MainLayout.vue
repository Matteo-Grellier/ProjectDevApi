<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="row">
        <q-btn to="dashboard">
          <img
          alt="logo"
          src="~assets/logo.png"
          style="width: 30px; height: 30px"
          >
        </q-btn>
        <q-btn float-right outline label="Lists" color="primary" no-caps class="q-mx-md col-1 flex" to="/lists" />
        <div class="loginContainer">
        <router-link float-right to="/login" class="col-1 justify-end login flex">
          Se connecter
        </router-link>

        <q-btn float-right outline label="S'inscrire" color="primary" no-caps class="q-mx-md col-1 register flex" to="/register" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="css">

.loginContainer{
  justify-content: flex-end;
  display: flex;
  width: 100%;
}

.login{
  align-items: center;
}

</style>
