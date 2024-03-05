<template>
  <div class="register">
    <h1 class="register-title">Hisob yarating</h1>
    <div class="register-text">"Code.uz" da ishlashni davom ettirish uchun</div>
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
    <form @submit.prevent="add" class="register-form">
      <div class="row">
        <div>
          <label>Ism</label>
          <input v-model="first_name" type="text" required />
        </div>
        <div>
          <label>Familiya</label>
          <input v-model="last_name" type="text" required />
        </div>
      </div>
      <!-- email -->
      <label>Pochta</label>
      <input v-model="email" type="email" required />
      <!-- Parrol -->
      <div class="parol">
        <label>Parol</label>
        <input
          v-model="password"
          :type="isPassword ? 'text' : 'password'"
          required
        />
        <i
          @click="isPassword = !isPassword"
          :class="isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
        ></i>
      </div>
      <button>Davom etish</button>
    </form>

    <div class="register-bottom">
      Akkauntingiz bormi?
      <router-link to="/login">Kirish</router-link>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();
const auth = getAuth();

export default {
  data() {
    return {
      isPassword: false,
      user: {},
      last_name: "",
      first_name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    add() {
      if (this.first_name && this.last_name && this.email && this.password) {
        this.user = {
          email: this.email,
          full_name: this.first_name + " " + this.last_name,
          password: this.password,
          photo: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          role: 0,
        };
        this.$store.dispatch("postUser", this.user).then((res) => {
          this.$cookies.set("userId", res);
          location.reload();
          window.location.href = "/";
        });
      }
    },
    async registerWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          let newUser = {
            full_name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            password: "root",
            role: 0,
          };
          this.$store.dispatch("postUser", newUser).then((res) => {
            this.$cookies.set("userId", res);
            location.reload();
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error);
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
            role: 0,
          };
          this.$store.dispatch("postUser", newUser).then((res) => {
            this.$cookies.set("userId", res);
            location.reload();
            window.location.href = "/";
          });
        })
        .catch((error) => {
          console.log(error);
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
@import "../../styles/pages/auth/register.scss";
</style>