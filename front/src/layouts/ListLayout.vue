<template>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-white text-black">
        <q-toolbar class="row" style="background-color: #F2F2F2;">
          <q-btn to="/">
            <img
            alt="logo"
            src="~assets/logo.png"
            style="width: 30px; height: 30px"
            >
          </q-btn>
          <q-btn float-right outline label="Lists" color="primary" no-caps class="q-mx-md col-1 flex" to="/dashboard" />
          <div style="justify-content: flex-end; display: flex; width: 100%;">
            <p style="padding-top: 17px; padding-right: 1%;">
              Tableau de bord
            </p>
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
