<template>
  <div class="login">
    <h1 class="login-title">Kirish</h1>
    <div class="login-text">"Code.uz" da ishlashni davom ettirish uchun</div>
    <div class="social-with">
      <button @click="registerWithGitHub">
        <img src="../../assets/icons/g.png" alt="" />
        <span>Github orqali davom etish</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
      <button class="google" @click="registerWithGoogle">
        <img src="../../assets/icons/google.png" alt="" />
        <span>Google orqali davom etish</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
    <div class="line">
      <span>yoki</span>
    </div>
    <form @submit.prevent="add" class="login-form">
      <label>Pochta</label>
      <input v-model="email" type="email" required />
      <button>Davom etish</button>
    </form>

    <div class="login-bottom">
      Akkount yo'qmi?
      <router-link to="/sign-up">Ro'yxatdan o'tish</router-link>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
const auth = getAuth();

export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    add() {
      this.registerWithGoogle();
    },
    async registerWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          let newUser = {
            full_name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            password: "root",
            role: result.user.email == "yoldoshovumrzoq8@gmail.com" ? 1 : 0,
          };
          this.$store.dispatch("postUser", newUser).then((res) => {
            this.$cookies.set("userId", res);
            location.reload();
            window.location.href = "/";
          });
        })
        .catch((error) => {
          if (error.code == "auth/popup-blocked") {
            signInWithRedirect(provider);
          }
          throw error;
        });
    },
    async registerWithGitHub() {
      signInWithPopup(auth, gitProvider)
        .then((result) => {
          let newUser = {
            full_name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            password: "root",
            role: result.user.email == "yoldoshovumrzoq8@gmail.com" ? 1 : 0,
          };
          this.$store.dispatch("postUser", newUser).then((res) => {
            this.$cookies.set("userId", res);
            location.reload();
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
  },
  mounted() {
    if (this.$cookies.get("userId")) {
      window.location.href = "/";
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/pages/auth/login.scss";
</style>