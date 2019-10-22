<template>
  <div class="containerHeader">
    <div id="header" class="row">
      <div id="menuButton" class="col-sm-2 col-md-8 col-2 text-left">
        <b-img class="menu-img" src="img/menu-icon.png" />
      </div>
      <div class="col-sm-2 col-md-1 col-2 text-center">
        <b-img class="menu-img" src="img/home-icon.png" />
      </div>
      <div class="col-sm-2 col-md-1 col-2 text-center">
        <b-img class="menu-img" src="img/team-icon.png" />
      </div>
      <div class="col-sm-2 col-md-1 col-2 text-center">
        <b-img class="menu-img" src="img/medal-icon.png" />
      </div>
      <div class="col-sm-2 col-md-1 col-2 text-center" @click="logOutSession">
        <b-img class="menu-img" src="img/logout-icon.png" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    logOutSession() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('Saliendo...')
          this.$router.push('/')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}
</script>

<style>
.containerHeader {
  position: relative;
  background-color: #073c50;
  width: 100%;
  padding: 1vh;
}
</style>
