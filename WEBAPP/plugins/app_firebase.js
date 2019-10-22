function registrar() {
  const email = document.getElementById('email').value
  const contrasena = document.getElementById('contrasena').value

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, contrasena)
    .then(function() {
      verficar()
    })

    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
      // ...
    })
}

function ingreso() {
  const email2 = document.getElementById('email2').value
  const contrasena2 = document.getElementById('contrasena2').value

  firebase
    .auth()
    .signInWithEmailAndPassword(email2, contrasena2)

    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
      // ...
    })
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo')
      aparece(user)
      // User is signed in.
      const displayName = user.displayName

      const email = user.email

      console.log('*****************')
      console.log(user.emailVerified)
      console.log('*****************')

      const emailVerified = user.emailVerified
      const photoURL = user.photoURL
      const isAnonymous = user.isAnonymous
      const uid = user.uid
      const providerData = user.providerData
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario activo')
      // ...
    }
  })
}
observador()

function aparece(user) {
  var user = user
  const contenido = document.getElementById('contenido')
  if (user.emailVerified) {
    contenido.innerHTML = `
        <p>Bienvenido!</p>
        <button onclick="cerrar()">Cerrar sesión</button> 
        `
  }
}

function cerrar() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log('Saliendo...')
    })
    .catch(function(error) {
      console.log(error)
    })
}

function verficar() {
  const user = firebase.auth().currentUser
  user
    .sendEmailVerification()
    .then(function () {
      // Email sent.
      console.log('Enviando correo...')
    })
    .catch(function (error) {
      // An error happened.
      console.log(error)
    })
    
}


