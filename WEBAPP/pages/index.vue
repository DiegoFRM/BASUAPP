<template>
  <div class="mainContainer">
    <span class="texture-bg" />
    <span class="city-bg" />
    <div class="mainContent row">
      <logo class="col-12 col-sm-6 d-none d-sm-block"/>
      <section class="registrer-section container col-12 col-sm-6">
        <div class="row">
          <!-- <div class="col-1 offset-11">
            <b-img src="/img/closebutton-07.png" />
          </div> -->
          <div class="col-12">
            <h2><b>Registro</b></h2>
            <p>Tú nombre o de la empresa*</p>
            <b-input
              id="nameUser"
              class="input-text"
              type="text"
              placeholder="Ingresa tu nombre"
              aria-required="required"
            ></b-input>
            <hr>
            <div class="file-email-pass">
              <div>
             <p>Numero telefónico</p>
            <b-input
              id="cellNumber"
              class="input-text"
              type="number"
              placeholder="Ingresa Número"
            />
            </div>

              <div>
             <p>Código postal*</p>
            <b-input
              id="postalCode"
              class="input-text"
              type="number"
              placeholder="Ingresa tu CP"
            />
            </div>
            </div>
            <br>
            <p>Colonia</p>
            <b-input
              id="lastName"
              class="input-text"
              type="text"
              placeholder="Ingresa tu Colonia de donde vives"
            ></b-input>
            <hr>
            <p>Correo*</p>
            <b-input
              id="email"
              class="input-text"
              type="email"
              placeholder="Ingresa email"
            />
            <div class="file-email-pass">
              <div>
                <p>Contraseña*</p>
                <b-input
                  id="contrasena"
                  class="input-text"
                  type="password"
                  placeholder="Ingresa contraseña"
                />
              </div>
              <div>
                <p>Confirmar contraseña*</p>
                <b-input
                  id="contrasenaConfirm"
                  class="input-text"
                  type="password"
                  placeholder="Confirma contraseña"
                />
              </div>
            </div>
            <div class="buttons mt-3 mb-3">
              <div class="btn btn-primary" @click="registrar">
                Registrar
              </div>
            </div>

            <p>*Los campos son obligatorios</p>
            
          </div>
        </div>
        <div>
          <div class="line" />
          <!---
          <h2><b>Inicia Sesión</b></h2>
          <p>Correo</p>
          <b-input
            id="enterMail"
            class="input-text"
            type="email"
            placeholder="Ingresa email"
          />
          <div class="file-email-pass">
            <div>
              <p>Contraseña</p>
              <b-input
                id="enterPass"
                class="input-text"
                type="password"
                placeholder="Ingresa contraseña"
              />
            </div>
          </div>
          <div class="buttons">
            <div class="confirm-button" @click="ingreso">
              Confirmar
            </div>
            <div class="facebook-button">
              Acceso con facebook
            </div>
          </div>
          -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { fireDb } from '~/plugins/firebase.js'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: 'css/style_basu.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
      }
    ]
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailVerified = user.emailVerified
        if (emailVerified) {
          this.$router.push('/message')
        }
      } else {
        // User is signed out.
        // eslint-disable-next-line no-console
        console.log('no existe usuario activo')
        // ...
      }
    })
  },
  methods: {
    registrar() {
      const name_1 =  document.getElementById('nameUser').value
      const lastName_1 =  document.getElementById('lastName').value
      const newNumber = document.getElementById('cellNumber').value
      const postalCode = document.getElementById('postalCode').value
      const email = document.getElementById('email').value
      const contrasena = document.getElementById('contrasena').value
      const confirmContrasena = document.getElementById('contrasenaConfirm')
        .value
      if(name_1 !== '' && lastName_1 !== '' && postalCode !== ''){
      if (contrasena !== '' && confirmContrasena !== '' && email !== '') {
        
        if (contrasena === confirmContrasena) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, contrasena)
            .then((result) => {
              //this.loadData()
              this.$swal(
                '¡Muy Bien!',
                'Se a enviado un correo de confirmación, revisa tu bandeja de entrada',
                'success'
              )
              
              
              const user = firebase.auth().currentUser
              user
                .sendEmailVerification()
                .then((result) => {
                  // Email sent.
                  // eslint-disable-next-line no-console
          fireDb.collection("usuarios").doc(email).set({
              name: name_1,
              direction: lastName_1,
              number: newNumber,
              postalcode:postalCode
          })
          .then(function() {
              
      document.getElementById('nameUser').value = ''
      document.getElementById('lastName').value = ''
      document.getElementById('cellNumber').value = ''
      document.getElementById('postalCode').value = ''
      document.getElementById('email').value = ''
      document.getElementById('contrasena').value = ''
      document.getElementById('contrasenaConfirm').value = ''
      console.log("Document successfully written!!!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });


                })
                .catch((e) => {
                  this.$snotify.error(e.message)
                  // eslint-disable-next-line no-console
                  console.log('error de que esta ingresado..' + e)
                })
            })
            .catch((e) => {
              console.log("ok : " + contrasena + e.message)
              if(contrasena.length < 6){
                  this.$swal({
                  type: 'error',
                  title: 'Oops...',
                  text: 'La contraseña debe de tener un mínimo de 6 caracteres',
                  footer: '<a href>Revisa nuevamente</a>'
              })
              }else{
                this.$swal({
                type: 'error',
                title: 'Oops...',
                text: 'El usuario ya fue registrado',
                footer: '<a href>Revisa nuevamente</a>'
              })
              }
              
            })
        } else {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden',
            footer: '<a href>Revisa nuevamente</a>'
          })
        }
      } else {
        this.$swal({
          type: 'error',
          text: 'Llena el formulario por favor',
          footer: '<a href>Revisa nuevamente</a>'
        })
      }
    }else{
        this.$swal({
          type: 'error',
          text: 'Llena el formulario por favor',
          footer: '<a href>Revisa nuevamente</a>'
        })
    }
    },
    ingreso() {
      const email2 = document.getElementById('enterMail').value
      const contrasena2 = document.getElementById('enterPass').value

      // eslint-disable-next-line no-console
      console.log('ok')
      firebase
        .auth()
        .signInWithEmailAndPassword(email2, contrasena2)

        .catch((e) => {
          this.$snotify.error(e.message)
          // eslint-disable-next-line no-console
          console.log(e)
        })
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const emailVerified = user.emailVerified
          if (emailVerified) {
            this.$router.push('/message')
          }
          // eslint-disable-next-line no-console
          console.log('*****************')
          // eslint-disable-next-line no-console
          console.log(emailVerified)
          // eslint-disable-next-line no-console
          console.log('*****************')
          // ...
        } else {
          // User is signed out.
          // eslint-disable-next-line no-console
          console.log('no existe usuario activo')
        }
      })
    },
    logOutSesion() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('Saliendo...')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    loadData(){
       /*   fireDb.collection("usuarios").doc("basuimpact").get().then((querySnapshot) => {
        console.log(querySnapshot.data());
       });
        */
    let newUser = document.getElementById('email').value
    let newName = document.getElementById('nameUser').value
    let newLastName = document.getElementById('lasName').value
    let newNumber = document.getElementById('cellNumber').value
    

          fireDb.collection("usuarios").doc(newUser).set({
              name: newName,
              lastname: newLastName,
              number: newNumber
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });


    }
  }
}
</script>

<style>
.line {
  text-align: center;
  width: 100%;
  height: 2px;
  background-color: #fff;
  text-align: center;
  transform: translate(0, 100%);
  margin-bottom: 1vh;
}

.mainContainer {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
}

.mainContent {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color: #fff;
  left: 15px;
}
.registrer-section {
  background-color: rgba(7, 60, 80, 0.5);
  height: 100%;
  right: 0;
  padding: 2vw;
}

.register-button {
}
</style>
