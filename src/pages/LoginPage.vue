<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section v-if="login" class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
        <div class="text-grey-8">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section v-else class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
        <div class="text-grey-8">Sign up below to create your account</div>
      </q-card-section>

      <q-card-section>
        <q-input dense outlined v-model="email" label="Email Address"></q-input>
        <q-input
          dense
          outlined
          class="q-mt-md"
          v-model="password"
          type="password"
          label="Password"
        ></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn
          v-if="login"
          @click="Login()"
          style="border-radius: 8px"
          color="dark"
          rounded
          size="md"
          label="Sign in"
          no-caps
          class="full-width"
        ></q-btn>
        <q-btn
          v-else
          @click="Signup()"
          style="border-radius: 8px"
          color="dark"
          rounded
          size="md"
          label="Sign up"
          no-caps
          class="full-width"
        ></q-btn>
      </q-card-section>
      <q-card-section v-if="login" class="text-center q-pt-none">
        <div class="text-grey-8">
          Don't have an account yet?
          <a
            @click="
              console.log('Ciao');
              login = !login;
            "
            class="text-dark text-weight-bold"
            style="text-decoration: none; cursor: pointer"
            >Sign up</a
          >
        </div>
      </q-card-section>
      <q-card-section v-else class="text-center q-pt-none">
        <div class="text-grey-8">
          Do you have an account?
          <a
            @click="login = !login"
            class="text-dark text-weight-bold"
            style="text-decoration: none; cursor: pointer"
            >Sign in</a
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// import { useQuasar, QSpinnerGears } from "quasar";
// import { userStore } from "stores/user.js";
// import { useRouter } from "vue-router";
// import { onBeforeMount } from "vue";

let login = ref(true);
let email = ref("");
let password = ref("");

function Login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
}

function Signup() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // ..
    });
}

// const router = useRouter();
// const store = userStore();
// let username = ref("");
// let password = ref("");
// const $q = useQuasar();

// function Login() {
//   if (username.value === "admin" && password.value === "admin") {
//     $q.notify({
//       spinner: QSpinnerGears,
//       message: "Verrai reindirizzato alla pagina principale...",
//       color: "green",
//       position: "top",
//       timeout: 2000,
//     });
//     setTimeout(() => {
//       var date = new Date();
//       date.setDate(date.getDate() + 1);
//       //   store.addLoggedUser(date.getTime(), username.value, password.value);
//       router.push("/");
//     }, 2500);
//   } else {
//     $q.notify({
//       message: "Username o Password errati",
//       color: "red",
//       timeout: 2000,
//       position: "top",
//     });
//     username.value = "";
//     password.value = "";
//   }
// }

// onBeforeMount(() => {
//     if (store.isLogged) {
//       router.push("/");
//     }
// });
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
