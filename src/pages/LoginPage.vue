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
        <q-input v-show="!login" dense outlined v-model="name" label="Name"></q-input>
        <q-input v-show="!login" dense outlined class="q-mt-md" v-model="surname" label="Surname"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="email" label="Email Address"></q-input>
        <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password"></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn v-if="login" @click="Login()" style="border-radius: 8px" color="dark" rounded size="md" label="Sign in"
          no-caps class="full-width"></q-btn>
        <q-btn v-else @click="Signup()" style="border-radius: 8px" color="dark" rounded size="md" label="Sign up" no-caps
          class="full-width"></q-btn>
      </q-card-section>
      <q-card-section v-if="login" class="text-center q-pt-none">
        <div class="text-grey-8">
          Don't have an account yet?
          <a @click="login = !login" class="text-dark text-weight-bold"
            style="text-decoration: none; cursor: pointer">Sign up</a>
        </div>
      </q-card-section>
      <q-card-section v-else class="text-center q-pt-none">
        <div class="text-grey-8">
          Do you have an account?
          <a @click="login = !login" class="text-dark text-weight-bold"
            style="text-decoration: none; cursor: pointer">Sign in</a>
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
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { useQuasar } from "quasar";
import { userStore } from "stores/user.js";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

let login = ref(true);
let name = ref("");
let surname = ref("");
let email = ref("");
let password = ref("");
const store = userStore();
const route = useRouter();
const info = ref({});
const $q = useQuasar();

async function Login() {
  if (email.value === "" || password.value === "") {
    $q.notify({
      message: "Email and Password are required",
      color: "red",
      timeout: 2000,
      position: "top",
    });
    return;
  }
  try {
    const auth = getAuth();
    const db = getFirestore();
    const user = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const uid = user.user.uid;
    store.logIn();
    let docRef = doc(db, "users", uid);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // UTENTE
      info.value = docSnap.data();
      store.giveInfo(info.value);
      store.giveRole("user");
    } else {
      // ADMIN
      docRef = doc(db, "admin", uid);
      docSnap = await getDoc(docRef);
      info.value = docSnap.data();
      store.giveInfo(info.value);
      store.giveRole("admin");
    }

    route.push({ name: "home" });
  } catch (error) {
    $q.notify({
      message: "Username o Password wrong",
      color: "red",
      timeout: 2000,
      position: "top",
    });
  }
}

async function Signup() {
  if (
    name.value === "" ||
    surname.value === "" ||
    email.value === "" ||
    password.value === ""
  ) {
    $q.notify({
      message: "Name, Surname, Email and Password are required",
      color: "red",
      timeout: 2000,
      position: "top",
    });
    return;
  }

  try {
    const auth = getAuth();
    const db = getFirestore();
    const user = await (createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    ));

    const uid = user.user.uid;
    store.logIn();
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      cognome: surname.value,
      nome: name.value,
    });

    let docSnap = await getDoc(docRef);
    info.value = docSnap.data();
    store.giveInfo(info.value);
    store.giveRole("user");
    route.push({ name: "home" });
  } catch (error) {
    switch (error.code) {
      case "auth/weak-password":
        $q.notify({
          message: "Weak Password",
          color: "red",
          timeout: 2000,
          position: "top",
        });
        break;
      case "auth/email-already-in-use":
        $q.notify({
          message: "Email already in use",
          color: "red",
          timeout: 2000,
          position: "top",
        });
        break;
      default:
        $q.notify({
          message: "Unknown error",
          color: "red",
          timeout: 2000,
          position: "top",
        });
        break;
    }
  }
}

onBeforeMount(() => {
  if (store.isLogged) {
    route.push({ name: "home" });
  }
});
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
